import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';
import { formatDate } from '../../utils/time';
import { getDivisionLevel } from '../../utils/ui';

import { PADDING_L, PADDING_M, PADDING_XL, PADDING_XXL } from '../../../constants/styles/styles';
import { BLACK, GREEN, GREY_LIGHT, traslucentColor } from '../../../constants/styles/styles-colors';
import { FONT_L, FONT_XS, TEXT_WHITE } from '../../../constants/styles/styles-fonts';

import { ISheet } from '../../../models';
import { IRecentMatches } from '../../../models/matches';

const sheet: ISheet = {
  card: {
    ':hover > &': {
      filter: 'blur(6px)',
    },
  },
  content: {
    padding: PADDING_XXL,
    paddingTop: 0,
  },
  date: {
    display: 'block',
    fontSize: FONT_XS,
    fontWeight: 300,
    textAlign: 'center',
  },
  division: {
    fontSize: 32,
    verticalAlign: 'middle',
  },
  extraInfo: {
    alignContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  extraLabel: {
    display: 'block',
    fontSize: FONT_L,
    fontWeight: 700,
    textAlign: 'center',
  },
  footer: {
    alignContent: 'center',
    backgroundColor: GREEN,
    color: TEXT_WHITE,
    display: 'flex',
    fontSize: FONT_L,
    fontWeight: 700,
    height: 42,
    justifyContent: 'center',
    letterSpacing: 4.5,
    lineHeight: '42px',
    textTransform: 'uppercase',
  },
  header: {
    alignContent: 'middle',
    display: 'flex',
    height: 42,
    marginBottom: PADDING_M,
    padding: PADDING_XXL,
    paddingBottom: 0,
    width: '100%',
  },
  name: {
    flex: 1,
    fontWeight: 300,
    textAlign: 'left',
  },
  overlay: {
    alignContent: 'center',
    backgroundColor: traslucentColor(BLACK, 0.75),
    borderRadius: 4,
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    left: 0,
    opacity: 0,
    position: 'absolute',
    top: 0,
    transition: 'opacity 0.2s',
    width: '100%',

    ':hover > &': {
      opacity: 1,
    },
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
    border: `2px solid ${traslucentColor(GREY_LIGHT, 0.2)}`,
    borderRadius: 4,
    marginBottom: PADDING_L,
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
  },
  wrapperLive: {
    borderColor: GREEN,
  },
};

interface IOwnProps {
  classes: { [key: string]: string };
  isLive?: boolean;
  journey: IRecentMatches;
}

const UnstyledCard = ({ classes, isLive, journey }: IOwnProps) => {
  const dateTime = new Date(journey.date);

  const time = formatDate(dateTime, true, 'HH:mm');
  const date = formatDate(dateTime, true, 'DD/MM');

  return (
    <div className={classnames(classes.wrapper, { [classes.wrapperLive]: isLive })}>
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
        {isLive && (
          <div className={classes.footer}>
            <span>Live</span>
          </div>
        )}
      </div>
      <div className={classes.overlay}>
        <div className={classes.extraInfo}>
          <p className={classes.extraLabel}>Ver más detalles</p>
          <p className={classes.date}>
            {date} &ndash; {time}
          </p>
        </div>
      </div>
    </div>
  );
};

const Card = injectSheet(sheet)(UnstyledCard);

export default Card;
