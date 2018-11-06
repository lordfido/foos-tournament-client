import { isProduction, isPre } from '../common/utils/platforms';

export const BASE_URL = isProduction()
  ? '//api.suso.eu/foos/ajax'
  : isPre()
    ? '//dev-api.suso.eu/foos/ajax'
    : '//api.suso.local/ajax';

export const SUMMARY = '/summary/:seasonId';

export const SEASONS = '/seasons'; // TODO: Need this endpoint
export const SEASON = `/season/:seasonId`;

export const DIVISION = '/division/:divisionId';
export const DIVISION_HISTORY = '/history/:divisionId';

export const OPEN_MATCHES = '/matches/:divisionId/open'; // TODO: Need this endpoint
export const RECENT_MATCHES = '/matches/recents'; // TODO: Need this endpoint
export const MATCH = '/match/:matchId';

export const PLAYER = '/player/:playerId/:divisionId';

export const SIMULATE = '/simulator/:matchId';
export const SIMULATION = '/simulation/:matchId'; // post
