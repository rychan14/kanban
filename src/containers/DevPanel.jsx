import React, {Component} from 'react';
import {DevTools, DebugPanel, LogMonitor} from 'redux-devtools/lib/react';
import store from '../store/store';

export default class DevPanel extends Component {
  render() {
    return (
      <DebugPanel top right bottom>
        <DevTools store={store} monitor={LogMonitor} />
      </DebugPanel>
    );
  }
}
