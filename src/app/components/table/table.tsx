import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';

import Tbody from './tbody';
import Thead from './thead';

import { ISheet } from '../../../models';

const sheet: ISheet = {
  wrapper: {
    width: '100%',
  },
};

interface IOwnProps {
  children: Array<React.ReactElement<typeof Thead | typeof Tbody>>;
  classes: { [key: string]: string };
  className?: string;
}

const UnstyledTable = ({ children, classes, className }: IOwnProps) => (
  <table className={classnames(classes.wrapper, className)}>{children}</table>
);

const Table = injectSheet(sheet)(UnstyledTable);

export default Table;
