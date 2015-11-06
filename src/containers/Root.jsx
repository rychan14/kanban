import React, {Component, PropTypes} from 'react';
import {Provider} from 'react-redux';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

export default class Root extends Component {
  render() {
    const {store} = this.props;
    return (
      <div>
        <Provider store={store}>
          <div></div>
        </Provider>
        <DebugPanel top right bottom>
          <DevTools store={store} monitor={LogMonitor} />
        </DebugPanel>
      </div>
    );
  }
}
