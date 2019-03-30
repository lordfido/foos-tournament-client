import * as React from 'react';
import { connect } from 'react-redux';

import SummaryView from './summary-view';

import { getSelectedSeason } from '../../reducers';

import { IRootState } from '../../../models';
import { ISeason, ISeasonWithSummary } from '../../../models/seasons';

interface IStateProps {
  season: ISeason | ISeasonWithSummary | undefined;
}

const SummaryWrapper = ({ season }: IStateProps) => {
  if (!season || !('recentMatches' in season)) {
    return null;
  }

  const handleSelectDivision = (index: number) => {
    setDivision(index);
  };

  const [division, setDivision] = React.useState(0);

  return <SummaryView division={division} handleSelectDivision={handleSelectDivision} season={season} />;
};

const mapStateToProps = (state: IRootState) => {
  const season = getSelectedSeason(state);
  return {
    season,
  };
};

export default connect(mapStateToProps)(SummaryWrapper);
