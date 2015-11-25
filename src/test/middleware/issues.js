import should from 'should';
import {applyMiddleware} from 'redux';
import issues from '../../middleware/issues';
import {fetchIssues} from '../../actions/issues';
import {REPO_SUCCESS, REPO_FAILURE} from '../../actions/repos';

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
            action.should.equal.expectedAction;
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

  describe('Other Actions', () => {
    it('Should not dispatch anymore actions', done => {
      const repoFailure = {
        type: REPO_FAILURE
      };

      const expectedActions = [
        {type: REPO_FAILURE, response: {result: 'name'}}
      ];

      const store = mockStore({}, expectedActions, done);
      store.dispatch(repoFailure);
    });
  });
});
