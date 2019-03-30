import { AnyAction } from 'redux';
import { updateCollection } from '../../utils/collections';

import { SEASON_SELECT, SEASONS_FAILURE, SEASONS_FETCH, SEASONS_SUCCESS } from '../../../constants/actionTypes';

import { initialSeasonsState, ISeasonsState } from './seasons.models';

const reducer = (state = initialSeasonsState, action: AnyAction) => {
  switch (action.type) {
    case SEASONS_FETCH:
      return {
        ...state,
        isFetching: true,
      };

    case SEASONS_SUCCESS:
      return {
        ...state,
        collection: updateCollection(state.collection, action.payload),
        isFetching: false,
        selected: undefined,
      };

    case SEASONS_FAILURE:
      return {
        ...state,
        isFetching: false,
      };

    case SEASON_SELECT:
      return {
        ...state,
        selected: action.payload,
      };

    default:
      return state;
  }
};

export const getSeasons = (state: ISeasonsState) => state.collection;
export const getCurrentSeason = (state: ISeasonsState) => state.collection[state.collection.length - 1];
export const getSelectedSeason = (state: ISeasonsState) =>
  state.collection.find(season => season.id === state.selected) || getCurrentSeason(state);
export const areSeasonsBeingFetched = (state: ISeasonsState) => state.isFetching;

export default reducer;
