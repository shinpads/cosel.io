import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

const WaitingToStart = ({
  game,
  users,
  user,
}) => {
  const isHost = game.host === user._id;

  const startGame = () => {
  };

  return (
    <div>
      {!isHost && <div>Waiting for host to start game</div>}
      {isHost && <Button disableRipple variant="outlined" onClick={startGame}>Start Game</Button>}
      <div>{users.length} Players</div>
      <div>
        {users.map(u => <div>{u.username} {u._id === game.host ? '[Host]' : ''}</div>)}
      </div>
    </div>
  );
};

WaitingToStart.propTypes = {
  game: PropTypes.object,
  users: PropTypes.array,
  user: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    game: state.game.game,
    users: state.game.game.users,
    user: state.user.user,
  };
}

export default connect(mapStateToProps)(WaitingToStart);
