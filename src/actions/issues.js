export const ADD_ISSUE = 'ADD_ISSUE';

export function addIssue(title, details) {
  return {type: ADD_ISSUE, title, details};
}
