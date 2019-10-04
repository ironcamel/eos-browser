import React from 'react';
import { shallow } from 'enzyme';
import AppView from './AppView';
import Blockchain from './Blockchain';

test('Appview', () => {
  const blocks = [];
  const blocksById = {};
  const eosClient = {};
  const isFetchingBlocks = false;
  const setTotalBlocks = jest.fn();
  const totalBlocks = 10;
  const requestBlocks = jest.fn();
  const dispatch = jest.fn();

  const appView = shallow(
    <AppView
      blocks={blocks}
      blocksById={blocksById}
      eosClient={eosClient}
      isFetchingBlocks={isFetchingBlocks}
      setTotalBlocks={setTotalBlocks}
      totalBlocks={totalBlocks}
      requestBlocks={requestBlocks}
      dispatch={dispatch}
    />
  );

  const loadButton = appView.find('button');
  expect(loadButton).toHaveLength(1);
  expect(loadButton.text()).toEqual('LOAD');
  expect(loadButton.props().disabled).toEqual(false);

  const numBlocksSelect = appView.find('select');
  expect(numBlocksSelect).toHaveLength(1);
  expect(numBlocksSelect.props().value).toEqual(10);
  expect(loadButton.props().disabled).toEqual(false);

  const blockChain = appView.find(Blockchain);
  expect(blockChain).toHaveLength(1);
  expect(blockChain.props().blocks).toEqual(blocks);
  expect(blockChain.props().blocksById).toEqual(blocksById);
  expect(blockChain.props().eosClient).toEqual(eosClient);
  expect(blockChain.props().isFetchingBlocks).toEqual(isFetchingBlocks);
});


test('Appview loading new blocks', () => {
  const blocks = [];
  const blocksById = {};
  const eosClient = {};
  const isFetchingBlocks = true;
  const setTotalBlocks = jest.fn();
  const totalBlocks = 10;
  const requestBlocks = jest.fn();
  const dispatch = jest.fn();

  const appView = shallow(
    <AppView
      blocks={blocks}
      blocksById={blocksById}
      eosClient={eosClient}
      isFetchingBlocks={isFetchingBlocks}
      setTotalBlocks={setTotalBlocks}
      totalBlocks={totalBlocks}
      requestBlocks={requestBlocks}
      dispatch={dispatch}
    />
  );

  const loadButton = appView.find('button');
  expect(loadButton.props().disabled).toEqual(true);

  const numBlocksSelect = appView.find('select');
  expect(loadButton.props().disabled).toEqual(true);

  const blockChain = appView.find(Blockchain);
  expect(blockChain.props().isFetchingBlocks).toEqual(true);
});

test('Appview with multiple blocks', () => {
  const blocks = ['101', '102'];
  const blocksById = {
    '101': { id: '101' },
    '102': { id: '102' },
  };
  const eosClient = {};
  const isFetchingBlocks = false;
  const setTotalBlocks = jest.fn();
  const totalBlocks = 10;
  const requestBlocks = jest.fn();
  const dispatch = jest.fn();

  const appView = shallow(
    <AppView
      blocks={blocks}
      blocksById={blocksById}
      eosClient={eosClient}
      isFetchingBlocks={isFetchingBlocks}
      setTotalBlocks={setTotalBlocks}
      totalBlocks={totalBlocks}
      requestBlocks={requestBlocks}
      dispatch={dispatch}
    />
  );

  const blockChain = appView.find(Blockchain);
  expect(blockChain).toHaveLength(1);
  expect(blockChain.props().blocks).toEqual(blocks);
  expect(blockChain.props().blocksById).toEqual(blocksById);
});
