import { CSSProperties } from 'react-jss';

import { IDivisionsState } from './divisions';
import { ISeasonsState } from './seasons';

export interface IRootState {
  divisions: IDivisionsState;
  seasons: ISeasonsState;
}

export interface ISheet {
  [key: string]: CSSProperties<any>;
}
