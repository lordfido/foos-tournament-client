import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';

import { PADDING_L } from '../../../constants/styles/styles';

import { ISheet } from '../../../models';

const sheet: ISheet = {
  clickable: {
    cursor: 'pointer',
  },
  wrapper: {
    padding: PADDING_L,
  },
};

interface IOwnProps {
  children?: React.ReactNode;
  classes: { [key: string]: string };
  className?: string;
  heading?: boolean;
  onClick?: () => void;
}

const UnstyledTd = ({ children, classes, className, heading, onClick }: IOwnProps) => (
  <td
    className={classnames(classes.wrapper, className, { [classes.clickable]: !!onClick, [classes.heading]: heading })}
    onClick={onClick}
  >
    {children}
  </td>
);

const Td = injectSheet(sheet)(UnstyledTd);

export default Td;
