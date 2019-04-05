import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';

import HeaderView from './header-view';

import { fetchDivisions } from '../../actions/divisions';
import { getSeasonSummary, selectSeason } from '../../actions/seasons';
import { getSeasonDivisions, getSeasons, getSelectedSeason } from '../../reducers';

import { HOME } from '../../../constants/appRoutes';

import { IRootState } from '../../../models';
import { ISeason, ISeasonWithSummary } from '../../../models/seasons';
import { IFieldOutput, IOption } from '../../modules/forms/form.models';

type IRouteProps = RouteComponentProps<{}>;

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

type Props = IRouteProps & IStateProps & IDispatchProps;

const HeaderWrapper = ({
  divisions,
  FetchDivisions,
  GetSeasonSummary,
  history,
  season,
  seasons,
  SelectSeason,
}: Props) => {
  const handleNavigation = () => {
    setIsOpen(false);
  };

  const handleSelectSeason = (output: IFieldOutput) => {
    // @ts-ignore
    const selected: IOption = output.value;
    SelectSeason(selected.value);
    history.push(HOME);
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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(HeaderWrapper)
);
