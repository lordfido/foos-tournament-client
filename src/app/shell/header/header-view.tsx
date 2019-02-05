import * as React from 'react';
import injectSheet from 'react-jss';
import { Link } from 'react-router-dom';

import { HOME } from '../../../constants/appRoutes';
import { HEADER_SIZE } from '../../../constants/styles/styles';
import { BLACK } from '../../../constants/styles/styles-colors';
import { TEXT_WHITE } from '../../../constants/styles/styles-fonts';

import { ISheet } from '../../root.models';

const sheet: ISheet = {
  wrapper: {
    backgroundColor: BLACK,
    color: TEXT_WHITE,
    flexShrink: 0,
    height: HEADER_SIZE,
    width: '100%',
  },
};

interface IOwnProps {
  classes: { [key: string]: string };
}

const unstyledHeaderView = ({ classes }: IOwnProps) => (
  <header className={classes.wrapper}>
    <Link to={HOME}>Home</Link>
  </header>
);

const HeaderView = injectSheet(sheet)(unstyledHeaderView);

export default HeaderView;
