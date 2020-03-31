import { isValid } from '../util/helperFunctions';
import {
  SET_GAME,
  SET_GAME_LOAD_ERROR,
  SET_USERNAME_NOT_SET,
  CLEAR_GAME,
  SET_DRAWING_MAP,
  SET_USER_SUBMITTED_MAP,
  SET_RECENT_GAMES,
  SET_USER_READY_MAP,
} from '../actions/actionTypes';

const initalState = {
  loaded: false,
  error: null,
  game: {},
  startGameLoading: false,
  showUsernameNotSet: false,
  drawingMap: {},
  userSubmittedMap: {},
  recentGames: [],
  recentGamesLoaded: false,
  userReadyMap: {},
};

export default (state = initalState, action) => {
  if (!isValid(action.payload)) return state;
  switch (action.type) {
    case SET_GAME:
      return {
        ...state,
        loaded: true,
        error: null,
        game: {
          ...state.game,
          ...action.payload.game,
        },
      };
    case SET_GAME_LOAD_ERROR:
      return {
        ...state,
        error: true,
        loaded: true,
      };
    case SET_USERNAME_NOT_SET:
      return {
        ...state,
        showUsernameNotSet: action.payload,
      };
    case CLEAR_GAME:
      return {
        ...state,
        game: {},
        loaded: false,
        error: false,
        userReadyMap: {},
      };
    case SET_DRAWING_MAP:
      return {
        ...state,
        drawingMap: action.payload,
      };
    case SET_USER_SUBMITTED_MAP:
      return {
        ...state,
        userSubmittedMap: action.payload,
      };
    case SET_RECENT_GAMES:
      return {
        ...state,
        recentGames: action.payload,
        recentGamesLoaded: true,
      };
    case SET_USER_READY_MAP:
      return {
        ...state,
        userReadyMap: action.payload,
      };
    default:
      return state;
  }
};
