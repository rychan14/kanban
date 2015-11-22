import should from 'should';
import reducer from '../../reducers/issues';
import {ISSUES_SUCCESS} from '../../actions/issues';

describe('Issues Reducer', () => {
  describe('ISSUES_SUCCESS Action Type', () => {
    const successAction = {
      response: {entities: {issues: 'New State'}},
      type: ISSUES_SUCCESS
    };

    it('Should append new issues to initial state', done => {
      let state = reducer(['Initial State'], successAction);
      state.should.deepEqual(['Initial State', 'New State']);
      done();
    });
  });

  describe('Unknown Action Type', () => {
    const unknownAction = {
      type: 'UNKNOWN_ACTION'
    };

    it('Should return initial state', done => {
      let state = reducer(['Initial State'], unknownAction);
      state.should.deepEqual(['Initial State']);
      done();
    })
  });
});
