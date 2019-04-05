import { AnyAction } from 'redux';

import {
  SEASON_SELECT,
  SEASON_SUMMARY_FAILURE,
  SEASON_SUMMARY_FETCH,
  SEASON_SUMMARY_SUCCESS,
  SEASONS_FAILURE,
  SEASONS_FETCH,
  SEASONS_SUCCESS,
} from '../../constants/actionTypes';

import {
  initialSeasonsState,
  ISeason,
  ISeasonsState,
  ISeasonSummary,
  ISeasonWithSummary,
  ISummary,
} from '../../models/seasons';

const updateSeasons = (
  collection: Array<ISeason | ISeasonWithSummary>,
  payload: ISeason[]
): Array<ISeason | ISeasonWithSummary> => {
  const updatedCollection = [...collection];

  payload.forEach(seasonUpdatedData => {
    const existingSeasonIndex = updatedCollection.findIndex(s => s.id === seasonUpdatedData.id);
    if (existingSeasonIndex >= 0) {
      updatedCollection[existingSeasonIndex] = { ...updatedCollection[existingSeasonIndex], ...seasonUpdatedData };
    } else {
      updatedCollection.push(seasonUpdatedData);
    }
  });

  return updatedCollection;
};

const addSummaryToSeason = (season: ISeason, payload: ISeasonSummary): ISeason | ISeasonWithSummary => {
  const { seasonId, ...summary } = payload;

  if (season.id !== seasonId) {
    return season;
  }

  return {
    ...season,
    ...(summary as ISummary),
  };
};

const reducer = (state = initialSeasonsState, action: AnyAction) => {
  switch (action.type) {
    case SEASONS_SUCCESS:
      return {
        ...state,
        collection: updateSeasons(state.collection, action.payload),
        isFetching: false,
        selected: undefined,
      };

    case SEASON_SUMMARY_SUCCESS:
      return {
        ...state,
        collection: state.collection.map(season => addSummaryToSeason(season, action.payload)),
        isFetching: false,
      };

    case SEASON_SELECT:
      return {
        ...state,
        selected: action.payload,
      };

    case SEASON_SUMMARY_FETCH:
    case SEASONS_FETCH:
      return {
        ...state,
        isFetching: true,
      };

    case SEASON_SUMMARY_FAILURE:
    case SEASONS_FAILURE:
      return {
        ...state,
        isFetching: false,
      };

    default:
      return state;
  }
};

export const getSeasons = (state: ISeasonsState) => state.collection;
export const getCurrentSeason = (state: ISeasonsState): ISeason | ISeasonWithSummary | undefined =>
  state.collection.length ? state.collection[state.collection.length - 1] : undefined;
export const getSelectedSeason = (state: ISeasonsState): ISeason | ISeasonWithSummary | undefined =>
  state.collection.find(season => season.id === state.selected) || getCurrentSeason(state);
export const areSeasonsBeingFetched = (state: ISeasonsState) => state.isFetching;

export default reducer;
