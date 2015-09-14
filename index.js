import 'babel-core/polyfill';

import React from 'react';
import { Provider } from 'react-redux';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import App from './containers/App';
import configureStore from './store/configureStore';
import './styles/main.scss';


const store = configureStore();

React.render(
  <div>
    <Provider store={store}>
      {() => <App />}
    </Provider>
    <DebugPanel top right bottom>
      <DevTools store={store} monitor={LogMonitor} visibleOnLoad={false} />
    </DebugPanel>
  </div>,
  document.getElementById('root')
);
