import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';
import { howManyAscending, howManyDescending } from '../utils/ui';

import { GREEN, RED, traslucentColor } from '../../constants/styles/styles-colors';

import { ISheet } from '../../models';

const sheet: ISheet = {
  positionCaret: {
    backgroundColor: 'grey',
    display: 'inline-block',
    float: 'left',
    height: 40 - 16,
    position: 'relative',
    width: 4,
  },
  positionCaretAscending: {
    backgroundColor: traslucentColor(GREEN, 0.5),
  },
  positionCaretDescending: {
    backgroundColor: traslucentColor(RED, 0.5),
  },
};

interface IOwnProps {
  classes: { [key: string]: string };
  divisionIndex: number;
  divisionsLength: number;
  playersLength: number;
  position: number;
}

const UnstyledPositionCaret = ({ classes, divisionIndex, divisionsLength, playersLength, position }: IOwnProps) => {
  const isAscending = position <= howManyAscending(divisionIndex);
  const isDescending = position > playersLength - howManyDescending(divisionIndex, divisionsLength);
  return (
    <span
      className={classnames({
        [classes.positionCaret]: isAscending || isDescending,
        [classes.positionCaretAscending]: isAscending,
        [classes.positionCaretDescending]: isDescending,
      })}
    />
  );
};

const PositionCaret = injectSheet(sheet)(UnstyledPositionCaret);

export default PositionCaret;
