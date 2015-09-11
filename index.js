import 'babel-core/polyfill';

import React from 'react';
import { Provider } from 'react-redux';
import App from './containers/App';
import configureStore from './store/configureStore';
import './styles/main.scss';


const store = configureStore();

React.render(
  <Provider store={store}>
    {() => <App />}
  </Provider>,
  document.getElementById('root')
);
