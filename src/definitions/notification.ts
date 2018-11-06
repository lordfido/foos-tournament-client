import { ButtonProps } from '../app/components/buttons';

export interface NotificationAction {
  action: string;
  label?: string;
  icon?: string;
}

interface NotificationOptionalParams {
  icon?: string;
  image?: string;
  vibrate?: Array<number>;
  sound?: string;
  actions?: Array<NotificationAction>;
  data?: any;
}

interface NotificationOptions extends NotificationOptionalParams {
  body: string;
  badge: string;
  tag: string;
  renotify: boolean;
}

export interface NotificationParams {
  title: string;
  timestamp?: number;
  options: NotificationOptions;
}

export interface ReactNotification {
  title: string;
  timestamp?: number;
  options: {
    body: string;
    badge: string;
    tag: string;
    renotify: boolean;
    icon?: string;
    image?: string;
    vibrate?: Array<number>;
    sound?: string;
    actions?: Array<ButtonProps>;
    data?: any;
  };
}
