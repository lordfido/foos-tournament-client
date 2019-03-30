import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';

import Tr from './tr';

import { GREY_DARK } from '../../../constants/styles/styles-colors';
import { FONT_M } from '../../../constants/styles/styles-fonts';

import { ISheet } from '../../../models';

const sheet: ISheet = {
  wrapper: {
    color: GREY_DARK,
    fontSize: FONT_M,
    fontWeight: 500,
    textAlign: 'right',
    textTransform: 'uppercase',
  },
};

interface IOwnProps {
  children: React.ReactElement<typeof Tr> | Array<React.ReactElement<typeof Tr>>;
  classes: { [key: string]: string };
  className?: string;
}

const UnstyledThead = ({ children, classes, className }: IOwnProps) => (
  <thead className={classnames(classes.wrapper, className)}>{children}</thead>
);

const Thead = injectSheet(sheet)(UnstyledThead);

export default Thead;
