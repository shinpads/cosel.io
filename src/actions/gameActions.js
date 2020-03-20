import axios from '../util/axios';
import socketio from '../util/socketio';

import {
  SET_GAME,
  SET_GAME_LOAD_ERROR,
  CLEAR_GAME,
  SET_DRAWING_MAP,
} from './actionTypes';
import history from '../history';

let socket;

export const createGame = () => async (dispatch) => {
  try {
    const res = await axios.post('/api/games');
    if (res.data.success) {
      dispatch({
        type: SET_GAME,
        payload: {
          game: res.data.game,
        },
      });
      history.push(`/game/${res.data.game.hash}`);
    } else {
      throw new Error();
    }
  } catch {
    dispatch({
      type: SET_GAME_LOAD_ERROR,
      payload: 'failed to create game',
    });
  }
};

export const findGame = (hash) => async (dispatch, getState) => {
  const { user } = getState();
  try {
    if (!user.loaded) {
      window.resolveUserPromise = new Promise(resolve => { window.resolveUser = resolve; });
      await window.resolveUserPromise;
    }
    const res = await axios.get(`api/games/${hash}`);
    console.log(res);
    if (res.data.success) {
      if (res.data.drawingMap) {
        await dispatch({
          type: SET_DRAWING_MAP,
          payload: res.data.drawingMap,
        });
      }
      await dispatch({
        type: SET_GAME,
        payload: {
          game: res.data.game,
        },
      });
    } else {
      throw new Error('Could not find game');
    }
    dispatch(joinGame());
  } catch (err) {
    console.error(err);
    dispatch({
      type: SET_GAME_LOAD_ERROR,
      payload: 'failed to load game',
    });
  }
};

export const joinGame = () => async (dispatch, getState) => {
  const { user } = getState();
  if (!user.loaded) {
    if (!window.resolveUserPromise) {
      window.resolveUserPromise = new Promise(resolve => { window.resolveUser = resolve; });
    }
    await window.resolveUserPromise;
  }
  const { game } = getState();
  if (game.showUsernameNotSet || !game.loaded || game.game.state === 'COMPLETE') return;
  const { hash } = game.game;
  if (socket) socket.disconnect();
  socket = socketio(hash);
  socket.on('update-game', (gameUpdate) => {
    dispatch({
      type: SET_GAME,
      payload: {
        game: gameUpdate,
      },
    });
  });
  socket.on('drawing-map', (drawingMap) => {
    dispatch({
      type: SET_DRAWING_MAP,
      payload: drawingMap,
    });
  });
};

export const startGame = () => async () => {
  if (socket) {
    socket.emit('start-game');
  }
};

export const submitStep = (step) => async () => {
  if (socket) {
    socket.emit('submit-step', step);
  }
};

export const disconnectSocket = () => (dispatch) => {
  if (socket) {
    socket.disconnect();
    socket = null;
    dispatch({
      type: CLEAR_GAME,
    });
  }
};
