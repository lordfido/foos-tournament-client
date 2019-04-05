import { AnyAction } from 'redux';

import {
  DIVISION_FAILURE,
  DIVISION_FETCH,
  DIVISION_SUCCESS,
  DIVISIONS_FAILURE,
  DIVISIONS_FETCH,
  DIVISIONS_SUCCESS,
} from '../../constants/actionTypes';

import {
  IDivision,
  IDivisionData,
  IDivisionsState,
  IDivisionWithData,
  initialDivisionsState,
} from '../../models/divisions';

const updateDivisions = (
  collection: Array<IDivision | IDivisionWithData>,
  payload: IDivision[]
): Array<IDivision | IDivisionWithData> => {
  const updatedCollection = [...collection];

  payload.forEach(divisionUpdatedData => {
    const existingDivisionIndex = updatedCollection.findIndex(s => s.id === divisionUpdatedData.id);
    if (existingDivisionIndex >= 0) {
      updatedCollection[existingDivisionIndex] = {
        ...updatedCollection[existingDivisionIndex],
        ...divisionUpdatedData,
      };
    } else {
      updatedCollection.push(divisionUpdatedData);
    }
  });

  return updatedCollection;
};

const updateDivision = (
  division: IDivision | IDivisionWithData,
  payload: {
    divisionId: string;
    data: IDivisionData;
  }
): IDivision | IDivisionWithData => {
  if (payload.divisionId !== division.id) {
    return division;
  }

  return {
    ...division,
    ...payload.data,
  };
};

const reducer = (state = initialDivisionsState, action: AnyAction) => {
  switch (action.type) {
    case DIVISIONS_SUCCESS:
      return {
        ...state,
        collection: updateDivisions(state.collection, action.payload),
        isFetching: false,
      };

    case DIVISION_SUCCESS:
      return {
        ...state,
        collection: state.collection.length
          ? state.collection.map(division => updateDivision(division, action.payload))
          : action.payload,
        isFetching: false,
      };

    case DIVISIONS_FETCH:
    case DIVISION_FETCH:
      return {
        ...state,
        isFetching: true,
      };

    case DIVISIONS_FAILURE:
    case DIVISION_FAILURE:
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
export const getDivision = (state: IDivisionsState) => (divisionId: string) =>
  state.collection.find(division => division.id === divisionId);
export const areDivisionsBeingFetched = (state: IDivisionsState) => state.isFetching;

export default reducer;
