import {createStore, applyMiddleware, compose} from 'redux';
import {devTools, persistState} from 'redux-devtools';
import rootReducer from '../reducers';

const finalCreateStore = compose(
  devTools(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);

const store = finalCreateStore(rootReducer);
export default store;
