import { IPlayerWithWins } from './players';

interface IMatch {
  locals: string;
  result: string;
  visitors: string;
}

export interface IJourney {
  date: number;
  division: string;
  matches: [IMatch, IMatch, IMatch];
  player: [IPlayerWithWins, IPlayerWithWins, IPlayerWithWins];
}
