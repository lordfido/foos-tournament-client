import { log, error } from '../../common/utils/logger';
import { getResourceUrl } from '../../common/utils/resources';

import { NAVIGATE } from '../../constants/sw-message-types';

import { sendMessageToWebApp } from './handle-message-event';
import { DISMISS_ACTION } from '../../constants/notifications';

const handler = (event: any): Promise<void> => {
  const notification: Notification = event.notification;
  const { data } = notification;

  notification.close();

  if (event.action === DISMISS_ACTION.action) {
    log('Dismissed notification', data);
    return Promise.resolve();
  }

  log('Clicked in a notification', data);

  switch (data.type) {
    case 'company':
    case 'role':
      return sendMessageToWebApp({
        shouldFocus: true,
        type: NAVIGATE,
        payload: {
          url: getResourceUrl({
            id: data.element,
            type: data.type,
            company: data.company,
          }),
        },
      });

    default:
      error(`Unhandled notification type ${data.type}`);
  }

  // If  notification type, focus/open a window
  // @ts-ignore
  return self.clients.matchAll().then(clients => {
    if (clients.length) {
      return clients[0].focus();
    }

    // @ts-ignore
    return self.clients.openWindow(self.registration.scope).then(client => client.focus());
  });
};

/**
 * TS TODO: Find RequestEvent or ExtendableEvent definition
 * TS TODO: Need to tell TS that self is GlobalServiceWorkerScope instead of Window
 */
const handleNotificationclickEvent = (event: any) => {
  event.waitUntil(handler(event));
};

export default handleNotificationclickEvent;
