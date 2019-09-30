export const RECEIVED_BLOCK = 'RECEIVED_BLOCK';
export const REQUEST_BLOCKS = 'REQUEST_BLOCKS';
export const DONE_FETCHING_BLOCKS = 'DONE_FETCHING_BLOCKS';
export const REQUEST_DETAILS = 'REQUEST_DETAILS';
export const RECEIVED_DETAIL = 'RECEIVED_DETAIL';

export const requestBlocks = () => ({
  type: REQUEST_BLOCKS,
});

export const receivedBlock = (block) => ({
  type: RECEIVED_BLOCK,
  block,
});

export const doneBlocks = () => ({
  type: DONE_FETCHING_BLOCKS,
});

export const requestDetails = (blockId) => ({
  type: REQUEST_DETAILS,
  blockId,
});

export const receivedDetail = (blockId, actionIdx, contract) => ({
  type: RECEIVED_DETAIL,
  blockId,
  actionIdx,
  contract,
});
