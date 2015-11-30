import {REPO_SUCCESS} from '../actions/repos';
import {ISSUES_SUCCESS} from '../actions/issues';
import {fetchIssues} from '../actions/issues';

export default store => next => action => {
  if(action.type === REPO_SUCCESS) {
    store.dispatch(fetchIssues(action.response.result));
    next(action);
  }

  if(action.type === ISSUES_SUCCESS) {
    const response = Object.keys(action.response.entities.issues).map(key => {
      let issue = {};
      issue[key] = action.response.entities.issues[key];
      return issue;
    });
    next({
      response,
      type: ISSUES_SUCCESS
    });
  }

  else {
    next(action);
  }
};
