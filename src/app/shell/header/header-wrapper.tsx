import * as React from 'react';
import { connect } from 'react-redux';

import HeaderView from './header-view';

import { fetchDivisions } from '../../actions/divisions.actions';
import { getSeasonSummary, selectSeason } from '../../actions/seasons.actions';
import { getSeasonDivisions, getSeasons, getSelectedSeason } from '../../reducers';

import { IRootState } from '../../../models';
import { ISeason, ISeasonWithSummary } from '../../../models/seasons';
import { IFieldOutput, IOption } from '../../modules/forms/form.models';

interface IStateProps {
  divisions: any[];
  season: ISeason | ISeasonWithSummary | undefined;
  seasons: Array<ISeason | ISeasonWithSummary>;
}

interface IDispatchProps {
  FetchDivisions: (seasonId: string) => void;
  GetSeasonSummary: (seasonId: string) => void;
  SelectSeason: (seasonId: string) => void;
}

type Props = IStateProps & IDispatchProps;

const HeaderWrapper = ({ divisions, FetchDivisions, GetSeasonSummary, season, seasons, SelectSeason }: Props) => {
  const handleNavigation = () => {
    setIsOpen(false);
  };

  const handleSelectSeason = (output: IFieldOutput) => {
    // @ts-ignore
    const selected: IOption = output.value;
    SelectSeason(selected.value);
  };

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const updateDivisionsEffect = () => {
    if (season) {
      FetchDivisions(season.id);
      GetSeasonSummary(season.id);
    }
  };

  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(updateDivisionsEffect, [season && season.id]);

  return (
    <HeaderView
      divisions={divisions}
      handleNavigation={handleNavigation}
      handleSelectSeason={handleSelectSeason}
      handleToggleMenu={handleToggleMenu}
      isOpen={isOpen}
      season={season}
      seasons={seasons}
    />
  );
};

const mapStateToProps = (state: IRootState) => {
  const season = getSelectedSeason(state);

  return {
    divisions: season ? getSeasonDivisions(state)(season.id) : [],
    season,
    seasons: getSeasons(state),
  };
};

const mapDispatchToProps = {
  FetchDivisions: fetchDivisions,
  GetSeasonSummary: getSeasonSummary,
  SelectSeason: selectSeason,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderWrapper);
