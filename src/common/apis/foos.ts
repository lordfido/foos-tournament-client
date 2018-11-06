import http from '../../app/utils/http';

import {
  SEASONS,
  SEASON,
  DIVISION,
  OPEN_MATCHES,
  RECENT_MATCHES,
  MATCH,
  PLAYER,
  SIMULATE,
  SIMULATION,
  DIVISION_HISTORY,
} from '../../constants/apiRoutes';

import { Results } from './foos.types';

const foosApi = {
  seasons: {
    /**
     * Get a list of all available seasons
     */
    getSeasons: () =>
      http({
        url: SEASONS,
      }),

    /**
     * Get details about a particular season
     */
    getSeason: (seassonId: string) =>
      http({
        url: SEASON.replace(':seassonId', seassonId),
      }),
  },
  divisions: {
    /**
     * Get details about a particular division
     */
    getDivision: (divisionId: string) =>
      http({
        url: DIVISION.replace(':divisionId', divisionId),
      }),

    /**
     * Get a list of all matches for a particular division
     */
    getDivisionHistory: (divisionId: string) =>
      http({
        url: DIVISION_HISTORY.replace(':divisionId', divisionId),
      }),
  },
  matches: {
    /**
     * Get a list of all recent matches
     */
    getRecentMatches: () =>
      http({
        url: RECENT_MATCHES,
      }),

    /**
     * Get a list of all pending matches for a particular division
     */
    getOpenMatches: (divisionId: string) =>
      http({
        url: OPEN_MATCHES.replace(':divisionId', divisionId),
      }),

    /**
     * Get details about a particular match
     */
    getMatch: (matchId: string) =>
      http({
        url: MATCH.replace(':matchId', matchId),
      }),

    /**
     * Get the template to display a 'Simulation' modal
     */
    getSimulationTemplate: (matchId: string) =>
      http({
        url: SIMULATE.replace(':matchId', matchId),
      }),

    /**
     * Get an updated ranking of the division, based on simulation
     */
    getSimulationResult: (matchId: string, results: Results) => {
      return http({
        url: SIMULATION.replace(':matchId', matchId),
        method: 'post',
        payload: {
          results,
        },
      });
    },
  },
  players: {
    /**
     * Get details about a particular player
     */
    getPlayer: (playerId: string, divisionId: string) =>
      http({
        url: PLAYER.replace(':playerId', playerId).replace(':divisionId', divisionId),
      }),
  },
};

export default foosApi;
