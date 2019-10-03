import * as actions from '.';

test('receivedBlock', () => {
  const action = actions.receivedBlock({ id: 123 });
  expect(action).toEqual({
    type: 'RECEIVED_BLOCK',
    block: { id: 123 },
  });
});

test('doneBlocks', () => {
  const action = actions.doneBlocks();
  expect(action).toEqual({
    type: 'DONE_FETCHING_BLOCKS',
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
  const action = actions.toggleDetails('123');
  expect(action).toEqual({
    type: 'TOGGLE_DETAILS',
    blockId: '123',
  });
});

test('setTotalBlocks', () => {
  const action = actions.setTotalBlocks(10);
  expect(action).toEqual({
    type: 'SET_TOTAL_BLOCKS',
    totalBlocks: 10,
  });
});

test('requestBlocks', () => {
  const args = { isFetchingBlocks: true };
  const action = actions.requestBlocks(args);
  expect(action).toEqual({
    type: 'REQUEST_BLOCKS',
  });
});

test('requestDetails', () => {
  const block = { id: 'id100', isFetchingDetails: true };
  const action = actions.requestDetails(jest.fn(), block, {});
  expect(action).toEqual({
    type: 'REQUEST_DETAILS',
    blockId: 'id100',
  });
});
