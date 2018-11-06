import { createNotificationParams } from './notifier.models';
import { NOTIFIER_NOTIFICATION_REMOVED, LOGOUT_SUCCEED } from '../../../constants/actionTypes';
import { updateCollection } from '../../utils/collections';
import { NotifierState, RawNotificationParams } from './notifier.types';
import { DefaultAction } from '../../root.types';

const initialState: NotifierState = {
  collection: [],
  errors: [],
  isFetching: false,
};

const isSuccess = (actionType: string) =>
  /SUCCEED/.test(actionType) || (/UPDATED/.test(actionType) && /NOT_UPDATED/.test(actionType) === false);

const reducer = (state = initialState, action: DefaultAction): NotifierState => {
  if (action.type === NOTIFIER_NOTIFICATION_REMOVED) {
    return {
      ...state,
      collection: state.collection.filter(notification => notification.options.tag !== action.payload.tag),
      errors: state.errors.filter(error => error.options.tag !== action.payload.tag),
    };
  }

  if (action.type === LOGOUT_SUCCEED) {
    return {
      ...initialState,
      collection: [...state.collection.filter(notification => notification.options.data.shouldPersistOnLogout)],
    };
  }

  const notifications: Array<RawNotificationParams> = (action.payload && action.payload.notifications) || [];
  const errors: Array<RawNotificationParams> = (action.payload && action.payload.errors) || [];

  const filteredNotifications = notifications
    .filter(notification => notification.channel === 'web' || notification.channel === 'native')
    .map(createNotificationParams);

  const filteredErrors = errors
    .filter(error => error.channel === 'web' || error.channel === 'native')
    .filter(error => (isSuccess(action.type) ? error.reason !== 'connection' : true))
    .map(createNotificationParams);

  return {
    ...state,
    collection: updateCollection(state.collection, filteredNotifications),
    errors: updateCollection(state.errors, filteredErrors),
  };
};

export const getNotifications = (state: NotifierState) => [...state.collection, ...state.errors];

export default reducer;
