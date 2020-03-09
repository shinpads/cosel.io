import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { PrimaryButton } from '../Base/Button';
import { startGame } from '../../actions/gameActions';

const styles = {
  info: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
};
const WaitingToStart = withStyles(styles)(({
  game,
  users,
  user,
  dispatch,
  classes,
}) => {
  const isHost = game.host === user._id;

  const sendStartGame = () => {
    dispatch(startGame());
  };

  return (
    <>
      {!isHost && <div>Waiting for host to start game</div>}
      <div className={classes.info}>
        <div>{users.length} Players</div>
        {users.map(u => <div>{u.username} {u._id === game.host ? '[Host]' : ''}</div>)}
      </div>
      <div>
        {isHost && <PrimaryButton variant="contained" onClick={sendStartGame}>Start Game</PrimaryButton>}
      </div>
      <div>
        {isHost && <PrimaryButton variant="contained" onClick={sendStartGame}>{game.hash}</PrimaryButton>}
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
