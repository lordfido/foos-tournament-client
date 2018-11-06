import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps, withRouter } from 'react-router-dom';
import { log } from '../../../common/utils/logger';
import { sortBy } from '../../utils/arrays';
import { canDisplayNotifications, showNotification } from '../../utils/notifications';
import { getPushSubscription } from '../../utils/push';
import { shouldBeNotified } from '../../utils/ui';

import { pollingFrequency, notificationCloseTimeout } from '../../../constants/features';

import { createNotificationTag, createNotificationParams } from './notifier.models';
import { createNotification, removeNotification } from './notifier.actions';

import { getNotifications } from '../../root.reducer';

import NotifierView from './notifier-view';
import { RootState } from '../../root.types';
import { NotificationParams, ReactNotification, NotificationAction } from '../../../definitions/notification';
import { ButtonProps } from '../../components/buttons';
import { NAVIGATE_ACTION } from '../../../constants/notifications';

interface OwnState {
  goTo?: {
    pathname: string;
    state: any;
  };
}

interface OwnProps {}

type RouteProps = RouteComponentProps<{
  history: any;
}>;

interface StateProps {
  notifications: NotificationParams[];
}

interface DispatchProps {
  createNotification: Function;
  removeNotification: Function;
}

type Props = RouteProps & StateProps & DispatchProps & OwnProps;

class NotifierWrapper extends React.Component<Props, OwnState> {
  displayName = 'NotifierWrapper';

  // @ts-ignore
  polling = undefined;

  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  componentDidUpdate() {
    const { notifications } = this.props;

    if (notifications.length) {
      this.cleanOldNotifications();
    }
  }

  cleanOldNotifications = () => {
    const { notifications } = this.props;

    const removableNotifications = notifications.filter(n => !n.options.data.isPermanent);

    // If there are notifications displayed
    if (removableNotifications.length) {
      // Get current time
      const now = new Date().getTime();
      const notifsToClean = removableNotifications
        .filter(n => n.timestamp && now - n.timestamp >= notificationCloseTimeout)
        .map(n => n.options.tag);

      this.removeNotification(notifsToClean);

      // Each 1s, cleanOldNotifs again
      setTimeout(() => {
        this.cleanOldNotifications();
      }, 1000);
    }
  };

  removeNotification = (tags: string[]) => {
    tags.forEach(tag => {
      this.props.removeNotification({ tag });
    });
  };

  startPolling = () => {
    // @ts-ignore
    this.polling = setInterval(() => {}, pollingFrequency);
  };

  getActivities = () => {
    // If there is an active Push Subscription, stop long polling
    // because updates will come via Push
    if (getPushSubscription()) {
      log('There is an active PushSubscription, stopping long polling');
      // @ts-ignore
      clearInterval(this.polling);
      return;
    }
  };

  transformNativeActionsIntoReactActions = (params: NotificationParams): ReactNotification => {
    const { history } = this.props;

    if (!params.options.actions) {
      const reactNotification: ReactNotification = {
        ...params,
        options: {
          ...params.options,
          actions: [],
        },
      };

      return reactNotification;
    }

    const { actions } = params.options;
    const reactNotification: ReactNotification = {
      ...params,
      options: {
        ...params.options,
        actions: actions.map(
          (action: NotificationAction): ButtonProps => ({
            type: 'button',
            id: `${params.options.tag}-${action.action}-button`,
            label: action.label,
            icon: action.icon,
            className: 'Message-button',
            onClick: () => {
              this.removeNotification([params.options.tag]);

              switch (action.action) {
                case NAVIGATE_ACTION.action:
                  if (params.options.data.isExternal) {
                    return window.open(params.options.data.url);
                  }

                  const newUrl = '';
                  return history.push(newUrl);

                default:
                  return;
              }
            },
          })
        ),
      },
    };

    return reactNotification;
  };

  render() {
    const { notifications } = this.props;
    const { goTo } = this.state;

    if (goTo) {
      return <Redirect to={goTo} />;
    }

    return <NotifierView notifications={notifications.map(this.transformNativeActionsIntoReactActions)} />;
  }
}

const mapStateToProps = (state: RootState): StateProps => {
  const notifications = getNotifications(state).sort(sortBy('timestamp'));

  return {
    notifications,
  };
};

const mapDispatchToProps: DispatchProps = {
  createNotification,
  removeNotification,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NotifierWrapper)
);
