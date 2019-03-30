import * as React from 'react';
import injectSheet from 'react-jss';

import Link from '../../components/link';
import Field from '../../modules/forms/field';

import { DIVISION, HOME } from '../../../constants/appRoutes';
import { PADDING_M } from '../../../constants/styles/styles';
import { BLACK } from '../../../constants/styles/styles-colors';
import { TEXT_WHITE } from '../../../constants/styles/styles-fonts';

import { IDivision } from '../../modules/divisions/divisions.models';
import { IFieldOutput } from '../../modules/forms/form.models';
import { ISeason } from '../../modules/seasons/seasons.models';
import { ISheet } from '../../root.models';

const sheet: ISheet = {
  link: {
    '&, &:active, &:hover, &:focus, & > *, &:active > *, &:hover > *, &:focus > *': {
      color: TEXT_WHITE,
      padding: PADDING_M,
    },
  },
  wrapper: {
    backgroundColor: BLACK,
    color: TEXT_WHITE,
    width: '100%',
  },
};

interface IOwnProps {
  classes: { [key: string]: string };
  divisions: IDivision[];
  handleSelectSeason: (output: IFieldOutput) => void;
  season: ISeason;
  seasons: ISeason[];
}

const unstyledHeaderView = ({ classes, divisions, handleSelectSeason, season, seasons }: IOwnProps) => (
  <header className={classes.wrapper}>
    <Link
      options={{
        className: classes.link,
        id: 'header-link-home',
        label: 'Home',
        to: HOME,
      }}
    />

    {divisions.map(division => (
      <Link
        key={`header-link-${division.id}`}
        options={{
          className: classes.link,
          id: `header-link-${division.id}`,
          label: division.label,
          to: DIVISION.replace(':id', division.id),
        }}
      />
    ))}
    <br />

    <Field
      options={{
        defaultValue: [season.id],
        id: 'seasons-selector',
        onChange: handleSelectSeason,
        options: seasons
          .map(({ id, label }) => ({
            id,
            label,
            value: id,
          }))
          .reverse(),
        type: 'dropdown',
      }}
    />
  </header>
);

const HeaderView = injectSheet(sheet)(unstyledHeaderView);

export default HeaderView;
