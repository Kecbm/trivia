import { SAVE_PLAYER, SET_ASSERTIONS, SET_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0, // número de acertos
  score: 0, // pontuação
  gravatarEmail: '',
  picture: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_PLAYER:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.gravatarEmail,
      picture: action.payload.picture,
    };
  case SET_SCORE:
    return {
      ...state,
      score: action.payload,
    };
  case SET_ASSERTIONS:
    return {
      ...state,
      assertions: action.payload,
    };
  default:
    return state;
  }
};

export default player;
