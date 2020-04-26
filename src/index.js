import './index.css';
import '../public/manifest.json';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import App from './App';
import { store } from './store';
import history from './history';
import 'react-responsive-carousel/lib/styles/carousel.css';
import * as serviceWorker from './serviceWorker';
import colors from './colors';

require('babel-polyfill');

const theme = createMuiTheme({
  palette: {
    type: 'light',
    secondary: {
      main: colors.secondary,
      contrastText: '#fff',
    },
    primary: {
      main: colors.primary,
      contrastText: '#fff',
    },
  },
  status: {
    danger: 'red',
  },
});

ReactDOM.render((
  <Router history={history}>
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </MuiThemeProvider>
  </Router>
), document.getElementById('root'));


serviceWorker.unregister();
