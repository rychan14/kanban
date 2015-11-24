import should from 'should';
import sinon from 'sinon';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import ShallowTestUtils from  'react-shallow-testutils';
import {Board} from '../../containers/App.jsx';
import {CALL_API} from '../../middleware/api';

function setup() {
  const props = {
    dispatch: sinon.spy(),
    issues: [],
    repo: {}
  };

  const renderer = TestUtils.createRenderer();
  renderer.render(<Board {...props} />);
  const output = renderer.getRenderOutput();
  const instance = ShallowTestUtils.getMountedInstance(renderer);

  return {
    props,
    renderer,
    output,
    instance
  };
}

describe('App Container', () => {
  describe('App Render', () => {
    it('Should render correctly', done => {
      const {output} = setup();
      output.type.should.equal('div');
      done();
    });
  });

  describe('App Functions', () => {
    const {props, instance} = setup();

    afterEach(done => {
      props.dispatch.reset();
      done();
    });

    it('Should call redux dispatch with repo action fetchRepo', done => {
      props.dispatch.called.should.be.false();
      instance.getRepo();
      props.dispatch.calledOnce.should.be.true();
      props.dispatch.firstCall.args[0][CALL_API].should.exist;
      done();
    });

    it('Should call redux dispatch with issue action creator fetchIssues', done => {
      props.dispatch.called.should.be.false();
      instance.getIssues();
      props.dispatch.calledOnce.should.be.true();
      props.dispatch.firstCall.args[0][CALL_API].should.exist;
      done();
    });
  });
});
