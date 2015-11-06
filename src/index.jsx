import 'babel-polyfill';
import React from 'react';
import ReactDom from 'react-dom';
import Root from './containers/Root';
import store from './store/store';

ReactDom.render(
  <Root store={store} />,
  document.getElementById('root')
);
