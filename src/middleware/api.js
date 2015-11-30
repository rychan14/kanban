import {Schema, arrayOf, normalize} from 'normalizr';
import {camelizeKeys} from 'humps';
import request from 'browser-request';

const API_ROOT = 'https://api.github.com/';

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

  if(typeof callAPI === 'undefined') {
    return next(action);
  }

  let {endpoint} = callAPI;
  const {schema, types} = callAPI;
  const [requestType, successType, failureType] = types;

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  }

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

  next(actionWith({type: requestType}));

  return callApi(endpoint, schema)
    .then(response => next(actionWith({
      response,
      type: successType
    })))
    .catch(error => next(actionWith({
      type: failureType,
      error: error.message || 'Something bad happened.'
    })));
};

export function callApi(endpoint, schema) {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;

  return new Promise((resolve, reject) => {
    request.get({
      url: fullUrl
    }, (error, response, body) => {
      if(!error && response.statusCode === 200) {
        const camelizedJson = camelizeKeys(JSON.parse(body));

        return resolve(normalize(camelizedJson, schema));
      }
      else if(error) {
        return reject(error);
      }

      return reject(new Error(`Status code: ${response.statusCode}`));
    });
  });
}
