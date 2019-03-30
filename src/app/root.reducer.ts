// Import reducers
import * as divisionsSelectors from './modules/divisions/divisions.reducer';
import * as seasonsSelectors from './modules/seasons/seasons.reducer';

import { createRootReducer, IRootState } from './root.models';

// Declare root reducer
const rootReducer = createRootReducer();

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
  return divisionsSelectors.getSeasonDivisions(divisions)(currentSeason.id);
};
export const getSeasonDivisions = ({ divisions }: IRootState) => divisionsSelectors.getSeasonDivisions(divisions);
export const areDivisionsBeingFetched = ({ divisions }: IRootState) =>
  divisionsSelectors.areDivisionsBeingFetched(divisions);

export default rootReducer;
