import { isProduction, isPre } from '../common/utils/platforms';

export const BASE_URL = isProduction()
  ? '//api.suso.eu/foos'
  : isPre()
    ? '//dev-api.suso.eu/foos'
    : 'http://localhost:4567';

export const SUMMARY = `${BASE_URL}/ajax/summary/:seasonId`;

export const SEASONS = `${BASE_URL}/api/v1/seasons/`; // TODO: Need this endpoint
export const SEASON = `/season/:seasonId`;

export const DIVISION = `${BASE_URL}/ajax/division/:divisionId`;
export const DIVISION_HISTORY = `${BASE_URL}/ajax/history/:divisionId`;

export const OPEN_MATCHES = `${BASE_URL}/ajax/matches/:divisionId/open`; // TODO: Need this endpoint
export const RECENT_MATCHES = `${BASE_URL}/ajax/matches/recents`; // TODO: Need this endpoint
export const MATCH = `${BASE_URL}/ajax/match/:matchId`;

export const PLAYER = `${BASE_URL}/ajax/player/:playerId/:divisionId`;

export const SIMULATE = `${BASE_URL}/ajax/simulator/:matchId`;
export const SIMULATION = `${BASE_URL}/ajax/simulation/:matchId`; // post
