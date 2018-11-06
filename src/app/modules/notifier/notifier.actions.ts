import { ActionCreator } from '../../../definitions/action-creator';

import { NOTIFIER_NOTIFICATION_DISPLAYED, NOTIFIER_NOTIFICATION_REMOVED } from '../../../constants/actionTypes';
import { DISMISS_ACTION, NAVIGATE_ACTION } from '../../../constants/notifications';

export const createNotification: ActionCreator = payload => dispatch => {
  dispatch({
    type: NOTIFIER_NOTIFICATION_DISPLAYED,
    payload: {
      notifications: [
        {
          channel: 'web',
          title: payload.title,
          ...payload.options,
          actions: [...payload.options.actions, DISMISS_ACTION] || [NAVIGATE_ACTION, DISMISS_ACTION],
        },
      ],
    },
  });
};

export const removeNotification: ActionCreator = payload => dispatch => {
  dispatch({
    type: NOTIFIER_NOTIFICATION_REMOVED,
    payload,
  });
};
