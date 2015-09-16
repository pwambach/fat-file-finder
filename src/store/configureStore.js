import { compose, createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import thunkMiddleware from 'redux-thunk';
//import loggerMiddleware from 'redux-logger';
//import { devTools, persistState } from 'redux-devtools';

export default function configureStore(initialState) {

  const createStoreWithMiddlewareAndDevTools = compose(
    applyMiddleware(thunkMiddleware/*, loggerMiddleware*/)
    /*devTools(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))*/
  )(createStore);

  const store = createStoreWithMiddlewareAndDevTools(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
