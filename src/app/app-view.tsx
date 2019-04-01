import * as React from 'react';
import injectSheet from 'react-jss';

import { SIDEBAR_TOGGLER_WIDTH } from './components/sidebar/sidebar-view';
import HeaderWrapper from './shell/header/header-wrapper';

import { GREY_DARK_3 } from '../constants/styles/styles-colors';
import { DESKTOP } from '../constants/styles/styles-media-queries';
import { CONTENT } from '../constants/styles/styles-zindex';

import { ISheet } from '../models';

const sheet: ISheet = {
  content: {},
  contentWrapper: {
    [DESKTOP]: {
      zIndex: CONTENT,
    },
  },
  wrapper: {
    background: GREY_DARK_3,
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    overflow: 'hidden',
    overflowY: 'auto',

    [DESKTOP]: {
      width: `calc(100% - ${SIDEBAR_TOGGLER_WIDTH}px)`,
    },
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
    </div>
  </div>
);

const AppView = injectSheet(sheet)(unstyledAppView);

export default AppView;
