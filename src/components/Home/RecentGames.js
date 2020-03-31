import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import Replay from '../Replay';
import history from '../../history';
import colors from '../../colors';

const styles = theme => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridAutoRows: '1fr',
    gridRowGap: '4rem',
    gridColumnGap: '2rem',
    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: '1fr 1fr 1fr 1fr',
    },
  },
  replay: {
    border: '1px solid',
    width: 'calc(100% - 2px) !important',
    overflow: 'hidden',
  },
  recentGame: {
    overflow: 'hidden',
  },
  recentGameTitle: {
    whiteSpace: 'nowrap',
    fontWeight: 600,
    fontSize: '1.5rem',
    textAlign: 'center',
    color: colors.primaryContrast,
  },
  recentGameDetails: {
    whiteSpace: 'nowrap',
  },
  canvas: {
    transform: 'scale(1.0)',
    transition: 'all 250ms ease',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
});

class RecentGames extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes, recentGames } = this.props;
    return (
      <div className={classes.root}>
        {recentGames.map(rg => <RecentGame classes={classes} game={rg} key={rg._id} />)}
      </div>
    );
  }
}


const RecentGame = ({
  game,
  classes,
}) => {
  const { thumbnail } = game;
  const timeAgo = moment(game.endTime ? game.endTime : game.createdAt).fromNow();
  const title = game.gameChains[0].originalWord;
  return (
    <div
      key={game._id}
      className={classes.recentGame}
    >
      <NavLink to={`/game/${game.hash}?view=true`} className={classes.recentGameTitle}>{title}</NavLink>
      <div
        onClick={() => history.push(`/game/${game.hash}?view=true`)}
        role="button"
        tabIndex={0}
        style={{ cursor: 'pointer' }}
      >
        {thumbnail
          ? <Replay drawData={thumbnail} fullWidth className={classes.replay} canvasClassName={classes.canvas} />
          : <div>No Preview</div>}
      </div>
      <div className={classes.recentGameDetails}>
        <div>{timeAgo}</div>
      </div>
    </div>
  );
};

RecentGames.propTypes = {
  classes: PropTypes.object,
  recentGames: PropTypes.array,
};

RecentGame.propTypes = {
  classes: PropTypes.object,
  game: PropTypes.object,
};

export default withStyles(styles)(RecentGames);
