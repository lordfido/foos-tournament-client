import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';
import { NavLink } from 'react-router-dom';

import MenuButton from './menu-button';
import MenuDropdown from './menu-dropdown';

import { DIVISION, HOME } from '../../../constants/appRoutes';
import { PADDING_S, PADDING_XXXL } from '../../../constants/styles/styles';
import { GREEN, GREY_DARK_3 } from '../../../constants/styles/styles-colors';
import { TEXT_WHITE } from '../../../constants/styles/styles-fonts';

import { ISheet } from '../../../models';
import { IDivision } from '../../../models/divisions';
import { ISeason, ISeasonWithSummary } from '../../../models/seasons';
import { IFieldOutput } from '../../modules/forms/form.models';

const logo = require('../../../assets/images/logo.svg');

const sheet: ISheet = {
  home: {
    border: '2px solid transparent',
    borderRadius: '50%',
    display: 'inline-block',
    lineHeight: 0.8,
    padding: PADDING_S,
    transition: 'margin 0.2s, transform 0.2s',
  },
  homeActive: {
    borderColor: GREEN,
  },
  homeOpen: {
    marginLeft: '50%',
    transform: 'translateX(-50%)',
  },
  logo: {},
  menuButton: {
    position: 'absolute',
    right: PADDING_XXXL,
    top: PADDING_XXXL,
  },
  menuDropdown: {
    height: 0,
    left: 0,
    overflow: 'hidden',
    position: 'absolute',
    top: PADDING_XXXL * 3,
    transition: 'height 0.2s, padding 0.2s',
  },
  menuDropdownOpen: {
    height: `calc(100vh - ${PADDING_XXXL * 3}px)`,
    paddingTop: 60,
  },
  wrapper: {
    backgroundColor: GREY_DARK_3,
    color: TEXT_WHITE,
    padding: PADDING_XXXL,
    position: 'relative',
    width: '100%',
  },
};

interface IOwnProps {
  classes: { [key: string]: string };
  divisions: IDivision[];
  handleNavigation: () => void;
  handleSelectSeason: (output: IFieldOutput) => void;
  handleToggleMenu: () => void;
  isOpen: boolean;
  season: ISeason | ISeasonWithSummary | undefined;
  seasons: Array<ISeason | ISeasonWithSummary>;
}

const unstyledHeaderView = ({
  classes,
  divisions,
  handleNavigation,
  handleSelectSeason,
  handleToggleMenu,
  isOpen,
  season,
  seasons,
}: IOwnProps) => (
  <header className={classes.wrapper}>
    <MenuButton className={classes.menuButton} isOpen={isOpen} onClick={handleToggleMenu} />

    <NavLink
      className={classnames(classes.home, { [classes.homeOpen]: isOpen })}
      activeClassName={classes.homeActive}
      to={HOME}
      exact
      onClick={handleNavigation}
    >
      <img className={classes.logo} src={logo} />
    </NavLink>

    <MenuDropdown
      className={classnames(classes.menuDropdown, { [classes.menuDropdownOpen]: isOpen })}
      divisions={divisions.map(division => ({
        id: division.id,
        label: division.label,
        to: DIVISION.replace(':id', division.id),
      }))}
      handleNavigation={handleNavigation}
    />
  </header>
);

const HeaderView = injectSheet(sheet)(unstyledHeaderView);

export default HeaderView;
