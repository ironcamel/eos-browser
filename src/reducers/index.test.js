import reducer from '.';

test('REQUEST_BLOCKS', () => {
  const state1 = {
    totalBlocks: 10,
    isFetchingBlocks: false,
    blocks: [],
    blocksById: {},
  };
  const action1 = { type: 'REQUEST_BLOCKS' };
  const state2 = reducer(state1, action1);
  expect(state2).toEqual({
    totalBlocks: 10,
    isFetchingBlocks: true,
    blocks: [],
    blocksById: {},
  });

  const state3 = {
    totalBlocks: 10,
    isFetchingBlocks: false,
    blocks: ['100', '101', '102'],
    blocksById: {
      '100': { id: '100'},
      '101': { id: '101'},
      '102': { id: '102'},
    },
  };
  const action3 = { type: 'REQUEST_BLOCKS' };
  const state4 = reducer(state1, action1);
  expect(state2).toEqual({
    totalBlocks: 10,
    isFetchingBlocks: true,
    blocks: [],
    blocksById: {},
  });
});

test('RECEIVED_BLOCK', () => {
  const state1 = {
    totalBlocks: 10,
    isFetchingBlocks: false,
    blocks: [],
    blocksById: {},
  };
  const action1 = {
    type: 'RECEIVED_BLOCK',
    block: { id: '100' },
  };
  const state2 = reducer(state1, action1);
  expect(state2).toEqual({
    totalBlocks: 10,
    isFetchingBlocks: false,
    blocks: ['100'],
    blocksById: {
      '100': { id: '100'}
    },
  });

  const action2 = {
    type: 'RECEIVED_BLOCK',
    block: { id: '200' },
  };
  const state3 = reducer(state2, action2);
  expect(state3).toEqual({
    totalBlocks: 10,
    isFetchingBlocks: false,
    blocks: ['100', '200'],
    blocksById: {
      '100': { id: '100'},
      '200': { id: '200'},
    },
  });
});

test('DONE_FETCHING_BLOCKS', () => {
  const state1 = {
    totalBlocks: 10,
    isFetchingBlocks: false,
    blocks: [],
    blocksById: {},
  };
  const action1 = { type: 'DONE_FETCHING_BLOCKS' };
  const state2 = reducer(state1, action1);
  expect(state2).toEqual({
    totalBlocks: 10,
    isFetchingBlocks: false,
    blocks: [],
    blocksById: {},
  });

  const state3 = {
    totalBlocks: 10,
    isFetchingBlocks: true,
    blocks: [],
    blocksById: {},
  };
  const action3 = { type: 'DONE_FETCHING_BLOCKS' };
  const state4 = reducer(state3, action3);
  expect(state4).toEqual({
    totalBlocks: 10,
    isFetchingBlocks: false,
    blocks: [],
    blocksById: {},
  });
});

test('SET_TOTAL_BLOCKS', () => {
  const state1 = {
    totalBlocks: 10,
    isFetchingBlocks: false,
    blocks: [],
    blocksById: {},
  };
  const action1 = { type: 'SET_TOTAL_BLOCKS', totalBlocks: 20 };
  const state2 = reducer(state1, action1);
  expect(state2).toEqual({
    totalBlocks: 20,
    isFetchingBlocks: false,
    blocks: [],
    blocksById: {},
  });
});

test('REQUEST_DETAILS', () => {
  const state1 = {
    totalBlocks: 10,
    isFetchingBlocks: false,
    blocks: ['100'],
    blocksById: {
      '100': { id: '100', isFetchingDetails: false },
    },
  };
  const action1 = { type: 'REQUEST_DETAILS', blockId: '100' };
  const state2 = reducer(state1, action1);
  expect(state2).toEqual({
    totalBlocks: 10,
    isFetchingBlocks: false,
    blocks: ['100'],
    blocksById: {
      '100': { id: '100', isFetchingDetails: true },
    },
  });
});

test('RECEIVED_DETAIL', () => {
  const state1 = {
    totalBlocks: 10,
    isFetchingBlocks: false,
    blocks: ['100', '101'],
    blocksById: {
      '100': { id: '100', actions: [{}] },
      '101': { id: '101', actions: [{}] },
    },
  };
  const action1 = {
    type: 'RECEIVED_DETAIL',
    blockId: '100',
    actionIdx: 0,
    contract: 'foo'
  };
  const state2 = reducer(state1, action1);
  expect(state2).toEqual({
    totalBlocks: 10,
    isFetchingBlocks: false,
    blocks: ['100', '101'],
    blocksById: {
      '100': { id: '100', actions: [{ contract: 'foo' }] },
      '101': { id: '101', actions: [{}] },
    },
  });

  const action2 = {
    type: 'RECEIVED_DETAIL',
    blockId: '101',
    actionIdx: 0,
    contract: 'bar'
  };
  const state3 = reducer(state2, action2);
  expect(state3).toEqual({
    totalBlocks: 10,
    isFetchingBlocks: false,
    blocks: ['100', '101'],
    blocksById: {
      '100': { id: '100', actions: [{ contract: 'foo' }] },
      '101': { id: '101', actions: [{ contract: 'bar' }] },
    },
  });
});

test('TOGGLE_DETAILS', () => {
  const state1 = {
    totalBlocks: 10,
    isFetchingBlocks: false,
    blocks: ['100'],
    blocksById: {
      '100': { id: '100', showDetails: false },
    },
  };
  const action1 = { type: 'TOGGLE_DETAILS', blockId: '100' };
  const state2 = reducer(state1, action1);
  expect(state2).toEqual({
    totalBlocks: 10,
    isFetchingBlocks: false,
    blocks: ['100'],
    blocksById: {
      '100': { id: '100', showDetails: true },
    },
  });

  const action2 = { type: 'TOGGLE_DETAILS', blockId: '100' };
  const state3 = reducer(state2, action2);
  expect(state3).toEqual({
    totalBlocks: 10,
    isFetchingBlocks: false,
    blocks: ['100'],
    blocksById: {
      '100': { id: '100', showDetails: false },
    },
  });
});
