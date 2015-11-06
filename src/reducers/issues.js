import {ADD_ISSUE} from  '../actions/issues';

export default function issues(state = [], action) {
  switch (action.type) {
    case ADD_ISSUE:
      return [
        ...state,
        {
          title: action.title,
          details: action.details,
          completed: false
        }
      ];
    default:
      return state;
  }
}
