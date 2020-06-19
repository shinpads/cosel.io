import { combineReducers } from 'redux';
import gameReducer from './gameReducer';
import userReducer from './userReducer';
import adsReducer from './adsReducer';

export default combineReducers({
  game: gameReducer,
  user: userReducer,
  ads: adsReducer,
});
