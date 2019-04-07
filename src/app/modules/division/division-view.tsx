import * as React from 'react';
import injectSheet from 'react-jss';

import DateSpacer from '../../components/date-spacer';
import Match from '../../components/match';
import Sidebar from '../../components/sidebar';
import { SIDEBAR_TOGGLER_WIDTH } from '../../components/sidebar/sidebar-view';

import { PADDING_XXL, PADDING_XXXL, PAGE_MAX_WIDTH } from '../../../constants/styles/styles';
import { WHITE } from '../../../constants/styles/styles-colors';
import { FONT_XXL } from '../../../constants/styles/styles-fonts';
import { DESKTOP } from '../../../constants/styles/styles-media-queries';

import { ISheet } from '../../../models';
import { IDivision, IDivisionWithData } from '../../../models/divisions';
import DivisionRanking from './division-ranking';

const sheet: ISheet = {
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
  rankings: {
    backgroundColor: WHITE,
    padding: PADDING_XXXL,

    [DESKTOP]: {
      flex: 1,
      paddingLeft: 0,
    },
  },
  rankingsWrapper: {
    [DESKTOP]: {
      display: 'flex',
      marginTop: 30,
      minHeight: `calc(100vh - ${30 + 91}px)`,
      width: 684,
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
      if ('playedMatches' in division) {
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
            <DivisionRanking ranking={division.ranking} />
          </div>
        </div>
      )}
    </div>
  );
};

const DivisionView = injectSheet(sheet)(UnstyledDivisionView);

export default DivisionView;
