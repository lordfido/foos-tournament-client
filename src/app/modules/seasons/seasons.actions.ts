import { ActionCreator } from '../../../definitions/action-creator';

import foosV2Api from '../../../common/apis/foosV2';

import { SEASON_SELECT, SEASONS_FAILURE, SEASONS_FETCH, SEASONS_SUCCESS } from '../../../constants/actionTypes';

import { createSeasonsFromServer } from './seasons.models';

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
