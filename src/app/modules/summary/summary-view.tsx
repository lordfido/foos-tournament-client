import * as React from 'react';
import injectSheet from 'react-jss';

import DateSpacer from '../../components/date-spacer';
import Match from '../../components/match';
import { SIDEBAR_TOGGLER_WIDTH } from '../../components/sidebar/sidebar-view';

import { PADDING_XXL, PADDING_XXXL, PAGE_MAX_WIDTH } from '../../../constants/styles/styles';
import { BLACK, GREY_DARK_3, WHITE } from '../../../constants/styles/styles-colors';
import { FONT_XXL } from '../../../constants/styles/styles-fonts';
import { DESKTOP } from '../../../constants/styles/styles-media-queries';

import { ISheet } from '../../../models';
import { ISeasonWithSummary } from '../../../models/seasons';
import DivisionSelector from '../../components/division-selector';
import Sidebar from '../../components/sidebar';
import SummaryRanking from './summary-ranking';

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
  division: number;
  handleSelectDivision: (index: number) => void;
  season: ISeasonWithSummary;
}

const UnstyledSummaryView = ({ classes, division, handleSelectDivision, season }: IOwnProps) => {
  const applyClassesToParentEffect = () => {
    const mountPoint = document.getElementById('app');
    if (mountPoint) {
      if (!season || !season.recentMatches || !season.recentMatches.length) {
        mountPoint.classList.remove(classes.smallWrapper);
      } else {
        mountPoint.classList.add(classes.smallWrapper);
      }
    }
  };

  React.useEffect(applyClassesToParentEffect, [season]);

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
                <React.Fragment key={`recent-match-${journey.date}`}>
                  <DateSpacer dates={[new Date(journey.date), comparision]} />
                  <Match journey={journey} isLive={index === 0} />
                </React.Fragment>
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
          <SummaryRanking ranking={season.divisionRankings[division].ranking} />
        </div>
      </div>
    </div>
  );
};

const SummaryView = injectSheet(sheet)(UnstyledSummaryView);

export default SummaryView;
