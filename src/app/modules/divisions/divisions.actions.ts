import { ActionCreator } from '../../../definitions/action-creator';

import foosV2Api from '../../../common/apis/foosV2';

import { DIVISIONS_FAILURE, DIVISIONS_FETCH, DIVISIONS_SUCCESS } from '../../../constants/actionTypes';

import { createDivisionsFromServer } from './divisions.models';

export const fetchDivisions: ActionCreator = (seasonId: string) => dispatch => {
  dispatch({
    type: DIVISIONS_FETCH,
  });

  return foosV2Api.divisions
    .getSeasonDivisions(seasonId)
    .then(response => {
      dispatch({
        payload: createDivisionsFromServer(response as any, seasonId),
        type: DIVISIONS_SUCCESS,
      });
    })
    .catch(error => {
      dispatch({
        payload: error,
        type: DIVISIONS_FAILURE,
      });
    });
};
