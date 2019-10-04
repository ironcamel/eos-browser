import React from 'react';
import { shallow } from 'enzyme';
import { createStore } from 'redux';
import Block from './Block';
import BlockView from '../components/BlockView';
import reducer from '../reducers';
import { requestDetails, toggleDetails } from '../actions';

const store = createStore(reducer);

test('Block properly connects to BlockView props', () => {
  const blockData = { id: '100' };
  const block = shallow(
      <Block block={blockData} eosClient={{}} store={store} />
  );
  const blockView = block.find(BlockView);
  expect(blockView).toHaveLength(1);
  const props = blockView.props();
  expect(props.block).toEqual(blockData);
  expect(typeof props.requestDetails).toEqual('function');
  expect(typeof props.toggleDetails).toEqual('function');
  expect(typeof props.dispatch).toEqual('function');
});
