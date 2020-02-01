import { combineReducers } from 'redux';
import testReducer from './testReducer';
import gameReducer from './gameReducer';

export default combineReducers({
  test: testReducer,
  game: gameReducer,
});
