import { getUserToken } from '../services/fetchApi';

export const SAVE_PLAYER = 'SAVE_PLAYER';
export const SAVE_USER_TOKEN = 'SAVE_USER_TOKEN';
export const QUESTIONS_REQUEST = 'QUESTIONS_REQUEST';
export const SET_SCORE = 'SET_SCORE';
export const SET_ASSERTIONS = 'SET_ASSERTIONS';
export const SET_RANKING = 'SET_RANKING';

export const savePlayer = (payload) => ({ type: SAVE_PLAYER, payload });

export const getTokenApi = (userToken) => ({
  type: SAVE_USER_TOKEN,
  payload: userToken,
});

export const getUserTokenThunk = () => (dispatch) => {
  getUserToken()
    .then((responseAPI) => {
      const userToken = responseAPI.token;
      dispatch({
        type: SAVE_USER_TOKEN,
        payload: {
          token: userToken,
        },
      });
    });
};

export const questionsRequest = (payload) => ({ type: QUESTIONS_REQUEST, payload });

export const setScore = (payload) => ({ type: SET_SCORE, payload });

export const setAssertions = (payload) => ({ type: SET_ASSERTIONS, payload });

export const setRanking = (payload) => ({ type: SET_RANKING, payload });
