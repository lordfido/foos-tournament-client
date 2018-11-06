import { log } from '../../common/utils/logger';

import { getStore } from '../../common/utils/idb';
import { showNotification, createNotificationParamsFromPush } from '../utils/notification';
import { PushData } from '../../definitions/push';
import { NotificationPreference } from '../../app/modules/auth/auth.types';

const parsePushData = (pushData: any): PushData => {
  return {
    ...pushData,
    companyId: Number(pushData.companyId),
    moduleId: Number(pushData.moduleId),
    element: Number(pushData.element),
  };
};

const shouldNotifyAboutThis = async (pushData: PushData): Promise<boolean> => {
  const { auth } = await getStore();
  const notifications: NotificationPreference[] = auth.user && auth.user.notifications ? auth.user.notifications : [];

  const notificationPreferences = notifications
    // Filter notification preferences by company
    .filter(cmp => cmp.idCompany === pushData.companyId)
    // Filter notification preferences by module
    .filter(cmp => cmp.idModule === pushData.moduleId);

  if (!notificationPreferences) {
    log('User has no preferences for this module, no notifications');
    return false;
  }

  const preferences = {
    browser: notificationPreferences[0][pushData.verb].browser,
    push: notificationPreferences[0][pushData.verb].push,
  };

  log('These are user preferences for this company and module', preferences);

  // @ts-ignore
  const openWindows = await self.clients.matchAll();
  log('These are currently open windows', openWindows);

  return preferences.push || (openWindows.length > 0 && preferences.browser);
};

const handler = async (event: any): Promise<void> => {
  if (event.data) {
    const data = parsePushData(JSON.parse(event.data.text()));
    log('Got a push event', data);

    const shouldNotify = await shouldNotifyAboutThis(data);
    if (!shouldNotify) {
      return Promise.resolve();
    }

    switch (data.type) {
      case 'notification':
        log('Need to create a notification');
        return showNotification(await createNotificationParamsFromPush(data));

      default:
        return Promise.resolve();
    }
  }

  return Promise.resolve();
};

/**
 * TS TODO: Find RequestEvent or ExtendableEvent definition
 * TS TODO: Need to tell TS that self is GlobalServiceWorkerScope instead of Window
 */
const handlePushEvent = (event: any) => {
  event.waitUntil(handler(event));
};

export default handlePushEvent;
