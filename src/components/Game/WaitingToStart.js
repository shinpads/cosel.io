import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { PrimaryButton } from '../Base/Button';
import { startGame } from '../../actions/gameActions';
import colors from '../../colors';

const styles = {
  info: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    color: 'white',
    fontSize: '2rem',
  },
  playerList: {
    overflow: 'auto',
  },
  hash: {
    color: colors.backgroundContrast,
    fontSize: '2rem',
    textAlign: 'center',
    paddingBottom: '0.5rem',
  },
  waitingForHost: {
    color: colors.backgroundContrast,
    fontSize: '1rem',
    textAlign: 'center',
    fontStyle: 'italic',
  },
};
const WaitingToStart = withStyles(styles)(({
  game,
  users,
  user,
  dispatch,
  classes,
}) => {
  console.log(game, users, user);
  const isHost = game.host === user._id;

  const sendStartGame = () => {
    dispatch(startGame());
  };

  return (
    <>
      <div className={classes.hash}>
        {game.hash}
      </div>
      {!isHost && <div className={classes.waitingForHost}>Waiting for host to start game</div>}
      <div className={classes.info}>
        <div className={classes.playerList}>
          {users.map(u => <div>{u.username} {u._id === game.host ? '[Host]' : ''}</div>)}
        </div>
      </div>
      <div>
        {isHost && <PrimaryButton style={{ backgroundColor: 'white', color: colors.primary }} onClick={sendStartGame}>Start Game</PrimaryButton>}
      </div>
    </>
  );
});

WaitingToStart.propTypes = {
  game: PropTypes.object,
  users: PropTypes.array,
  user: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    game: state.game.game,
    users: state.game.game.users,
    user: state.user.user,
  };
}

export default connect(mapStateToProps)(WaitingToStart);
