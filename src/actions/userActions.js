import axios from '../util/axios';

import { SET_USER, SET_USERNAME_NOT_SET } from './actionTypes';
import { joinGame } from './gameActions';

export const getUser = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/users/from-session');
    if (res.data && res.data.success) {
      dispatch({
        type: SET_USER,
        payload: {
          user: res.data.user,
        },
      });
      dispatch({
        type: SET_USERNAME_NOT_SET,
        payload: !res.data.user.username,
      });
      if (window.resolveUser) window.resolveUser();
    } else {
      throw new Error('Failed to get user');
    }
  } catch (err) {
    console.error(err);
  }
};

export const setUsername = (username) => async (dispatch, getState) => {
  try {
    const { _id } = getState().user.user;
    if (!_id) throw new Error('User not loaded');
    const res = await axios.post(`/api/users/${_id}`, { username });
    if (!res.data || !res.data.success) throw new Error('Failed to update username');
    dispatch({
      type: SET_USER,
      payload: {
        user: res.data.user,
      },
    });
    await dispatch({
      type: SET_USERNAME_NOT_SET,
      payload: !res.data.user.username,
    });
    dispatch(joinGame());
  } catch (err) {
    console.error(err);
  }
};

export default {
  getUser,
};
