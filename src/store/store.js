import {createStore, applyMiddleware, compose} from 'redux';
import {devTools, persistState} from 'redux-devtools';
import api from '../middleware/api';
import issues from '../middleware/issues';
import rootReducer from '../reducers';

const finalCreateStore = compose(
  applyMiddleware(api, issues),
  devTools(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);

const store = finalCreateStore(rootReducer);
export default store;
