export interface IPlayer {
  name: string;
}

export interface IPlayerWithWins extends IPlayer {
  wins: number;
}
