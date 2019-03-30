import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';

import { PADDING_XL } from '../../constants/styles/styles';
import { BLACK, GREEN, traslucentColor, WHITE } from '../../constants/styles/styles-colors';

import { ISheet } from '../../models';
import { DESKTOP } from '../../constants/styles/styles-media-queries';

const sheet: ISheet = {
  division: {
    appearance: 'none',
    backgroundColor: BLACK,
    border: 'none',
    borderRadius: 0,
    color: traslucentColor(WHITE, 0.5),
    height: 70,
    padding: PADDING_XL,
    textAlign: 'center',
    width: '25%',

    '&:first-child': {
      borderBottomLeftRadius: 5,
      borderTopLeftRadius: 5,
    },

    '&:last-child': {
      borderBottomRightRadius: 5,
      borderTopRightRadius: 5,
    },

    [DESKTOP]: {
      width: '100%',

      '&, &:first-child, &:last-child': {
        borderRadius: 0,
      },
    },
  },
  // tslint:disable:object-literal-sort-keys
  active: {
    backgroundColor: GREEN,
    color: BLACK,
  },
  wrapper: {
    textAlign: 'center',
    width: '100%',
  },
};

interface IOwnProps {
  classes: { [key: string]: string };
  divisions: Array<{
    id: string;
    label: string;
    onClick: (index: number) => void;
  }>;
  selected: number;
}

const UnstyledDivisionSelector = ({ classes, divisions, selected }: IOwnProps) => (
  <div className={classes.wrapper}>
    {divisions.map((division, index) => (
      <button
        className={classnames(classes.division, { [classes.active]: index === selected })}
        key={`division-selector-${division.id}`}
        onClick={() => division.onClick(index)}
      >
        {division.label}
      </button>
    ))}
  </div>
);

const DivisionSelector = injectSheet(sheet)(UnstyledDivisionSelector);

export default DivisionSelector;
