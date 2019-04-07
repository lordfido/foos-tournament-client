import * as React from 'react';
import injectSheet from 'react-jss';
import { round } from '../../utils/numbers';

import Table, { Tbody, Td, Thead, Tr } from '../../components/table';

import { TEXT_BLACK, TEXT_GREY } from '../../../constants/styles/styles-fonts';

import { ISheet } from '../../../models';
import { IDivisionRanking } from '../../../models/rankings';

const sheet: ISheet = {
  matchesCells: {
    textAlign: 'right',
  },
  playerCells: {
    textAlign: 'left',
  },
  pointCells: {
    color: TEXT_BLACK,
    fontWeight: 700,
    textAlign: 'right',
  },
  positionCells: {
    color: TEXT_GREY,
    textAlign: 'right',
  },
  rivalsCells: {
    textAlign: 'right',
  },
};

interface IOwnProps {
  classes: { [key: string]: string };
  ranking: IDivisionRanking[];
}

const UnstyledDivisionRanking = ({ classes, ranking }: IOwnProps) => (
  <Table>
    <Thead>
      <Tr>
        <Td heading />
        <Td className={classes.playerCells} heading />
        <Td heading>Matches</Td>
        <Td heading>Rivals</Td>
        <Td heading>Points</Td>
      </Tr>
    </Thead>
    <Tbody>
      {ranking.map(entry => (
        <Tr key={`ranking-${entry.position}`}>
          <Td className={classes.positionCells}>{entry.position}</Td>
          <Td className={classes.playerCells}>{entry.label}</Td>
          <Td className={classes.matchesCells}>{entry.matches}</Td>
          <Td className={classes.rivalsCells}>{entry.rivals}</Td>
          <Td className={classes.pointCells}>{round(entry.points)}</Td>
        </Tr>
      ))}
    </Tbody>
  </Table>
);

const DivisionRanking = injectSheet(sheet)(UnstyledDivisionRanking);

export default DivisionRanking;
