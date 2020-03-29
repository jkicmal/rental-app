import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import { StylesProvider } from '@material-ui/core/styles';

import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import './assets/styles/_base.scss';

import App from './root/App';
import store from './root/store';

const componentTree = (
  <StylesProvider injectFirst>
    <Provider store={store}>
      <ReduxToastr
        timeOut={5000}
        newestOnTop={false}
        preventDuplicates
        position="top-right"
        // getState={state => state.toastr}
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        // progressBar
      />
      <App />
    </Provider>
  </StylesProvider>
);

ReactDOM.render(componentTree, document.getElementById('root'));
