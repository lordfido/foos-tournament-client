import { log } from '../../common/utils/logger';
import { getLegacyNotificationsSupport, showLegacyNotification } from './legacy-notifications';
import { sendMessageToServiceWorker } from './service-worker';

import { SHOW_NOTIFICATION } from '../../constants/sw-message-types';
import { NotificationParams } from '../../definitions/notification';

// Compatibility
let areServiceWorkerNotificationsSupported = false;

export const setServiceWorkerNotificationsSupport = (areSupported: boolean): void => {
  areServiceWorkerNotificationsSupported = areSupported;
  log(`Setting <areServiceWorkerNotificationsSupported> to <${areSupported}>`);
};

const getServiceWorkerNotificationsSupport = () => areServiceWorkerNotificationsSupported;

export const getNotificationsSupport = () => getLegacyNotificationsSupport() || getServiceWorkerNotificationsSupport();

// Actions
export const isNotificationPermissionGranted = () => Notification && Notification.permission === 'granted';

export const canDisplayNotifications = () => getNotificationsSupport() && isNotificationPermissionGranted();

export const requestNotificationsPermission = (onPermissionAccept: Function) => {
  if (isNotificationPermissionGranted()) {
    onPermissionAccept();
  } else if (getNotificationsSupport()) {
    Notification.requestPermission(permission => {
      if (permission === 'granted') {
        onPermissionAccept();
      }
    });
  }
};

const showServiceWorkerNotification = async ({ title, options }: NotificationParams) => {
  sendMessageToServiceWorker({
    type: SHOW_NOTIFICATION,
    payload: { title, options },
  });
};

export const showNotification = ({ title, options }: NotificationParams) => {
  if (getServiceWorkerNotificationsSupport()) {
    return showServiceWorkerNotification({ title, options });
  }

  if (getLegacyNotificationsSupport()) {
    return showLegacyNotification({ title, options });
  }

  return Promise.resolve();
};
