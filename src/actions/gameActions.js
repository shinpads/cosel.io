import axios from '../util/axios';

export const SET_GAME = 'SET_GAME';

export const createGame = () => async (dispatch) => {
  const res = await axios.post('/api/games');
  if (res && res.data.success) {
    dispatch(res.data.game);
  } else {
    // do something
  }
};

export const findGame = () => async () => {
  const res = await axios.get('/api/games/5e35c6dc15d94b670202ebb4');
  console.log('findGame done', res);
};
