import http from '../../app/utils/http';
import { SEASON_DIVISIONS, SEASONS } from '../../constants/apiRoutes';

const foosV2Api = {
  seasons: {
    getSeasons: () =>
      http({
        url: SEASONS,
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
