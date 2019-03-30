import * as React from 'react';
import injectSheet from 'react-jss';

import { ISheet } from '../../../models';
import { ISeasonWithSummary } from '../../../models/seasons';

const sheet: ISheet = {
  wrapper: {},
};

interface IOwnProps {
  classes: { [key: string]: string };
  season: ISeasonWithSummary;
}

const UnstyledSummaryView = ({ classes, season }: IOwnProps) => {
  return (
    <div className={classes.wrapper}>
      <h1>{season.label}</h1>
      <h2>Recent matches</h2>
      <ul>
        {season.recentMatches.map(match => {
          const date = new Date(match.date);
          return (
            <li>
              date: {`${date.getDate()}/${date.getMonth()} ${date.getHours()}:${date.getMinutes()}`}, matches:{' '}
              {match.matches.length}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const SummaryView = injectSheet(sheet)(UnstyledSummaryView);

export default SummaryView;
