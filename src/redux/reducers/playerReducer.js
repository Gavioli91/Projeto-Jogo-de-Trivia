import { USER_LOGGED } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

function playerReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER_LOGGED:
    return {
      ...state,
      name: action.infoUser.playerName,
      gravatarEmail: action.infoUser.email,
    };
  default:
    return state;
  }
}

export default playerReducer;
