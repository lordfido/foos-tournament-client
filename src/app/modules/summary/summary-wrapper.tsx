import * as React from 'react';
import { connect } from 'react-redux';

import SummaryView from './summary-view';

import { getCurrentDivisions, getSeasonDivisions, getSelectedSeason } from '../../reducers';

import { IRootState } from '../../../models';
import { IDivision, IDivisionWithData } from '../../../models/divisions';
import { ISeason, ISeasonWithSummary } from '../../../models/seasons';

interface IStateProps {
  divisions: Array<IDivision | IDivisionWithData>;
  season: ISeason | ISeasonWithSummary | undefined;
}

const SummaryWrapper = ({ divisions, season }: IStateProps) => {
  if (!season || !('recentMatches' in season)) {
    return null;
  }

  const handleSelectDivision = (index: number) => {
    setDivision(index);
  };

  const [division, setDivision] = React.useState(0);

  return (
    <SummaryView
      division={division}
      currentDivisions={divisions}
      handleSelectDivision={handleSelectDivision}
      season={season}
    />
  );
};

const mapStateToProps = (state: IRootState) => {
  const season = getSelectedSeason(state);
  const currentDivisions = getCurrentDivisions(state);
  const divisions = season ? getSeasonDivisions(state)(season.id) : [];
  return {
    divisions: divisions[0] && currentDivisions[0].id === divisions[0].id ? currentDivisions : [],
    season,
  };
};

export default connect(mapStateToProps)(SummaryWrapper);
