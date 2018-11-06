import { NotifierState } from './modules/notifier/notifier.types';

export interface DefaultAction {
  type: string;
  payload?: any;
}

export interface RootState {
  notifier: NotifierState;
}
