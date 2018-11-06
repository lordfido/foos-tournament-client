import { combineReducers, Reducer } from 'redux';
import { RootState } from './root.types';

// Import reducers
import notifierReducer, * as notifierSelectors from './modules/notifier/notifier.reducer';

const rootReducer: Reducer<RootState> = combineReducers({
  notifier: notifierReducer,
});

// Custom selectors
export const getNotifications = ({ notifier }: RootState) => notifierSelectors.getNotifications(notifier);

export default rootReducer;
