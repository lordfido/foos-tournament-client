import { combineReducers } from 'redux';

// Import reducers
import divisionsReducer, * as divisionsSelectors from './divisions';
import seasonsReducer, * as seasonsSelectors from './seasons';

import { IRootState } from '../../models';

// Declare root reducer
const rootReducer = combineReducers({
  divisions: divisionsReducer,
  seasons: seasonsReducer,
});

// Custom selectors

// Seasons
export const getSeasons = ({ seasons }: IRootState) => seasonsSelectors.getSeasons(seasons);
export const getCurrentSeason = ({ seasons }: IRootState) => seasonsSelectors.getCurrentSeason(seasons);
export const getSelectedSeason = ({ seasons }: IRootState) => seasonsSelectors.getSelectedSeason(seasons);
export const areSeasonsBeingFetched = ({ seasons }: IRootState) => seasonsSelectors.areSeasonsBeingFetched(seasons);

// Divisions
export const getDivisions = ({ divisions }: IRootState) => divisionsSelectors.getDivisions(divisions);
export const getCurrentDivisions = ({ divisions, seasons }: IRootState) => {
  const currentSeason = seasonsSelectors.getCurrentSeason(seasons);
  return currentSeason ? divisionsSelectors.getSeasonDivisions(divisions)(currentSeason.id) : [];
};
export const getSeasonDivisions = ({ divisions }: IRootState) => divisionsSelectors.getSeasonDivisions(divisions);
export const getDivision = ({ divisions }: IRootState) => divisionsSelectors.getDivision(divisions);
export const areDivisionsBeingFetched = ({ divisions }: IRootState) =>
  divisionsSelectors.areDivisionsBeingFetched(divisions);

export default rootReducer;
