import {GET_REPO, REPO_REQUEST, REPO_SUCCESS, REPO_FAILURE} from '../actions/repos';

export default function repos(state = [], action) {
  switch(action.type) {
    case REPO_SUCCESS:
      return [
        ...state,
        action.response.entities.repos
      ];
    default:
      return state;
  }
}
