import should from 'should';
import sinon from 'sinon';
import * as XMLHttpRequest from 'xhr2';
import {callApi, Schemas} from '../../middleware/api';
import {RepoObj} from '../data/api';


describe('API Middleware', () => {
  before(done => {
    let stub = sinon.stub(request, 'get');
    stub.yields(null, {statusCode: 200}, RepoObj);
    done();
  });
  after(done => {
    request.get.restore();
    done();
  });
  describe('Call Api Function', () => {
    it('Should test callApi', done => {
      callApi('repos/mrarnoldpalmer/kanban', Schemas.REPO)
        .then(data => {
          console.log(data);
          done();
        })
        .catch(error => {
          console.log(error);
          done();
        });
    });
  });
});
