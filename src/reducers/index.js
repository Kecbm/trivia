import { combineReducers } from 'redux';
import player from './player';
import token from './tokenReducer';
import gameReducer from './gameReducer';
import ranking from './ranking';

const rootReducer = combineReducers({
  token,
  player,
  gameReducer,
  ranking,
});

export default rootReducer;
