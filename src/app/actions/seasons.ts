import { ActionCreator } from '../../definitions/action-creator';

import foosV2Api from '../../common/apis/foosV2';

import {
  SEASON_SELECT,
  SEASON_SUMMARY_FAILURE,
  SEASON_SUMMARY_FETCH,
  SEASON_SUMMARY_SUCCESS,
  SEASONS_FAILURE,
  SEASONS_FETCH,
  SEASONS_SUCCESS,
} from '../../constants/actionTypes';

import { createSeasonsFromServer, createSeasonSummaryFromServer } from '../../models/seasons';

export const fetchSeasons: ActionCreator = () => dispatch => {
  dispatch({
    type: SEASONS_FETCH,
  });

  return foosV2Api.seasons
    .getSeasons()
    .then(response => {
      dispatch({
        payload: createSeasonsFromServer(response as any),
        type: SEASONS_SUCCESS,
      });
    })
    .catch(error => {
      dispatch({
        payload: error,
        type: SEASONS_FAILURE,
      });
    });
};

export const selectSeason: ActionCreator = (seasonId: string) => dispatch => {
  dispatch({
    payload: seasonId,
    type: SEASON_SELECT,
  });
};

export const getSeasonSummary: ActionCreator = (seasonId: string) => dispatch => {
  dispatch({
    type: SEASON_SUMMARY_FETCH,
  });

  return foosV2Api.seasons
    .getSeasonSummary(seasonId)
    .then(response => {
      dispatch({
        payload: createSeasonSummaryFromServer(response as any),
        type: SEASON_SUMMARY_SUCCESS,
      });
    })
    .catch(error => {
      dispatch({
        payload: error,
        type: SEASON_SUMMARY_FAILURE,
      });
    });
};
