interface IRankingPosition {
  player: string;
  points: number;
  position: number;
}

export interface IRanking {
  division: string;
  ranking: IRankingPosition[];
}
