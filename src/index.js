import './index.css';
import '../public/manifest.json';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';
import configureStore from './store';

import * as serviceWorker from './serviceWorker';

require('babel-polyfill');

ReactDOM.render((
  <BrowserRouter>
    <Provider store={configureStore()}>
      <App />
    </Provider>
  </BrowserRouter>
), document.getElementById('root'));


serviceWorker.unregister();
