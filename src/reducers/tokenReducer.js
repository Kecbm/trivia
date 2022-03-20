import { SAVE_USER_TOKEN } from '../actions';

const INITIAL_STATE = '';

const tokenReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_USER_TOKEN:
    return action.payload.token;
  default:
    return state;
  }
};

export default tokenReducer;
