import { log } from '../../common/utils/logger';
import { isNotificationPermissionGranted } from './notifications';

// Push setup
const urlBase64ToUint8Array = (base64String: string) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

const applicationServerKey = urlBase64ToUint8Array(
  'BCZV9GAZSyF_TvbdRojEfWs4eDtYKeXnB8OaJSrE48QFnbkfqyEUBa36RS3isFnTcRCh0jMltQJpp69TKC1lLkA'
);

// Compatibility
let arePushSubscriptionsSupported = false;

export const setPushSubscriptionsSupport = (areSupported: boolean) => {
  arePushSubscriptionsSupported = areSupported;
  log(`Setting <arePushSubscriptionsSupported> to <${areSupported}>`);
};

export const getPushSubscriptionsSupport = () => arePushSubscriptionsSupported;

// Active subscription
let pushSubscription: string = '';

interface ParsedPushSubscription {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}
export const setPushSubscription = (subscription: PushSubscription) => {
  pushSubscription = subscription ? JSON.stringify(subscription) : '';
  log(`Setting <pushSubscription> to <${pushSubscription}>`);
};

const unsetPushSubscription = () => {
  pushSubscription = '';
  log(`Unsetting <pushSubscription>`);
};

export const getPushSubscription = (): ParsedPushSubscription | void =>
  pushSubscription ? JSON.parse(pushSubscription) : undefined;

// Actions
export const subscribeToPush = async () => {
  if (!getPushSubscriptionsSupport() || !isNotificationPermissionGranted()) {
    log('Not support for push subscription');
    return Promise.resolve();
  }

  const serviceWorkerRegistration = await navigator.serviceWorker.ready;
  log('Service worker registration is ready');

  await unsubscribeFromPush();
  const subscription = await serviceWorkerRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey,
  });

  log('Browser is subscribed to push');
  setPushSubscription(subscription);

  log('Current active', getPushSubscription());
};

export const unsubscribeFromPush = async () => {
  if (!getPushSubscriptionsSupport()) {
    log('No support for push subscription', {
      support: getPushSubscriptionsSupport(),
    });
    return Promise.resolve();
  }

  const serviceWorkerRegistration = await navigator.serviceWorker.ready;
  const subscription = await serviceWorkerRegistration.pushManager.getSubscription();

  if (!subscription) {
    return;
  }

  log('Subscription obtained, Removing subscription from browser');

  await subscription.unsubscribe();
  log('Subscription removed from browser');

  log('Cleaning variable');
  return unsetPushSubscription();
};
