import should from 'should';
import sinon from 'sinon';
import request from 'browser-request';
import {applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import api, {CALL_API, callApi, Schemas} from '../../middleware/api';
import {loadRepo, REPO_REQUEST, REPO_SUCCESS, REPO_FAILURE} from '../../actions/repos';
import {RepoObj} from '../data/api';

const middlewares = [thunk, api]

describe('API Middleware', () => {
  describe('Call Api Function', () => {
    describe('Call Api Success', () => {
      before(done => {
        sinon.stub(request, 'get')
          .yields(null, {statusCode: 200}, RepoObj);
        done();
      });

      after(done => {
        request.get.restore();
        done();
      });

      it('Should call request get and return resolved promise with JSON', done => {
        callApi('repos/mrarnoldpalmer/kanban', Schemas.REPO)
          .then(data => {
            data.should.exist;
            data.should.be.json;
            done();
          })
          .catch(error => {
            error.should.not.exist;
            done();
          });
      });
    });

    describe('Call Api Error', ()=> {
      before(done => {
        sinon.stub(request, 'get')
          .yields({message: 'Generic Error Message'}, {statusCode: 200}, RepoObj);
        done();
      });

      after(done => {
        request.get.restore();
        done();
      });

      it('Should call request get and reject promise on request error', done => {
        callApi('repos/mrarnoldpalmer/kanban', Schemas.REPO)
          .then(data => {
            data.should.not.exist;
            done();
          })
          .catch(error => {
            error.should.exist;
            done();
          });
      });
    });

    describe('Call Api Bad Response Code', ()=> {
      before(done => {
        sinon.stub(request, 'get')
          .yields(null, {statusCode: 400}, RepoObj);
        done();
      });

      after(done => {
        request.get.restore();
        done();
      });

      it('Should call request get and reject promise on request error', done => {
        callApi('repos/mrarnoldpalmer/kanban', Schemas.REPO)
          .then(data => {
            data.should.not.exist;
            done();
          })
          .catch(error => {
            error.should.exist;
            done();
          });
      });
    });
  });

  describe('Api Middleware Default Function', () => {
    let repoAction;

    before(done => {
      repoAction = {
        [CALL_API]: {
          types: [REPO_REQUEST, REPO_SUCCESS, REPO_FAILURE],
          endpoint: 'repos/mrarnoldpalmer/kanban',
          schema: Schemas.REPO
        }
      };
      done();
    });

    describe('Middleware Function Called With CALL_API Action', () => {
      describe('Call Api Successful', () => {
        before(done => {
          sinon.stub(request, 'get')
            .yields(null, {statusCode: 200}, JSON.stringify(RepoObj));
          done();
        });

        after(done => {
          request.get.restore();
          done();
        });

        it('Should return action REPO_REQUEST and REPO_SUCCESS Actions', done => {
          const expectedActions = [
            {type: REPO_REQUEST},
            {type: REPO_SUCCESS}
          ];
          const store = mockStore({}, expectedActions, done)
          store.dispatch(repoAction);
        });
      });

      describe('Call Api Failed', () => {
        before(done => {
          sinon.stub(request, 'get')
            .yields({message: 'Error Message'});
          done();
        });

        after(done => {
          request.get.restore();
          done();
        });

        it('Should return action REPO_REQUEST and REPO_FAILURE', done => {
          const expectedActions = [
            {type: REPO_REQUEST},
            {type: REPO_FAILURE}
          ];
          const store = mockStore({}, expectedActions, done)
          store.dispatch(repoAction);
        });
      });
    });
  });
});

function mockStore(getState, expectedActions, done) {
  function mockStoreWithoutMiddleware() {
    return {
      getState() {
        return typeof getState === 'function' ?
          getState() :
          getState
      },

      dispatch(action) {
        const expectedAction = expectedActions.shift()

        try {
          action.should.equal.expectedAction;
          if (done && !expectedActions.length) {
            done()
          }
          return action
        } catch (e) {
          done(e)
        }
      }
    }
  }

  const mockStoreWithMiddleware = applyMiddleware(
    ...middlewares
  )(mockStoreWithoutMiddleware);

  return mockStoreWithMiddleware();
}
