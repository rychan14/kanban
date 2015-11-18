import {combineReducers} from 'redux';
import issues from './issues';
import repo from './repos';

const rootReducer = combineReducers({
  issues,
  repo
});

export default rootReducer;
