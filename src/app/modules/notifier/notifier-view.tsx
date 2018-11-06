import * as React from 'react';
import classnames from 'classnames';

import Buttons from '../../components/buttons';
import { ReactNotification } from '../../../definitions/notification';

interface OwnProps {
  notifications: ReactNotification[];
}

class NotifierView extends React.Component<OwnProps> {
  static displayName = 'NotifierView';

  render() {
    const { notifications } = this.props;

    return (
      <div className="Notifier">
        {notifications.map(notification => {
          const classes = {
            wrapper: classnames('Message', 'Notifier-notification', {
              'is-active': notification.options.data.isActive,
              'Notifier-offline-banner': notification.options.data.reason === 'connection',
              [`Message--${notification.options.data.type}`]: notification.options.data.type,
            }),
          };

          return (
            <div
              id={`notification-${notification.options.tag}`}
              className={classes.wrapper}
              key={notification.options.tag}
            >
              <p className="Message-text">{notification.options.body}</p>

              {notification.options.actions && (
                <Buttons className="Message-buttons" options={notification.options.actions} />
              )}
            </div>
          );
        })}
      </div>
    );
  }
}

export default NotifierView;
