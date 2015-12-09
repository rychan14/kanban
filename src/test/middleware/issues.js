import should from 'should';
import {applyMiddleware} from 'redux';
import issues from '../../middleware/issues';
import {fetchIssues} from '../../actions/issues';
import {REPO_SUCCESS, REPO_FAILURE} from '../../actions/repos';
import {ISSUES_SUCCESS} from '../../actions/issues';

describe('Issues Middleware', () => {
  const middlewares = [issues];
  function mockStore(getState, expectedActions, done) {
    function mockStoreWithoutMiddleware() {
      return {
        getState() {
          return getState;
        },

        dispatch(action) {
          try {
            const expectedAction = expectedActions.shift();
            const expectedResponse  = expectedAction.response;
            const response = action.response;
            action.should.deepEqual.expectedAction;
            if(response) {
              console.log(response);
              console.log(expectedResponse);
              response.should.equal.expectedResponse;
            }
            if (done && !expectedActions.length) {
              done();
            }
            return action;
          }
          catch(error) {
            done(error);
          }
        }
      };
    }

    const mockStoreWithMiddleware = applyMiddleware(
      ...middlewares
    )(mockStoreWithoutMiddleware);

    return mockStoreWithMiddleware();
  }

  describe('REPO_SUCCESS Actions', () => {
    it('Should dispatch ISSUES_REQUEST action with repo info from REPO_SUCCESS action response', done => {
      const repoSuccess = {
        type: REPO_SUCCESS,
        response: {
          result: 'name'
        }
      };

      const expectedActions = [
        fetchIssues('name'),
        repoSuccess
      ];

      const store = mockStore({}, expectedActions, done);
      store.dispatch(repoSuccess);
    });
  });

  describe('ISSUES_SUCCESS Action', () => {
    it('Should parse response data to keep reducer pure', done => {
      const issueSuccess = {
        type: ISSUES_SUCCESS,
        response: {
          entities: {
            issues: [
              {1: 'issue1'},
              {2: 'issue2'}
            ]
          }
        }
      };

      const expectedActions = [
        issueSuccess
      ];
      const store = mockStore({}, expectedActions, done);
      store.dispatch(issueSuccess);
    });
  });

  describe('Other Actions', () => {
    it('Should not dispatch anymore actions', done => {
      const repoFailure = {
        type: REPO_FAILURE
      };

      const expectedActions = [
        repoFailure
      ];

      const store = mockStore({}, expectedActions, done);
      store.dispatch(repoFailure);
    });
  });
});
