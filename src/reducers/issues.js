import {ISSUES_REQUEST, ISSUES_SUCCESS, ISSUES_FAILURE} from  '../actions/issues';

export default function issues(state = [], action) {
  console.log(action);
  switch (action.type) {
    case ISSUES_SUCCESS:
      return Object.keys(action.response.entities.issues).map(key => {
        let issue = {};
        issue[key] = action.response.entities.issues[key];
        return issue;
      });
    default:
      return state;
  }
}
