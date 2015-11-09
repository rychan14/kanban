export const ADD_ISSUE = 'ADD_ISSUE';

export function addIssue(issue) {
  return {type: ADD_ISSUE, title: issue.title, details: issue.details};
}
