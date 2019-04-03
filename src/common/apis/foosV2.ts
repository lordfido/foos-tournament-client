import http from '../../app/utils/http';
import { DIVISION, SEASON_DIVISIONS, SEASON_SUMMARY, SEASONS } from '../../constants/apiRoutes';

const foosV2Api = {
  seasons: {
    getSeasons: () =>
      http({
        url: SEASONS,
      }),

    getSeasonSummary: (seasonId: string) =>
      http({
        url: SEASON_SUMMARY.replace(':seasonId', seasonId),
      }),
  },

  divisions: {
    getSeasonDivisions: (seasonId: string) =>
      http({
        url: SEASON_DIVISIONS.replace(':seasonId', seasonId),
      }),

    getDivisionDetails: (divisionId: string) =>
      http({
        url: DIVISION.replace(':divisionId', divisionId),
      }),
  },
};

export default foosV2Api;
