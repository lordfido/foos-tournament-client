export const API_URL = 'http://localhost:4000';

export const SEASONS = `${API_URL}/seasons`;
export const SEASON_SUMMARY = `${API_URL}/seasons/:seasonId/summary`;
export const SEASON_DIVISIONS = `${API_URL}/seasons/:seasonId`;

export const DIVISION = `${API_URL}/divisions/:divisionId`;
export const DIVISION_PLAYER = `${API_URL}/divisions/:divisionId/player/:playerId`;
export const DIVISION_HISTORY = `${API_URL}/divisions/:divisionId/history`;

export const MATCH_SIMULATOR = `${API_URL}/simulator/:matchId`;
// export const MATCH_SIMULATE = `${API_URL}/simulator/:matchId/simulate`;
