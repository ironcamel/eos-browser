import React from 'react';
import { shallow } from 'enzyme';
import { createStore } from 'redux';
import App from './App';
import AppView from '../components/AppView';
import reducer from '../reducers';

const store = createStore(reducer);

test('App container properly sets AppView props', () => {
  const app = shallow(
    <App eosClient={{ client: 'foo' }} store={store} />
  ).shallow().shallow({disableLifecycleMethods: true});

  const appView = app.find(AppView);
  expect(appView).toHaveLength(1);
  expect(appView.props()).toMatchObject({
    eosClient: { client: 'foo' },
    totalBlocks: 10,
    isFetchingBlocks: false,
    blocks: [],
    blocksById: {},
    requestBlocks: expect.any(Function),
    setTotalBlocks: expect.any(Function),
    dispatch: expect.any(Function),
  });
});
