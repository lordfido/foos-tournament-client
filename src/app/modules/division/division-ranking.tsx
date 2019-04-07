import * as React from 'react';
import injectSheet from 'react-jss';
import { sortBy } from '../../utils/arrays';
import { round } from '../../utils/numbers';

import PositionCaret from '../../components/position-caret';
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

type SortingOption = 'matches' | 'rivals' | 'points';
const MATCHES: SortingOption = 'matches';
const RIVALS: SortingOption = 'rivals';
const POINTS: SortingOption = 'points';

interface ISortOptions {
  sortBy: SortingOption;
  reverse: boolean;
}

interface IOwnProps {
  classes: { [key: string]: string };
  divisionIndex: number;
  divisionsLength: number;
  ranking: IDivisionRanking[];
}

const UnstyledDivisionRanking = ({ classes, divisionIndex, divisionsLength, ranking }: IOwnProps) => {
  const handleSortTable = (newOrder: SortingOption) => {
    setSortedBy({
      reverse: newOrder !== sortedBy.sortBy ? true : !sortedBy.reverse,
      sortBy: newOrder,
    });
  };

  const [sortedBy, setSortedBy] = React.useState({ reverse: true, sortBy: POINTS } as ISortOptions);
  const [sortedRanking, setSortedRanking] = React.useState(ranking);

  const reactToSortTable = () => {
    setSortedRanking(ranking.map(p => p).sort(sortBy(sortedBy.sortBy, sortedBy.reverse ? 'desc' : 'asc')));
  };
  React.useEffect(reactToSortTable, [ranking, sortedBy]);

  return (
    <Table>
      <Thead>
        <Tr>
          <Td heading />
          <Td className={classes.playerCells} heading />
          <Td heading onClick={() => handleSortTable(MATCHES)}>
            Matches
          </Td>
          <Td heading onClick={() => handleSortTable(RIVALS)}>
            Rivals
          </Td>
          <Td heading onClick={() => handleSortTable(POINTS)}>
            Points
          </Td>
        </Tr>
      </Thead>
      <Tbody>
        {sortedRanking.map((entry, index) => (
          <Tr key={`ranking-${entry.position}`}>
            <Td className={classes.positionCells}>
              <PositionCaret
                divisionIndex={divisionIndex}
                divisionsLength={divisionsLength}
                playersLength={ranking.length}
                position={entry.position}
              />
              {entry.position}
            </Td>
            <Td className={classes.playerCells}>{entry.label}</Td>
            <Td className={classes.matchesCells}>{entry.matches}</Td>
            <Td className={classes.rivalsCells}>{entry.rivals}</Td>
            <Td className={classes.pointCells}>{round(entry.points)}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

const DivisionRanking = injectSheet(sheet)(UnstyledDivisionRanking);

export default DivisionRanking;
