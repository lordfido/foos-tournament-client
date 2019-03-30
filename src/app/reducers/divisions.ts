import { AnyAction } from 'redux';
import { updateCollection } from '../utils/collections';

import { DIVISIONS_FAILURE, DIVISIONS_FETCH, DIVISIONS_SUCCESS } from '../../constants/actionTypes';

import { IDivisionsState, initialDivisionsState } from '../../models/divisions';

const reducer = (state = initialDivisionsState, action: AnyAction) => {
  switch (action.type) {
    case DIVISIONS_FETCH:
      return {
        ...state,
        isFetching: true,
      };

    case DIVISIONS_SUCCESS:
      return {
        ...state,
        collection: updateCollection(state.collection, action.payload),
        isFetching: false,
      };

    case DIVISIONS_FAILURE:
      return {
        ...state,
        isFetching: false,
      };

    default:
      return state;
  }
};

export const getDivisions = (state: IDivisionsState) => state.collection;
export const getSeasonDivisions = (state: IDivisionsState) => (seasonId: string) =>
  state.collection.filter(division => division.season === seasonId);
export const areDivisionsBeingFetched = (state: IDivisionsState) => state.isFetching;

export default reducer;
