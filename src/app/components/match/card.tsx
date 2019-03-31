// import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';
import { formatDate, getDivisionLevel } from '../../utils/ui';

import { PADDING_L, PADDING_M, PADDING_XL, PADDING_XXL } from '../../../constants/styles/styles';
import { GREY_LIGHT, traslucentColor } from '../../../constants/styles/styles-colors';
import { FONT_L, TEXT_WHITE } from '../../../constants/styles/styles-fonts';

import { ISheet } from '../../../models';
import { IJourney } from '../../../models/matches';

const sheet: ISheet = {
  card: {},
  content: {},
  date: {},
  division: {
    fontSize: 32,
    verticalAlign: 'middle',
    // width: 42,
  },
  extraInfo: {},
  extraLable: {},
  footer: {},
  header: {
    alignContent: 'middle',
    display: 'flex',
    height: 42,
    marginBottom: PADDING_M,
    width: '100%',
  },
  name: {
    flex: 1,
    fontWeight: 300,
    textAlign: 'left',
  },
  overlay: {
    display: 'none',
  },
  player: {
    display: 'flex',
    marginTop: PADDING_XL,
    width: '100%',
  },
  players: {
    color: TEXT_WHITE,
    fontFamily: 'Roboto',
    fontSize: FONT_L,
  },
  time: {
    flex: 1,
    textAlign: 'right',
    verticalAlign: 'middle',
  },
  wins: {
    fontWeight: 700,
    textAlign: 'right',
  },
  wrapper: {
    border: '2px solid transparent',
    borderColor: traslucentColor(GREY_LIGHT, 0.2),
    borderRadius: 4,
    marginBottom: PADDING_L,
    padding: PADDING_XXL,
    width: '100%',
  },
};

interface IOwnProps {
  classes: { [key: string]: string };
  journey: IJourney;
}

const UnstyledCard = ({ classes, journey }: IOwnProps) => {
  const dateTime = new Date(journey.date);

  const time = formatDate(dateTime, true, 'HH:mm');
  const date = formatDate(dateTime, true, 'DD/MM');

  return (
    <div className={classes.wrapper}>
      <div className={classes.card}>
        <div className={classes.header}>
          <div className={classes.division}>{getDivisionLevel(journey.division)}</div>
          <div className={classes.time}>{time}</div>
        </div>
        <div className={classes.content}>
          <ul className={classes.players}>
            {journey.players.map(player => (
              <li key={`player-${player.name}`} className={classes.player}>
                <span className={classes.name}>{player.name}</span>
                <span className={classes.wins}>{player.wins}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={classes.footer} />
      </div>
      <div className={classes.overlay}>
        <div className={classes.extraInfo}>
          <p className={classes.extraLabel}>More info</p>
          <p className={classes.date}>{date}</p>
        </div>
      </div>
    </div>
  );
};

const Card = injectSheet(sheet)(UnstyledCard);

export default Card;
