import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';

import Td from './td';

import { ISheet } from '../../../models';

const sheet: ISheet = {
  wrapper: {},
};

interface IOwnProps {
  children: React.ReactElement<typeof Td> | Array<React.ReactElement<typeof Td>>;
  classes: { [key: string]: string };
  className?: string;
}

const UnstyledTr = ({ children, classes, className }: IOwnProps) => (
  <tr className={classnames(classes.wrapper, className)}>{children}</tr>
);

const Tr = injectSheet(sheet)(UnstyledTr);

export default Tr;
