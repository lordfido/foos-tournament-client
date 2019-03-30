import * as React from 'react';
import injectSheet from 'react-jss';

import FooterWrapper from './shell/footer/footer-wrapper';
import HeaderWrapper from './shell/header/header-wrapper';

import { GREY_DARK_3 } from '../constants/styles/styles-colors';

import { ISheet } from '../models';

const sheet: ISheet = {
  content: {},
  contentWrapper: {
    overflowY: 'auto',
  },
  wrapper: {
    background: GREY_DARK_3,
  },
};
interface IOwnProps {
  children: JSX.Element;
  classes: { [key: string]: string };
}

const unstyledAppView = ({ children, classes }: IOwnProps) => (
  <div id="app" className={classes.wrapper}>
    <HeaderWrapper />
    <div className={classes.contentWrapper}>
      <div className={classes.content}>{children}</div>
      <FooterWrapper />
    </div>
  </div>
);

const AppView = injectSheet(sheet)(unstyledAppView);

export default AppView;
