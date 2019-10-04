import React from 'react';
import { shallow } from 'enzyme';
import { createStore } from 'redux';
import Block from './Block';
import BlockView from '../components/BlockView';
import reducer from '../reducers';

const store = createStore(reducer);

test('Block properly connects to BlockView props', () => {
  const blockData = { id: '100' };
  const block = shallow(
    <Block block={blockData} eosClient={{ client: 'foo' }} store={store} />
  );
  const blockView = block.find(BlockView);
  expect(blockView).toHaveLength(1);
  expect(blockView.props()).toMatchObject({
    block: { id: '100' },
    eosClient: { client: 'foo' },
    toggleDetails: expect.any(Function),
    requestDetails: expect.any(Function),
    dispatch: expect.any(Function),
    store,
  });
});
