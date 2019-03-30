import { CSSProperties } from 'react-jss';
import { combineReducers } from 'redux';

import divisionsReducer from './modules/divisions/divisions.reducer';
import seasonsReducer from './modules/seasons/seasons.reducer';

import { IDivisionsState } from './modules/divisions/divisions.models';
import { ISeasonsState } from './modules/seasons/seasons.models';

export interface IDefaultAction {
  type: string;
  payload?: any;
}

export interface IRootState {
  divisions: IDivisionsState;
  seasons: ISeasonsState;
}

export const createRootReducer = () =>
  combineReducers({
    divisions: divisionsReducer,
    seasons: seasonsReducer,
  });

export interface ISheet {
  [key: string]: CSSProperties<any>;
}
