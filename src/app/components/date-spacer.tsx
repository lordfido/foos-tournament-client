import * as React from 'react';
import injectSheet from 'react-jss';
import { areTheyTheSameDate } from '../utils/time';
import { formatDate } from '../utils/time';

import { PADDING_L, PADDING_XL, PADDING_XXL } from '../../constants/styles/styles';
import { GREY_LIGHT, traslucentColor } from '../../constants/styles/styles-colors';

import { ISheet } from '../../models';

const COLOR = traslucentColor(GREY_LIGHT, 0.2);

const sheet: ISheet = {
  divider: {
    borderBottom: `1px solid ${COLOR}`,
    flex: 1,
    transform: 'translateY(-50%)',
  },
  text: {
    color: COLOR,
    padding: `0 ${PADDING_XXL}px`,
    textTransform: 'uppercase',
  },
  wrapper: {
    display: 'flex',
    marginBottom: PADDING_XL,
    marginTop: PADDING_L,
    width: '100%',
  },
};

interface IOwnProps {
  classes: { [key: string]: string };
  dates: [Date, Date];
}

const UnstyledDateSpacer = ({ classes, dates }: IOwnProps) => {
  const sameDay = areTheyTheSameDate(new Date(dates[0]), new Date(dates[1]));
  const parsed = formatDate(dates[0]);

  if (sameDay) {
    return null;
  }

  return (
    <div className={classes.wrapper}>
      <span className={classes.divider} />
      <span className={classes.text}>{parsed}</span>
      <span className={classes.divider} />
    </div>
  );
};

const DateSpacer = injectSheet(sheet)(UnstyledDateSpacer);

export default DateSpacer;
