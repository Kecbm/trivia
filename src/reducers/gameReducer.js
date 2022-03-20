import { QUESTIONS_REQUEST } from '../actions';

const INITIAL_STATE = {
  questions: '',
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case QUESTIONS_REQUEST:
    return {
      ...state,
      questions: action.payload,
    };
  default:
    return state;
  }
};

export default gameReducer;
