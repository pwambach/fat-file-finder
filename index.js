import 'babel-core/polyfill';

import React from 'react';
import { Provider } from 'react-redux';
import App from './containers/App';
import configureStore from './store/configureStore';
import './styles/index.css';

const store = configureStore();

let unsubscribe = store.subscribe(() =>
  console.log("Store changed: ", store.getState())
);

React.render(
  <Provider store={store}>
    {() => <App />}
  </Provider>,
  document.getElementById('root')
);
