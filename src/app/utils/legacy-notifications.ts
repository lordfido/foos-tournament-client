import { NotificationParams } from '../../definitions/notification';
import { getWorkerConfig } from '../../common/utils/idb';

// Compatibility
export const getLegacyNotificationsSupport = () => {
  if (!Notification || !Notification.requestPermission) {
    return false;
  }

  if (Notification.permission) {
    return true;
  }

  // Make sure that Notification constructor actually works (Android only supports Service Worker-based notifications)
  // https://developers.google.com/web/updates/2015/05/notifying-you-of-changes-to-notifications#android_notifications
  // https://github.com/Modernizr/Modernizr/blob/master/feature-detects/notification.js
  try {
    // eslint-disable-next-line no-new
    new Notification('');
  } catch (e) {
    return false;
  }

  return true;
};

// Actions
export const showLegacyNotification = async (params: NotificationParams) => {
  const { title, options: opt } = params;
  const { actions, sound, ...options } = opt;

  const workerConfig = await getWorkerConfig();

  new Notification(title, {
    ...options,
    badge: options.badge || workerConfig.defaultBadgeUrl,
    icon: options.icon || workerConfig.defaultIconUrl,
  });
};
