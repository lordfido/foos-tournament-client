import { v1 as uuid } from 'uuid';
import { NotificationParams } from '../../../definitions/notification';
import { TagDependencies, RawNotificationParams } from './notifier.types';

export const createNotificationTag = ({ type, action, company, element }: TagDependencies) =>
  `${type}_${action}_${company.id}_${element}`;

export const createNotificationParams = ({
  title = 'New Activity',
  timestamp = new Date().getTime(),

  tag,
  body,
  icon,
  image,
  badge,
  vibrate = [300, 100, 300],
  actions = [],
  renotify = true,

  type,
  reason,
  isActive = true,
  data,
}: RawNotificationParams): NotificationParams => ({
  title,
  timestamp,
  options: {
    body: body || '',
    icon,
    image,
    badge: badge || '',
    vibrate,
    actions,
    tag: tag || uuid(),
    renotify,
    data: {
      type,
      reason,
      isActive,
      ...data,
    },
  },
});
