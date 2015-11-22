import {REPO_REQUEST, REPO_SUCCESS, REPO_FAILURE} from '../actions/repos';

export default function repo(state = {}, action) {
  switch(action.type) {
    case REPO_SUCCESS:
      return action.response.entities.repos;
    default:
      return state;
  }
}
