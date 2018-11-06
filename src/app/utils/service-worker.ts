import { History } from 'history';
import { log, error } from '../../common/utils/logger';

import { setServiceWorkerNotificationsSupport, getNotificationsSupport } from './notifications';
import { setPushSubscriptionsSupport, getPushSubscriptionsSupport } from './push';

import { NAVIGATE } from '../../constants/sw-message-types';
import { Message } from '../../definitions/message';

const serviceWorkerUrl = './sw.js';

let router: History;

// Compatibility
let areServiceWorkerSupported = false;

const setServiceWorkerSupport = (areSupported: boolean) => {
  areServiceWorkerSupported = areSupported;
  log(`Setting <areServiceWorkerSupported> to <${areSupported}>`);
};

export const getServiceWorkerSupport = () => areServiceWorkerSupported;

/**
 * Receives Post messages from service worker and react to them
 */
const getMessageFromServiceWorker = (event: MessageEvent) => {
  if (event.data) {
    const data: Message = event.data;
    log(`Getting a message from Service Worker`, data);

    switch (data.type) {
      case NAVIGATE:
        router.push({ pathname: data.payload.url, state: { from: location.pathname } });
        break;

      default:
        return error(`Unhandled type message received by the Browser: ${data.type}`);
    }
  }
};

/**
 * Sends a post message to the service worker
 */
export const sendMessageToServiceWorker = async (message: Message) => {
  if (!getServiceWorkerSupport()) {
    log('No SW support, or no controller available');
    return Promise.resolve();
  }

  // Create a Message Channel
  var channel = new MessageChannel();

  // Handler for recieving message reply from service worker
  channel.port1.onmessage = event => getMessageFromServiceWorker(event);

  log('Sending message to Service Worker', message);
  const registration = await navigator.serviceWorker.ready;
  return registration && registration.active && registration.active.postMessage(message, [channel.port2]);
};

/**
 * Register a service worker to handle some push events
 */
const registerServiceWorker = (history: History) => {
  // If browser is not compatible
  if (!navigator.serviceWorker) {
    return;
  }

  // Stores React router
  router = history;

  setServiceWorkerSupport(true);

  // Has an open communication with the service worker
  log('Setting up a listener for messages');
  navigator.serviceWorker.addEventListener('message', getMessageFromServiceWorker);

  // Register the worker
  log('Registering service worker');
  navigator.serviceWorker
    .register(serviceWorkerUrl)
    .then(reg => {
      log('Service worker has been registered');

      // Verify service worker is able to send notifications
      if (reg.showNotification) {
        setServiceWorkerNotificationsSupport(true);
      }

      // Verify service worker is able to subscribe to push
      if (reg.pushManager && reg.pushManager.subscribe) {
        setPushSubscriptionsSupport(true);
      }
    })
    .catch(err => {
      error('There was an error while registering the Service Worker', err);
    });
};

export default registerServiceWorker;
