import { SET_GAME } from '../actions/gameActions';

const initalState = {};

export default (state = initalState, action) => {
  switch (action.type) {
    case SET_GAME:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
