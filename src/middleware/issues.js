import {REPO_SUCCESS} from '../actions/repos';
import {fetchIssues} from '../actions/issues';

export default store => next => action => {
  if(action.type === REPO_SUCCESS) {
    store.dispatch(fetchIssues(action.response.result));
  }

  next(action);
};
