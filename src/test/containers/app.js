import should from 'should';
import sinon from 'sinon';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {Board} from '../../containers/App.jsx';


function setup() {
  let props = {
    dispatch: sinon.spy(),
    issues: [],
    repo: {}
  }
  let renderer = TestUtils.createRenderer();
  renderer.render(<Board {...props} />);
  let output = renderer.getRenderOutput();

  return {
    props,
    output,
    renderer
  };
}

describe('App Container', () => {
  it('Should do something', done => {
    const {output, props, renderer} = setup();
    console.log(output);
    console.log(props);
    console.log(renderer);
    done();
  });
});
