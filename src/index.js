import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { JsonRpc } from 'eosjs';
import App from './containers/App';
import EosClient from './util/eos-client';
import reducer from './reducers';
import './index.css';
import config from './config';

// Inject a store and eosClient into the app

const rpc = new JsonRpc(config.eosApiUrl);
const eosClient = new EosClient({ rpc });
const store = createStore(reducer);

render(
  <Provider store={store}>
    <App eosClient={eosClient} />
  </Provider>,
  document.getElementById('root'),
);
