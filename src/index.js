import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { StylesProvider } from '@material-ui/core/styles';

import './assets/styles/_base.scss';

import App from './root/App';
import store from './root/store';

const componentTree = (
  // Use "injectFirst" to make sure that styled specified by
  // developer have higher specificity than Material UI
  <StylesProvider injectFirst>
    <Provider store={store}>
      <App />
    </Provider>
  </StylesProvider>
);

ReactDOM.render(componentTree, document.getElementById('root'));
