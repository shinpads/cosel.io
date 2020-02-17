import axios from '../util/axios';
import socketio from '../util/socketio';

import { SET_GAME, SET_GAME_LOAD_ERROR } from './actionTypes';

let socket;

export const createGame = () => async (dispatch) => {
  try {
    const res = await axios.post('/api/games');
    if (res.data.success) {
      dispatch({
        type: SET_GAME,
        payload: {
          game: res.data.game,
        }
      });
    } else {
      throw new Error();
    }
  } catch {
    dispatch({
      type: SET_GAME_LOAD_ERROR,
      message: 'failed to create game',
    });
  }
};

export const findGame = (hash) => async (dispatch) => {
  try {
    const res = await axios.get(`api/games/${hash}`);
    console.log(res);
    if (res.data.success) {
      await dispatch({
        type: SET_GAME,
        payload: {
          game: res.data.game,
        }
      });

      socket = socketio(res.data.game.hash);
      socket.on('update-game', (game) => {
        dispatch({
          type: SET_GAME,
          payload: {
            game,
          }
        })
      });
    } else {
      throw new Error();
    }
  } catch {
    dispatch({
      type: SET_GAME_LOAD_ERROR,
      message: 'failed to load game',
    });
  }
};

export const startGame = () => async () => {
  if (socket) {
    socket.emit('start-game');
  }
};
