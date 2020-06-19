import { SET_VIDEO_AD_SHOWING, SET_IS_FIRST_PAGE } from '../actions/actionTypes';

const initalState = {
  videoAdShowing: false,
  isFirstPage: true,
};

export default (state = initalState, action) => {
  switch (action.type) {
    case SET_VIDEO_AD_SHOWING:
      return {
        ...state,
        videoAdShowing: action.payload,
      };
    case SET_IS_FIRST_PAGE:
      return {
        ...state,
        isFirstPage: action.payload,
      };
    default:
      return state;
  }
};
