import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './containers/App';
import EosClient from './util/eos-client';
import reducer from './reducers';
import './index.css';

const store = createStore(reducer);
const eosClient = new EosClient();

render(
  <Provider store={store}>
    <App eosClient={eosClient} />
  </Provider>,
  document.getElementById('root'),
);
