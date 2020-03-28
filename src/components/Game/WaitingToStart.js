import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { PrimaryButton } from '../Base/Button';
import { startGame } from '../../actions/gameActions';
import colors from '../../colors';
import CopyLink from './CopyLink';

const styles = {
  info: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    color: colors.backgroundContrast,
    fontSize: '2rem',
  },
  playerList: {
    overflow: 'auto',
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

  render() {
    const {
      game,
      users,
      user,
      classes,
    } = this.props;

    const isHost = game.host === user._id;

    return (
      <>
        <CopyLink url={window.location.href} displayUrl={window.location.host + window.location.pathname} />
        {!isHost && <div className={classes.waitingForHost}>Waiting for host to start game</div>}
        <div className={classes.info}>
          <div className={classes.playerList}>
            {users.map(u => <div>{u.username} {u._id === game.host ? '[Host]' : ''}</div>)}
          </div>
        </div>
        <div className={classes.buttonContainer}>
          {isHost && <PrimaryButton onClick={this.sendStartGame}>Start Game</PrimaryButton>}
        </div>
      </>
    );
  }
}

WaitingToStart.propTypes = {
  game: PropTypes.object,
  users: PropTypes.array,
  user: PropTypes.object,
  dispatch: PropTypes.func,
  classes: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    game: state.game.game,
    users: state.game.game.users,
    user: state.user.user,
  };
}

export default withStyles(styles)(connect(mapStateToProps)(WaitingToStart));
