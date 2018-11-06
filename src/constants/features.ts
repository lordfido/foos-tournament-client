import { isProduction, isPre } from '../common/utils/platforms';

export const restoreLastRoute = false;
export const cacheOnDemand = isProduction() || isPre();
export const pushNotifications = true;

export const paginationSize = 24;

export const notificationCloseTimeout = 8000;

export const pollingFrequency = 10000;
