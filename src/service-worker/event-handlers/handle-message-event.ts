import { log, error } from '../../common/utils/logger';

import { SHOW_NOTIFICATION } from '../../constants/sw-message-types';
import { Message } from '../../definitions/message';
import { getWorkerConfig } from '../../common/utils/idb';

export const sendMessageToWebApp = async (message: Message): Promise<void> => {
  const { type = '', payload = {}, shouldFocus = false, ports = [] } = message;

  // If there are ports, send a direct message
  if (ports.length) {
    log('Sending private message to WebApp', message, ports);
    return ports.forEach(port => {
      port.postMessage({ type, payload });
    });
  }

  // No ports
  // @ts-ignore
  const clients = await self.clients.matchAll();
  log('Sending message to first WebApp client found', message, clients);

  // Open windows, send it to first window
  if (clients.length) {
    const promises = [clients[0].postMessage({ type, payload })];

    if (shouldFocus && !clients[0].focused) {
      promises.push(clients[0].focus());
    }

    return Promise.all(promises).then(() => {});
  }

  // No open window, open it
  // @ts-ignore
  const host = self.registration.scope.slice(0, -1);
  // @ts-ignore
  return self.clients.openWindow(`${host}${payload.url}`);
};

const handler = async (event: any): Promise<void> => {
  const { data } = event;
  log(`Getting a message from WebApp`, data);

  switch (data.type) {
    case SHOW_NOTIFICATION:
      const workerConfig = await getWorkerConfig();

      // @ts-ignore
      return self.registration.showNotification(data.payload.title, {
        ...data.payload.options,
        badge: data.payload.options.badge || workerConfig.defaultBadgeUrl,
        icon: data.payload.options.icon || workerConfig.defaultIconUrl,
      });

    default:
      return error(`Unhandled type message received by the Service Worker: ${data.type}`);
  }
};

/**
 * TS TODO: Find RequestEvent or ExtendableEvent definition
 * TS TODO: Need to tell TS that self is GlobalServiceWorkerScope instead of Window
 */
const handleMessageEvent = (event: any): void => {
  event.waitUntil(handler(event));
};

export default handleMessageEvent;
