import * as React from 'react';
import injectSheet from 'react-jss';

import Match from '../../components/match';
import Table, { Tbody, Td, Thead, Tr } from '../../components/table';

import { PADDING_XXL, PADDING_XXXL, PAGE_MAX_WIDTH } from '../../../constants/styles/styles';
import { BLACK, WHITE } from '../../../constants/styles/styles-colors';
import { FONT_XXL, TEXT_BLACK, TEXT_GREY } from '../../../constants/styles/styles-fonts';
import { DESKTOP } from '../../../constants/styles/styles-media-queries';

import { ISheet } from '../../../models';
import { ISeasonWithSummary } from '../../../models/seasons';
import DivisionSelector from '../../components/division-selector';
import Sidebar from '../../components/sidebar';
import { areTheyTheSameDate } from '../../utils/time';
import { formatDate } from '../../utils/ui';
import DateSpacer from '../../components/date-spacer';

const sheet: ISheet = {
  divisionSelector: {
    padding: `${PADDING_XXL}px ${PADDING_XXXL}px`,

    [DESKTOP]: {
      backgroundColor: BLACK,
      flex: 0,
      padding: 0,
      width: 70,
    },
  },
  heading: {
    color: WHITE,
    fontSize: FONT_XXL,
    fontWeight: 700,
    padding: `${PADDING_XXL}px ${PADDING_XXXL}px`,

    [DESKTOP]: {
      flex: 1,
      fontSize: 56,
      lineHeight: '62px',
      padding: PADDING_XXXL,
    },
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
  rankings: {
    backgroundColor: WHITE,
    padding: PADDING_XXXL,
    paddingBottom: 0,

    [DESKTOP]: {
      flex: 1,
      paddingLeft: 0,
    },
  },
  rankingsWrapper: {
    [DESKTOP]: {
      display: 'flex',
      marginTop: 30,
      width: 388 + 70,
    },
  },
  wrapper: {
    [DESKTOP]: {
      display: 'flex',
      margin: '0 auto',
      maxWidth: PAGE_MAX_WIDTH,
    },
  },
};

interface IOwnProps {
  classes: { [key: string]: string };
  division: number;
  handleSelectDivision: (index: number) => void;
  handleToggleRecents: () => void;
  recents: boolean;
  season: ISeasonWithSummary;
}

const UnstyledSummaryView = ({
  classes,
  division,
  handleSelectDivision,
  handleToggleRecents,
  recents,
  season,
}: IOwnProps) => {
  return (
    <div className={classes.wrapper}>
      <h1 className={classes.heading}>Summary</h1>

      {season && season.recentMatches && (
        <Sidebar isRight title="Recently finished matches">
          <>
            {season.recentMatches.map((journey, index) => {
              const prevMatch = season.recentMatches[index - 1];
              const comparision = prevMatch ? new Date(prevMatch.date) : new Date();
              return (
                <>
                  <DateSpacer dates={[new Date(journey.date), comparision]} />
                  <Match journey={journey} />
                </>
              );
            })}
          </>
        </Sidebar>
      )}

      <div className={classes.rankingsWrapper}>
        <div className={classes.divisionSelector}>
          <DivisionSelector
            divisions={season.divisionRankings.map(d => ({
              id: `division-selector-${d.division}`,
              label: d.division,
              onClick: handleSelectDivision,
            }))}
            selected={division}
          />
        </div>

        <div className={classes.rankings}>
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
              {season.divisionRankings[division].ranking.map(entry => (
                <Tr key={`ranking-${entry.position}`}>
                  <Td className={classes.positionCells}>{entry.position}</Td>
                  <Td className={classes.playerCells}>{entry.player}</Td>
                  <Td className={classes.pointCells}>{entry.points}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

const SummaryView = injectSheet(sheet)(UnstyledSummaryView);

export default SummaryView;
