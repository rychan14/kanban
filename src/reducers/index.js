import {combineReducers} from 'redux';

function issues(state = [], action) {
  switch (action.type) {
    case 'ADD_ISSUE':
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

const rootReducer = combineReducers({
  issues
});

export default rootReducer;
