export interface ISummaryRanking {
  player: string;
  points: number;
  position: number;
}

export interface ISeasonRanking {
  division: string;
  ranking: ISummaryRanking[];
}

export interface IDivisionRanking extends ISummaryRanking {
  label: string;
  matches: number;
  rivals: number;
}
