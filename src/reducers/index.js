import {combineReducers} from 'redux';
import issues from './issues';
import repos from './repos';

const rootReducer = combineReducers({
  issues,
  repos
});

export default rootReducer;
