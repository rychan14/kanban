import should from 'should';
import sinon from 'sinon';
import request from 'browser-request';
import {applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import api, {callApi, Schemas} from '../../middleware/api';
import {RepoObj, ApiAction, API_REQUEST, API_SUCCESS, API_FAILURE} from '../data/api';

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
    const middlewares = [thunk, api];
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

    describe('Middleware Function Handles CALL_API Action Dispatch', () => {
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

        it('Should return action API_REQUEST and API_SUCCESS actions', done => {
          const expectedActions = [
            {type: API_REQUEST},
            {type: API_SUCCESS}
          ];
          const store = mockStore({}, expectedActions, done);
          store.dispatch(ApiAction);
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

        it('Should return action API_REQUEST and API_FAILURE when callApi returns error', done => {
          const expectedActions = [
            {type: API_REQUEST},
            {type: API_FAILURE}
          ];
          const store = mockStore({}, expectedActions, done);
          store.dispatch(ApiAction);
        });
      });
    });
  });
});
