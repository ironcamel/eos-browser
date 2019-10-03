import React from 'react';
import { shallow } from 'enzyme';
import BlockView from './BlockView';
import BlockEntry from './BlockEntry';

test('Block renders properly', () => {
  const block = {
    id: '100',
    timestamp: '2020-10-30',
    actions: [],
  };
  const blockView = shallow(
    <BlockView block={block} onClick={jest.fn()}/>
  );
  expect(
    blockView.find('.eos-block').first().find(BlockEntry).map((node) => ({
      label: node.prop('label'),
      value: node.prop('value'),
    }))
  ).toEqual(
    [
      { label: 'hash', value: '100' },
      { label: 'timestamp', value: '2020-10-30' },
      { label: 'actions', value: 0 },
    ]
  );
});

test('Block renders with details', () => {
  const block = {
    id: '100',
    timestamp: '2020-10-30',
    actions: [
      {
        name: 'transfer',
        account: 'cooltokens',
        contract: 'contract1',
      },
      {
        name: 'create',
        account: 'cooltokens',
        contract: 'contract2',
      },
    ],
    showDetails: true,
  };
  const blockView = shallow(
    <BlockView block={block} onClick={jest.fn()}/>
  );

  expect(
    blockView.find('.eos-block').first().find(BlockEntry).map((node) => ({
      label: node.prop('label'),
      value: node.prop('value'),
    }))
  ).toEqual(
    [
      { label: 'hash', value: '100' },
      { label: 'timestamp', value: '2020-10-30' },
      { label: 'actions', value: 2 },
    ]
  );

  expect(blockView.find('div.eos-details').length).toBe(1);

  const detailBlocks = blockView.find('div.eos-details div.eos-block');
  expect(detailBlocks.length).toBe(2);

  expect(
    detailBlocks.find(BlockEntry).map((node) => ({
      label: node.prop('label'),
      value: node.prop('value'),
    }))
  ).toEqual(
    [
      { label: 'action', value: 'transfer' },
      { label: 'account', value: 'cooltokens' },
      { label: 'contract', value: undefined },
      { label: 'action', value: 'create' },
      { label: 'account', value: 'cooltokens' },
      { label: 'contract', value: undefined },
    ]
  );

  expect(
    detailBlocks.find('div.contract').map((node) => (
      node.props().dangerouslySetInnerHTML.__html
    )
  )).toEqual([
    'contract1',
    'contract2',
  ]);
});

test('Block renders without details', () => {
  const block = {
    id: '100',
    timestamp: '2020-10-30',
    actions: [],
    showDetails: false,
  };
  const blockView = shallow(
    <BlockView block={block} onClick={jest.fn()}/>
  );

  expect(blockView.find('div.eos-details').length).toBe(0);
});
