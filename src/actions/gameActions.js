import axios from '../util/axios';
import socketio from '../util/socketio';

import {
  SET_GAME,
  SET_GAME_LOAD_ERROR,
  CLEAR_GAME,
  SET_DRAWING_MAP,
  SET_USER_SUBMITTED_MAP,
  SET_RECENT_GAMES,
  SET_USER_READY_MAP,
  SET_RECENT_GAMES_LOADED,
} from './actionTypes';
import history from '../history';

let socket;

export const createGame = () => async (dispatch, getState) => {
  try {
    const { user } = getState();
    if (!user.loaded) {
      if (!window.resolveUserPromise) {
        window.resolveUserPromise = new Promise(resolve => { window.resolveUser = resolve; });
      }
      await window.resolveUserPromise;
    }
    const res = await axios.post('/api/games');
    if (res.data.success) {
      dispatch({
        type: SET_GAME,
        payload: {
          game: res.data.game,
          userReadyMap: {},
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
  await dispatch({ type: CLEAR_GAME, payload: '' });
  try {
    const { user } = getState();
    if (!user.loaded) {
      if (!window.resolveUserPromise) {
        window.resolveUserPromise = new Promise(resolve => { window.resolveUser = resolve; });
      }
      await window.resolveUserPromise;
    }
    const res = await axios.get(`api/games/${hash}`);
    if (res.data.success) {
      if (res.data.drawingMap) {
        await dispatch({
          type: SET_DRAWING_MAP,
          payload: res.data.drawingMap,
        });
      }
      if (res.data.userSubmittedMap) {
        await dispatch({
          type: SET_USER_SUBMITTED_MAP,
          payload: res.data.userSubmittedMap,
        });
      }
      await dispatch({
        type: SET_USER_READY_MAP,
        payload: res.data.userReadyMap || {},
      });
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

export const getGames = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SET_RECENT_GAMES_LOADED,
      payload: false,
    });
    const { user } = getState();
    if (!user.loaded) {
      if (!window.resolveUserPromise) {
        window.resolveUserPromise = new Promise(resolve => { window.resolveUser = resolve; });
      }
      await window.resolveUserPromise;
    }
    const res = await axios.get('/api/games');
    if (res.data && res.data.success && res.data.games) {
      const { games } = res.data;
      dispatch({
        type: SET_RECENT_GAMES,
        payload: games,
      });
    } else {
      throw Error('Failed to load recent games', res);
    }
  } catch (err) {
    console.error(err);
    dispatch({
      type: SET_RECENT_GAMES,
      payload: [],
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
  if (socket && socket.query.hash !== hash) {
    socket.disconnect();
    socket = socketio(hash);
  } else if (!socket) {
    socket = socketio(hash);
  }
  socket.on('update-game', (gameUpdate) => {
    if (gameUpdate._id && gameUpdate._id !== getState().game.game._id) return;
    if (gameUpdate.state && gameUpdate.state === 'COMPLETE') {
      if (gameUpdate.nextGame && gameUpdate.nextGame.hash) {
        socket.disconnect();
        socket = socketio(gameUpdate.nextGame.hash);
      }
    }
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

  socket.on('user-submitted-map', (userSubmittedMap) => {
    dispatch({
      type: SET_USER_SUBMITTED_MAP,
      payload: userSubmittedMap,
    });
  });

  socket.on('user-ready-map', (userReadyMap) => {
    dispatch({
      type: SET_USER_READY_MAP,
      payload: userReadyMap,
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

export const sendReady = (ready) => async () => {
  if (socket) {
    socket.emit('ready', ready);
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

export const sendUpdateUsersRequest = () => async () => {
  if (socket) {
    socket.emit('update-users');
  }
};
