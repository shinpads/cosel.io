import { SET_USER } from '../actions/actionTypes';

const initalState = {
  loaded: false,
  user: null,
};

export default (state = initalState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        loaded: true,
        user: {
          ...state.user,
          ...action.user,
        },
      };
    default:
      return state;
  }
};
