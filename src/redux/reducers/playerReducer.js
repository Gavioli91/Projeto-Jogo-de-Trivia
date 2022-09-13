import { USER_LOGGED, REFRESH_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
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
    };
  default:
    return state;
  }
}

export default player;
