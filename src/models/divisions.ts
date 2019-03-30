export interface IDivision {
  id: string;
  label: string;
  season: string;
}

export interface IDivisionsState {
  collection: IDivision[];
  isFetching: boolean;
}

export const initialDivisionsState: IDivisionsState = {
  collection: [],
  isFetching: false,
};

const createDivisionFromServer = ({ id, label }: any, seasonId: string): IDivision | undefined => {
  if (!id || !label) {
    return undefined;
  }

  return {
    id,
    label,
    season: seasonId,
  };
};

export const createDivisionsFromServer = (divisionsFromServer: any[], seasonId: string) =>
  // @ts-ignore
  divisionsFromServer.map(d => createDivisionFromServer(d, seasonId)).filter(s => typeof s !== 'undefined');
