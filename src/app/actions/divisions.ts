import { ActionCreator } from '../../definitions/action-creator';

import foosV2Api from '../../common/apis/foosV2';

import {
  DIVISION_FAILURE,
  DIVISION_FETCH,
  DIVISION_SUCCESS,
  DIVISIONS_FAILURE,
  DIVISIONS_FETCH,
  DIVISIONS_SUCCESS,
} from '../../constants/actionTypes';

import { createDivisionsFromServer } from '../../models/divisions';

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

export const fetchDivisionDetails: ActionCreator = (divisionId: string) => dispatch => {
  dispatch({
    type: DIVISION_FETCH,
  });

  return foosV2Api.divisions
    .getDivisionDetails(divisionId)
    .then(response => {
      dispatch({
        payload: {
          data: response as any,
          divisionId,
        },
        type: DIVISION_SUCCESS,
      });
    })
    .catch(error => {
      dispatch({
        payload: error,
        type: DIVISION_FAILURE,
      });
    });
};
