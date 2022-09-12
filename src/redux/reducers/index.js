import { combineReducers } from 'redux';
import playerReducer from './playerReducer';
import questionReducer from './questionReducer';

const rootReducer = combineReducers({
  playerReducer,
  questionReducer,
});

export default rootReducer;
