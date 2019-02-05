import { CSSProperties } from 'react-jss';
import { combineReducers } from 'redux';

export interface IDefaultAction {
  type: string;
  payload?: any;
}

export interface IRootState {}

export const createRootReducer = () => combineReducers({});

export interface ISheet {
  [key: string]: CSSProperties<any>;
}
