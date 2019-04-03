import { IPlayerWithWins } from './players';

interface IMatch {
  locals: string;
  result: string;
  visitors: string;
}

interface IJourney {
  matches: [IMatch, IMatch, IMatch];
  players: [IPlayerWithWins, IPlayerWithWins, IPlayerWithWins];
}

export interface IRecentMatches extends IJourney {
  date: number;
  division: string;
}

export interface IPlayedMatch extends IJourney {
  date: number;
  duration: string;
  id: string;
}
