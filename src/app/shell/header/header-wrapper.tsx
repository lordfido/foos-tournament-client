import * as React from 'react';
import { connect } from 'react-redux';

import HeaderView from './header-view';

import { fetchDivisions } from '../../modules/divisions/divisions.actions';
import { selectSeason } from '../../modules/seasons/seasons.actions';
import { getSeasonDivisions, getSeasons, getSelectedSeason } from '../../root.reducer';

import { IFieldOutput, IOption } from '../../modules/forms/form.models';
import { ISeason } from '../../modules/seasons/seasons.models';
import { IRootState } from '../../root.models';

interface IStateProps {
  divisions: any[];
  season: ISeason;
  seasons: ISeason[];
}

interface IDispatchProps {
  FetchDivisions: (seasonId: string) => void;
  SelectSeason: (seasonId: string) => void;
}

type Props = IStateProps & IDispatchProps;

const HeaderWrapper = ({ divisions, FetchDivisions, season, seasons, SelectSeason }: Props) => {
  const handleSelectSeason = (output: IFieldOutput) => {
    // @ts-ignore
    const selected: IOption = output.value;
    SelectSeason(selected.value);
  };

  const updateDivisionsEffect = () => {
    FetchDivisions(season.id);
  };

  React.useEffect(updateDivisionsEffect, [season]);

  return <HeaderView divisions={divisions} handleSelectSeason={handleSelectSeason} season={season} seasons={seasons} />;
};

const mapStateToProps = (state: IRootState) => {
  const season = getSelectedSeason(state);

  return {
    divisions: getSeasonDivisions(state)(season.id),
    season,
    seasons: getSeasons(state),
  };
};

const mapDispatchToProps = {
  FetchDivisions: fetchDivisions,
  SelectSeason: selectSeason,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderWrapper);
