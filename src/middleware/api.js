import {Schema, arrayOf, normalize} from 'normalizr';
import {camelizeKeys} from 'humps';
import 'isomorphic-fetch';

const API_ROOT = 'https://api.github.com/';

function callApi(endpoint, schema) {
  const fullUrl =  (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;

  return fetch(fullUrl)
  .then(response =>
    response.json().then(json => ({ json, response }))
  ).then(({ json, response }) => {
    if (!response.ok) {
      return Promise.reject(json);
    }

    const camelizedJson = camelizeKeys(json);

    return normalize(camelizedJson, schema);
  });
}

const repoSchema = new Schema('repos', {
  idAttribute: 'fullName'
});

const issueSchema = new Schema('issues', {
  idAttribute: 'id'
});

issueSchema.define({
  owner: repoSchema
});

export const Schemas = {
  REPO: repoSchema,
  REPO_ARRAY: arrayOf(repoSchema),
  ISSUE: issueSchema,
  ISSUE_ARRAY: arrayOf(issueSchema)
};

export const CALL_API = Symbol('Call Api');

export default store => next => action => {
  const callAPI = action[CALL_API];

  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  let{endpoint} = callAPI;
  const{schema, types} = callAPI;

  if(typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }

  if(typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }

  if(!schema) {
    throw new Error('Specify one of the exported Schemas.');
  }

  if(!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }

  if(!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  }

  const [requestType, successType, failureType] = types;
  next(actionWith({type: requestType}));

  return callApi(endpoint, schema)
    .then(
    response => next(actionWith({
      response,
      type: successType
    })),
    error => next(actionWith({
      type: failureType,
      error: error.message || 'Something bad happened.'
    }))
  );
};
