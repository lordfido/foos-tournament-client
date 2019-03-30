export interface ISeason {
  id: string;
  label: string;
}

export interface ISeasonsState {
  collection: ISeason[];
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
