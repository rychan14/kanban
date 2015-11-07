import {CALL_API, Schemas} from '../middleware/api';

export const REPO_REQUEST = 'REPO_REQUEST';
export const REPO_SUCCESS = 'REPO_SUCCESS';
export const REPO_FAILURE = 'REPO_FAILURE';

function fetchRepo(fullName) {
  return {
    [CALL_API]: {
      types: [REPO_REQUEST, REPO_SUCCESS, REPO_FAILURE],
      endpoint: `repos/${fullName}`,
      schema: Schemas.REPO
    }
  };
}

export function loadRepo(fullName, requiredFields = []) {
  return (dispatch, getState) => {
    const repo = getState().repos[fullName];

    if (repo && requiredFields.every(key => repo.hasOwnProperty(key))) {
      return null;
    }

    return dispatch(fetchRepo(fullName));
  };
}
