import * as React from 'react';
import injectSheet from 'react-jss';

import DateSpacer from '../../components/date-spacer';
import Match from '../../components/match';
import Sidebar from '../../components/sidebar';
import { SIDEBAR_TOGGLER_WIDTH } from '../../components/sidebar/sidebar-view';
import Table, { Tbody, Td, Thead, Tr } from '../../components/table';

import { PADDING_XXL, PADDING_XXXL, PAGE_MAX_WIDTH } from '../../../constants/styles/styles';
import { BLACK, GREY_DARK_3, WHITE } from '../../../constants/styles/styles-colors';
import { FONT_XXL, TEXT_BLACK, TEXT_GREY } from '../../../constants/styles/styles-fonts';
import { DESKTOP } from '../../../constants/styles/styles-media-queries';

import { ISheet } from '../../../models';
import { IDivision, IDivisionWithData } from '../../../models/divisions';

const sheet: ISheet = {
  divisionSelector: {
    backgroundColor: GREY_DARK_3,
    padding: `${PADDING_XXL}px ${PADDING_XXXL}px`,
    position: 'sticky',
    top: -1,

    [DESKTOP]: {
      backgroundColor: BLACK,
      flex: 0,
      padding: 0,
      position: 'initial',
      top: 'initial',
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
  smallWrapper: {
    [DESKTOP]: {
      width: `calc(100% - ${SIDEBAR_TOGGLER_WIDTH}px)`,
    },
  },
  wrapper: {
    [DESKTOP]: {
      display: 'flex',
      margin: '0 auto',
      maxWidth: PAGE_MAX_WIDTH,

      'div:has(div > div > &)': {
        backgroundColor: 'pink',
        width: `calc(100% - ${SIDEBAR_TOGGLER_WIDTH}px)`,
      },
    },
  },
};

interface IOwnProps {
  classes: { [key: string]: string };
  division: IDivision | IDivisionWithData;
}

const UnstyledDivisionView = ({ classes, division }: IOwnProps) => {
  const applyClassesToParentEffect = () => {
    const mountPoint = document.getElementById('app');
    if (mountPoint) {
      if ('recentMatches' in division) {
        mountPoint.classList.add(classes.smallWrapper);
      } else {
        mountPoint.classList.remove(classes.smallWrapper);
      }
    }
  };

  React.useEffect(applyClassesToParentEffect, [division]);

  return (
    <div className={classes.wrapper}>
      <h1 className={classes.heading}>{division.label}</h1>

      {'playedMatches' in division && (
        <Sidebar isRight title="Recently finished matches">
          <>
            {division.playedMatches.map((journey, index) => {
              const prevMatch = division.playedMatches[index - 1];
              const comparision = prevMatch ? new Date(prevMatch.date) : new Date();
              return (
                <React.Fragment key={`recent-match-${journey.date}`}>
                  <DateSpacer dates={[new Date(journey.date), comparision]} />
                  <Match journey={{ ...journey, division: division.label }} isLive={index === 0} />
                </React.Fragment>
              );
            })}
          </>
        </Sidebar>
      )}

      {'ranking' in division && (
        <div className={classes.rankingsWrapper}>
          <div className={classes.rankings}>
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
                {division.ranking.map(entry => (
                  <Tr key={`ranking-${entry.position}`}>
                    <Td className={classes.positionCells}>{entry.position}</Td>
                    <Td className={classes.playerCells}>{entry.label}</Td>
                    <Td className={classes.matchesCells}>{entry.matches}</Td>
                    <Td className={classes.rivalsCells}>{entry.rivals}</Td>
                    <Td className={classes.pointCells}>{entry.points}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
};

const DivisionView = injectSheet(sheet)(UnstyledDivisionView);

export default DivisionView;
