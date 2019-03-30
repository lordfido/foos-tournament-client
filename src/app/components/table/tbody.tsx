import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';

import Tr from './tr';

import { FONT_L, TEXT_BLACK } from '../../../constants/styles/styles-fonts';

import { ISheet } from '../../../models';

const sheet: ISheet = {
  wrapper: {
    color: TEXT_BLACK,
    fontSize: FONT_L,
    fontWeight: 300,
  },
};

interface IOwnProps {
  children: React.ReactElement<typeof Tr> | Array<React.ReactElement<typeof Tr>>;
  classes: { [key: string]: string };
  className?: string;
}

const UnstyledTbody = ({ children, classes, className }: IOwnProps) => (
  <tbody className={classnames(classes.wrapper, className)}>{children}</tbody>
);

const Tbody = injectSheet(sheet)(UnstyledTbody);

export default Tbody;
