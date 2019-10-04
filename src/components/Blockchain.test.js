import React from 'react';
import { shallow } from 'enzyme';
import Block from '../containers/Block';
import Blockchain from './Blockchain';

test('Empty blockchain', () => {
  const blockchain = shallow(
    <Blockchain
      blocks={[]}
      blocksById={{}}
      eosClient={jest.fn()}
      isFetchingBlocks={false}
    />
  );
  expect(blockchain.find('img.spinner')).toHaveLength(0);
});

test('Blockchain that is fetching blocks displays spinner', () => {
  const blockchain = shallow(
    <Blockchain
      blocks={[]}
      blocksById={{}}
      eosClient={jest.fn()}
      isFetchingBlocks={true}
    />
  );
  expect(blockchain.find('img.spinner')).toHaveLength(1);
});

test('Blockchain with one block', () => {
  const blockIds = ['101'];
  const blocksById = { '101': { id: '101' } };
  const blockchain = shallow(
    <Blockchain
      blocks={blockIds}
      blocksById={blocksById}
      eosClient={jest.fn()}
      isFetchingBlocks={false}
    />
  );
  expect(blockchain.find('img.spinner')).toHaveLength(0);
  const blocks = blockchain.find(Block);
  expect(blocks).toHaveLength(1);
  const block = blocks.first();
  expect(block.props().block).toEqual({ id: '101' });
});

test('Blockchain with multiple blocks', () => {
  const blockIds = ['101', '102'];
  const blocksById = {
    '101': { id: '101' },
    '102': { id: '102' },
  };
  const blockchain = shallow(
    <Blockchain
      blocks={blockIds}
      blocksById={blocksById}
      eosClient={jest.fn()}
      isFetchingBlocks={false}
    />
  );
  expect(blockchain.find('img.spinner')).toHaveLength(0);
  const blocks = blockchain.find(Block);
  expect(blocks).toHaveLength(2);
  expect(
    blocks.map((block) => block.props().block)
  ).toEqual([
    { id: '101' },
    { id: '102' },
  ]);
});
