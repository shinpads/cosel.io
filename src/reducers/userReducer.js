import { SET_USER } from '../actions/actionTypes';

const initalState = {
  loaded: false,
  user: {},
};

export default (state = initalState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        loaded: true,
        user: {
          ...state.user,
          ...action.payload.user,
        },
      };
    default:
      return state;
  }
};
