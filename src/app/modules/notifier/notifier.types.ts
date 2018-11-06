import { NotificationAction, NotificationParams } from '../../../definitions/notification';

export interface TagDependencies {
  type: string;
  action: string;
  company: {
    id?: number;
    name?: string;
    slug?: string;
    picture?: string;
  };
  element: string;
  [index: string]: any;
}

export interface RawNotificationParams {
  title: string;
  timestamp?: number;
  tag: string;

  // Optional
  body?: string;
  icon?: string;
  image?: string;
  badge?: string;
  vibrate?: Array<number>;
  actions?: Array<NotificationAction>;
  renotify?: boolean;

  // Data
  data?: any;
  type?: string;
  reason?: string;
  channel?: string;
  isActive?: boolean;
}

export interface ManappNotification {
  channel: string;
}

export interface NotifierState {
  collection: Array<NotificationParams>;
  errors: Array<NotificationParams>;
  isFetching: boolean;
}
