import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const WaitingToStart = ({
  game,
}) => (
  <div>
    <div>Waiting for host to start game</div>
    <div>{game.users.length} / {game.capacity} Players</div>
  </div>
);

WaitingToStart.propTypes = {
  game: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    game: state.game.game,
  };
}

export default connect(mapStateToProps)(WaitingToStart);
