import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import thunkMiddleware from 'redux-thunk';

export default function configureStore(initialState) {

  const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
  const store = createStoreWithMiddleware(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
