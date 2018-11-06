import { log } from './common/utils/logger';

import handleInstallEvent from './service-worker/event-handlers/handle-install-event';
import handleActivateEvent from './service-worker/event-handlers/handle-activate-event';
import handleFetchEvent from './service-worker/event-handlers/handle-fetch-event';
import handleMessageEvent from './service-worker/event-handlers/handle-message-event';
import handlePushEvent from './service-worker/event-handlers/handle-push-event';
import handleNotificationclickEvent from './service-worker/event-handlers/handle-notificationclick-event';

log('Setting up listener for <install>');
self.addEventListener('install', handleInstallEvent);

log('Setting up listener for <activate>');
self.addEventListener('activate', handleActivateEvent);

log('Setting up listener for <fetch>');
self.addEventListener('fetch', handleFetchEvent);

log('Setting up listener for <message>');
self.addEventListener('message', handleMessageEvent);

log('Setting up listener for <push>');
self.addEventListener('push', handlePushEvent);

log('Setting up listener for <notificationclick>');
self.addEventListener('notificationclick', handleNotificationclickEvent);
