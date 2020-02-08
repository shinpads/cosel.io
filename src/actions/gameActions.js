import axios from '../util/axios';
import clientSocket from '../clientSocket';

import { SET_GAME, SET_ERROR } from './actionTypes';

export const createGame = () => async (dispatch) => {
  try {
    const res = await axios.post('/api/games');
    if (res.data.success) {
      dispatch({
        type: SET_GAME,
        game: res.data.game,
      });
    } else {
      throw new Error();
    }
  } catch {
    dispatch({
      type: SET_ERROR,
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
        game: res.data.game,
      });

      clientSocket(res.data.game.hash, dispatch);
    } else {
      throw new Error();
    }
  } catch {
    dispatch({
      type: SET_ERROR,
      message: 'failed to load game',
    });
  }
};
