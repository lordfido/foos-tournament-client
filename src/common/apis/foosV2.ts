import http from '../../app/utils/http';
import { SEASON_DIVISIONS, SEASON_SUMMARY, SEASONS } from '../../constants/apiRoutes';

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
  },
};

export default foosV2Api;
