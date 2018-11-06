import { v1 as uuid } from 'uuid';
import { log } from '../../common/utils/logger';
import { getStore, getWorkerConfig } from '../../common/utils/idb';
import { createNotificationParams, createNotificationTag } from '../../app/modules/notifier/notifier.models';
import { NotificationParams } from '../../definitions/notification';
import { PushData } from '../../definitions/push';
import { userModuleNotificationsUpdate } from '../../app/modules/account/account.actions';

/**
 * TS TODO: Need to tell TS that self is GlobalServiceWorkerScope instead of Window
 */
export const showNotification = (notificationParams: NotificationParams): Promise<void> => {
  log('Displaying a notification', notificationParams);
  // @ts-ignore
  return self.registration.showNotification(notificationParams.title, notificationParams.options);
};

interface Company {
  id?: number;
  name?: string;
  slug?: string;
  picture?: string;
}

export const createNotificationParamsFromPush = async (pushData: PushData): Promise<NotificationParams> => {
  const store = await getStore();
  const workerConfig = await getWorkerConfig();

  const companies: { collection: Array<Company> } = store.companies;
  const company = companies.collection.find(c => c.id === pushData.companyId);

  if (!company) {
    return {
      title: '',
      options: {
        body: '',
        badge: workerConfig.defaultBadgeUrl,
        tag: uuid(),
        renotify: true,
      },
    };
  }

  const element = pushData.modifiedType === 'company' ? 'settings' : pushData.modifiedName;

  const notificationParams = createNotificationParams({
    badge: workerConfig.defaultBadgeUrl,
    body: `${pushData.owner} ${pushData.action} the ${pushData.modifiedType} ${element}`,
    data: {
      type: pushData.modifiedType,
      element: Number(pushData.element),
      company: { slug: company.slug },
    },
    icon: company.picture || workerConfig.defaultIconUrl,
    tag: createNotificationTag({
      type: pushData.modifiedType,
      action: pushData.action,
      company,
      element,
    }),
    title: `New activity in ${company.name}`,
  });

  log('NotificationParams have been created', notificationParams);

  return notificationParams;
};
