import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';

import { FONT_L, TEXT_WHITE } from '../../../constants/styles/styles-fonts';

import { ISheet } from '../../../models';

const sheet: ISheet = {
  toggle: {
    appearance: 'none',
    backgroundColor: 'transparent',
    border: 'none',
    color: TEXT_WHITE,
    cursor: 'pointer',
    fontSize: FONT_L,
    fontWeight: 700,
    height: 42,
    letterSpacing: 4,
    textTransform: 'uppercase',
    transform: 'rotate(90deg) translate(48%, 1111%)',
    width: '100vh',
  },
  toggleRight: {
    transform: 'rotate(-90deg) translate(-48%, -1111%)',
  },
};

interface IOwnProps {
  children: React.ReactNode;
  classes: { [key: string]: string };
  handleToggleSidebar: () => void;
  isOpen: boolean;
  isRight: boolean;
}

const UnstyledSidebarToggler = ({ children, classes, handleToggleSidebar, isOpen, isRight }: IOwnProps) => (
  <button
    className={classnames(classes.toggle, { [classes.toggleRight]: isRight, [classes.toggleOpen]: isOpen })}
    onClick={handleToggleSidebar}
  >
    {children}
  </button>
);

const SidebarToggler = injectSheet(sheet)(UnstyledSidebarToggler);

export default SidebarToggler;
