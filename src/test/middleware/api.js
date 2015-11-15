import should from 'should';
import sinon from 'sinon';
import request from 'browser-request';
import {callApi, Schemas} from '../../middleware/api';
import {RepoObj} from '../data/api';


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
});
