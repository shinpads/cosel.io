import { SET_GAME, SET_ERROR } from '../actions/actionTypes';

const initalState = {
  loaded: false,
  error: null,
  game: {},
};

export default (state = initalState, action) => {
  switch (action.type) {
    case SET_GAME:
      return {
        ...state,
        loaded: true,
        error: null,
        game: {
          ...state.game,
          ...action.game,
        },
      };
    case SET_ERROR:
      return {
        ...state,
        error: true,
        loaded: true,
      };
    default:
      return state;
  }
};
