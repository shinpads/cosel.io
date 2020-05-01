import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { LinearProgress } from '@material-ui/core';
import colors from '../../colors';
import CopyLink from './CopyLink';
import { DotDotDot } from '../Base/Loader';

const styles = theme => ({
  info: {
    flexGrow: 1,
    display: 'flex',
    color: colors.backgroundsContrast,
    fontSize: '2rem',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: '2rem',
  },
  playerList: {
    flexGrow: 1,
    padding: '1rem',
    paddingBottom: '0rem',
    overflow: 'auto',
    width: '100%',
    maxWidth: '500px',
  },
  waitingForHost: {
    color: colors.backgroundContrast,
    fontSize: '1rem',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  playerContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  playerName: {
    fontSize: '2rem',
  },
  playerStatus: {
    flexGrow: 1,
    display: 'flex',
  },
  title: {
    color: 'black',
    fontSize: '1.5rem',
    fontStyle: 'italic',
    fontWeight: '400',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0.5rem',
      fontSize: '1rem',
    },
  },
  barRoot: {
    backgroundColor: '#d2d2d2',
  },
  bar: {
    backgroundColor: '#000',
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '1rem',
    marginBottom: '1rem',
  },
});
class WaitingForGame extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      users,
      classes,
      game,
    } = this.props;
    return (
      <DocumentTitle title="cosel.io - Waiting for game">
        <>
          <CopyLink url={window.location.href} displayUrl={window.location.host + window.location.pathname} />
          <div className={classes.titleContainer}>
            <div className={classes.title}>Waiting for previous round to finish</div>
            <DotDotDot />
          </div>
          <LinearProgress
            variant="determinate"
            value={(game.round / (game.rounds + 1)) * 100}
            classes={{
              determinate: classes.barRoot,
              bar1Determinate: classes.bar,
            }}
          />
          <div className={classes.info}>
            <div>Players in game</div>
            <div className={classes.playerList}>
              {users.map(u => (
                <div className={classes.playerContainer}>
                  <div className={classes.playerName}>{u.username}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      </DocumentTitle>
    );
  }
}

WaitingForGame.propTypes = {
  users: PropTypes.array,
  classes: PropTypes.object,
  game: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    game: state.game.game,
    users: state.game.game.users,
    playersWaiting: state.game.playersWaiting,
    user: state.user.user,
    userReadyMap: state.game.userReadyMap,
  };
}

export default withStyles(styles)(connect(mapStateToProps)(WaitingForGame));
