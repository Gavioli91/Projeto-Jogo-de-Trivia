import { USER_LOGGED, REFRESH_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER_LOGGED:
    return {
      ...state,
      name: action.infoUser.playerName,
      gravatarEmail: action.infoUser.email,
    };
  case REFRESH_SCORE:
    return {
      ...state,
      score: action.score,
      assertions: action.assertions,
    };
  default:
    return state;
  }
}

export default player;
