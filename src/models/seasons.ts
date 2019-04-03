import { IRecentMatches } from './matches';
import { ISeasonRanking } from './rankings';

export interface ISummary {
  divisionRankings: ISeasonRanking[];
  recentMatches: IRecentMatches[];
}

export interface ISeasonSummary extends ISummary {
  seasonId: string;
}

export interface ISeason {
  id: string;
  label: string;
}

export interface ISeasonWithSummary extends ISeason, ISummary {}

export interface ISeasonsState {
  collection: Array<ISeason | ISeasonWithSummary>;
  isFetching: boolean;
  selected?: string;
}

export const initialSeasonsState: ISeasonsState = {
  collection: [],
  isFetching: false,
  selected: undefined,
};

const createSeasonFromServer = ({ id, label }: any): ISeason | undefined => {
  if (!id || !label) {
    return undefined;
  }

  return {
    id,
    label,
  };
};

export const createSeasonsFromServer = (seasonsFromServer: any[]): ISeason[] =>
  // @ts-ignore
  seasonsFromServer.map(createSeasonFromServer).filter(s => typeof s !== 'undefined');

export const createSeasonSummaryFromServer = (seasonSummaryFromServer: any): ISeasonSummary => {
  return seasonSummaryFromServer as ISeasonSummary;
};
