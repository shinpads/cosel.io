import io from 'socket.io-client';
import { SET_GAME } from './actions/actionTypes';

let socket;

export default function clientSocket(hash, dispatch) {
  socket = io(`${WARHOL_HOST}:${WARHOL_PORT}`, {
    query: {
      hash,
      sessionId: window.localStorage.getItem('sessionId'),
    },
  });

  socket.on('update-game', updateGame(dispatch));
}

const updateGame = (dispatch) => (game) => {
  dispatch({
    type: SET_GAME,
    game,
  });
};
