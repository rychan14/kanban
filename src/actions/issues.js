import {CALL_API, Schemas} from '../middleware/api';

export const ISSUES_REQUEST = 'ISSUES_REQUEST';
export const ISSUES_SUCCESS = 'ISSUES_SUCCESS';
export const ISSUES_FAILURE = 'ISSUES_FAILURE';


export function fetchIssues(repoFullName) {
  return {
    [CALL_API]: {
      types: [ISSUES_REQUEST, ISSUES_SUCCESS, ISSUES_FAILURE],
      endpoint: `repos/${repoFullName}/issues`,
      schema: Schemas.ISSUE_ARRAY
    }
  };
}
