import * as actions from '.';

test('requestBlocks', () => {
  const action = actions.requestBlocks();
  expect(action).toEqual({
    type: 'REQUEST_BLOCKS',
  });
});

test('receivedBlock', () => {
  const block = { id: 123 };
  const action = actions.receivedBlock(block);
  expect(action).toEqual({
    type: 'RECEIVED_BLOCK',
    block: block,
  });
});

test('doneBlocks', () => {
  const action = actions.doneBlocks();
  expect(action).toEqual({
    type: 'DONE_FETCHING_BLOCKS',
  });
});

test('requestDetails', () => {
  const action = actions.requestDetails(123);
  expect(action).toEqual({
    type: 'REQUEST_DETAILS',
    blockId: 123,
  });
});

test('receivedDetail', () => {
  const action = actions.receivedDetail(1, 2, 3);
  expect(action).toEqual({
    type: 'RECEIVED_DETAIL',
    blockId: 1,
    actionIdx: 2,
    contract: 3,
  });
});

test('toggleDetails', () => {
  const action = actions.toggleDetails(123);
  expect(action).toEqual({
    type: 'TOGGLE_DETAILS',
    blockId: 123,
  });
});

test('setTotalBlocks', () => {
  const action = actions.setTotalBlocks(10);
  expect(action).toEqual({
    type: 'SET_TOTAL_BLOCKS',
    totalBlocks: 10,
  });
});
