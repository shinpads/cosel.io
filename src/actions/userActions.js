import axios from '../util/axios';

import { SET_USER } from './actionTypes';

export const getUser = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/users/from-session');
    if (res.data && res.data.success) {
      dispatch({
        type: SET_USER,
        user: res.data.user,
      });
    } else {
      throw new Error();
    }
  } catch (err) {
    // gotta do something
  }
};

export default {
  getUser,
};
