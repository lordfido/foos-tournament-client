import { log } from '../../common/utils/logger';

import { getStore } from '../../common/utils/idb';
import { showNotification, createNotificationParamsFromPush } from '../utils/notification';
import { PushData } from '../../definitions/push';

const parsePushData = (pushData: any): PushData => {
  return {
    ...pushData,
    companyId: Number(pushData.companyId),
    moduleId: Number(pushData.moduleId),
    element: Number(pushData.element),
  };
};

const handler = async (event: any): Promise<void> => {
  if (event.data) {
    const data = parsePushData(JSON.parse(event.data.text()));
    log('Got a push event', data);

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
