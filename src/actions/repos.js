import {CALL_API, Schemas} from '../middleware/api';

export const REPO_REQUEST = 'REPO_REQUEST';
export const REPO_SUCCESS = 'REPO_SUCCESS';
export const REPO_FAILURE = 'REPO_FAILURE';

export function fetchRepo(fullName) {
  return {
    [CALL_API]: {
      types: [REPO_REQUEST, REPO_SUCCESS, REPO_FAILURE],
      name: fullName,
      endpoint: `repos/${fullName}`,
      schema: Schemas.REPO
    }
  };
}
