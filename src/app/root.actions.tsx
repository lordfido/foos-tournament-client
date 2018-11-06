import { ActionCreator } from '../definitions/action-creator';
import foosApi from '../common/apis/foos';

export const getSeasons: ActionCreator = () => dispatch => {
  dispatch({
    type: 'SEASONS_REQUEST',
  });

  foosApi.seasons
    .getSeasons()
    .then(response => {
      dispatch({
        type: 'SEASONS_SUCCESS',
        payload: response,
      });

      return response;
    })
    .catch(error => {
      dispatch({
        type: 'SEASONS_FAILURE',
        payload: error,
      });

      return error;
    });
};
