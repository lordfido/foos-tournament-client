import * as React from 'react';
import injectSheet from 'react-jss';

import Table, { Tbody, Td, Thead, Tr } from '../../components/table';

import { TEXT_BLACK, TEXT_GREY } from '../../../constants/styles/styles-fonts';

import { ISheet } from '../../../models';
import { ISummaryRanking } from '../../../models/rankings';

const sheet: ISheet = {
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
};

interface IOwnProps {
  classes: { [key: string]: string };
  ranking: ISummaryRanking[];
}

const UnstyledSummaryRanking = ({ classes, ranking }: IOwnProps) => (
  <Table>
    <Thead>
      <Tr>
        <Td heading>Pos</Td>
        <Td className={classes.playerCells} heading>
          Player
        </Td>
        <Td heading>Points</Td>
      </Tr>
    </Thead>
    <Tbody>
      {ranking.map(entry => (
        <Tr key={`ranking-${entry.position}`}>
          <Td className={classes.positionCells}>{entry.position}</Td>
          <Td className={classes.playerCells}>{entry.player}</Td>
          <Td className={classes.pointCells}>{entry.points}</Td>
        </Tr>
      ))}
    </Tbody>
  </Table>
);

const SummaryRanking = injectSheet(sheet)(UnstyledSummaryRanking);

export default SummaryRanking;
