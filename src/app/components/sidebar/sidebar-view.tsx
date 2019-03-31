import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';

import { GREY_DARK_2 } from '../../../constants/styles/styles-colors';
import { TEXT_WHITE } from '../../../constants/styles/styles-fonts';
import { MAX_TABLET_L } from '../../../constants/styles/styles-media-queries';

import { ISheet } from '../../../models';
import SidebarToggler from './toggler';

const sheet: ISheet = {
  content: {
    flex: 1,
    opacity: 0,
    transition: 'opacity 0.2s',
  },
  contentOpen: {
    opacity: 1,
  },
  wrapper: {
    background: GREY_DARK_2,
    color: TEXT_WHITE,
    display: 'flex',
    height: '100vh',
    left: -310 + 42, // Available space without overlapping rankings
    position: 'fixed',
    top: 0,
    transition: 'left 0.2s',
    width: 310,

    [MAX_TABLET_L]: {
      display: 'none',
    },
  },
  wrapperOpen: {
    left: 0,
  },
  wrapperRight: {
    left: 'initial',
    right: -310 + 42, // Available space without overlapping rankings
    transition: 'right 0.2s',
  },
  wrapperRightOpen: {
    right: 0,
  },
};

interface IOwnProps {
  children: React.ReactNode;
  classes: { [key: string]: string };
  handleToggleSidebar: () => void;
  isOpen: boolean;
  isRight?: boolean;
  title: string;
}

const UnstyledSidebarView = ({ children, classes, handleToggleSidebar, isOpen, isRight, title }: IOwnProps) => {
  const renderToggler = () => (
    <SidebarToggler handleToggleSidebar={handleToggleSidebar} isOpen={isOpen} isRight={isRight}>
      {title}
    </SidebarToggler>
  );

  return (
    <div
      className={classnames(classes.wrapper, {
        [classes.wrapperOpen]: !isRight && isOpen,
        [classes.wrapperRight]: isRight,
        [classes.wrapperRightOpen]: isRight && isOpen,
      })}
    >
      {isRight && renderToggler()}
      <div className={classnames(classes.content, { [classes.contentOpen]: isOpen })}>{children}</div>
      {!isRight && renderToggler()}
    </div>
  );
};

const SidebarView = injectSheet(sheet)(UnstyledSidebarView);

export default SidebarView;
