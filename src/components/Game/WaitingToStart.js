import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const WaitingToStart = ({
  game,
  users,
}) => (
  <div>
    <div>Waiting for host to start game</div>
    <div>{users.length} / {game.capacity} Players</div>
    <div>
      {users.map(user => <div>{user.username}</div>)}
    </div>
  </div>
);

WaitingToStart.propTypes = {
  game: PropTypes.object,
  users: PropTypes.array,
};

function mapStateToProps(state) {
  return {
    game: state.game.game,
    users: state.game.game.users,
  };
}

export default connect(mapStateToProps)(WaitingToStart);
