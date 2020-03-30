import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Done } from '@material-ui/icons';
import { PrimaryButton } from '../Base/Button';
import { startGame, sendReady } from '../../actions/gameActions';
import colors from '../../colors';
import CopyLink from './CopyLink';

const styles = {
  info: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    color: colors.backgroundContrast,
    fontSize: '2rem',
  },
  playerList: {
    flexGrow: 1,
    padding: '1rem',
    paddingBottom: '0rem',
    overflow: 'auto',
    width: '100%',
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
    justifyContent: 'flex-end',
    width: '100%',
  },
  playerName: {
    fontSize: '2rem',
  },
  playerStatus: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
};
class WaitingToStart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  sendStartGame = () => {
    const { dispatch } = this.props;
    dispatch(startGame());
  };

  ready = (ready) => {
    const { dispatch } = this.props;
    dispatch(sendReady(ready));
  }

  render() {
    const {
      users,
      user,
      classes,
      userReadyMap,
    } = this.props;
    const isReady = !!userReadyMap[user._id];
    return (
      <>
        <CopyLink url={window.location.href} displayUrl={window.location.host + window.location.pathname} />
        <div className={classes.info}>
          <div className={classes.playerList}>
            {users.map(u => (
              <div className={classes.playerContainer}>
                <div className={classes.playerName}>{u.username}</div>
                <div className={classes.playerStatus}>{userReadyMap[u._id] ? <Done /> : ''}</div>
              </div>
            ))}
          </div>
        </div>
        <div className={classes.buttonContainer}>
          {isReady
            ? <PrimaryButton onClick={() => this.ready(false)}>Not Ready</PrimaryButton>
            : <PrimaryButton onClick={() => this.ready(true)}>Ready</PrimaryButton>}
        </div>
      </>
    );
  }
}

WaitingToStart.propTypes = {
  users: PropTypes.array,
  user: PropTypes.object,
  dispatch: PropTypes.func,
  classes: PropTypes.object,
  userReadyMap: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    game: state.game.game,
    users: state.game.game.users,
    user: state.user.user,
    userReadyMap: state.game.userReadyMap,
  };
}

export default withStyles(styles)(connect(mapStateToProps)(WaitingToStart));
