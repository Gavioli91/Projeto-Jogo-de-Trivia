import { USER_LOGGED } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: '',
  gravatarEmail: '',
};

function playerReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER_LOGGED:
    return {
      ...state,
      ...action.payload,
    };
  default:
    return state;
  }
}

export default playerReducer;
