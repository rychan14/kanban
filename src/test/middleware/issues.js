import should from 'should';
import sinon from 'sinon';
import {applyMiddleware} from 'redux';
import issues from '../../middleware/issues';
import {REPO_SUCCESS} from '../../actions/repos';
import {ISSUES_REQUEST} from '../../actions/issues';

describe('Issues Middleware', () => {
  describe('REPO_SUCCESS Actions', () => {
    it('Should dispatch ISSUES_REQUEST action with repo info from REPO_SUCCESS action response');
  });

  describe('Other Actions', () => {
    it('Should not dispatch anymore actions');
  });
});
