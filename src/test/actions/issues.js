import should from 'should';
import {fetchIssues, ISSUES_REQUEST, ISSUES_SUCCESS, ISSUES_FAILURE} from  '../../actions/issues';
import {CALL_API, Schemas} from '../../middleware/api';

describe('Issue Actions', () => {
  describe('Fetch Issues Action', () => {
    const types = [ISSUES_REQUEST, ISSUES_SUCCESS, ISSUES_FAILURE];
    const repoName = 'reponame/string';
    const action = fetchIssues(repoName);

    it('Should return action with CALL_API symbol key', done => {
      action[CALL_API].should.not.be.undefined();
      done();
    });

    it('Action should have correct attributes', done => {
      action[CALL_API].types.should.deepEqual(types);
      action[CALL_API].endpoint.should.equal(`repos/${repoName}/issues`);
      action[CALL_API].schema.should.equal(Schemas.ISSUE_ARRAY);
      done();
    });
  });
});
