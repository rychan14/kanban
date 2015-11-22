import should from 'should';
import reducer from  '../../reducers/repos';
import {REPO_SUCCESS} from '../../actions/repos';

describe('Repos Reducer', () => {
  describe('REPO_SUCCESS Action Type', () => {
    const successAction = {
      response: {entities: {repos: 'New State'}},
      type: REPO_SUCCESS
    };

    it('Should change repo state to new repo JSON', done => {
      let state = reducer('Initial State', successAction);
      state.should.equal('New State');
      done();
    });
  });

  describe('Unknown Action Type', () => {
    const unknownAction = {
      type: 'UNKNOWN_ACTION'
    };

    it('Should return initial state', done => {
      let state = reducer('Initial State', unknownAction);
      state.should.deepEqual('Initial State');
      done();
    })
  });
});
