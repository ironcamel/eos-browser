export const RECEIVED_BLOCK = 'RECEIVED_BLOCK';
export const REQUEST_BLOCKS = 'REQUEST_BLOCKS';
export const DONE_FETCHING_BLOCKS = 'DONE_FETCHING_BLOCKS';
export const REQUEST_DETAILS = 'REQUEST_DETAILS';
export const RECEIVED_DETAIL = 'RECEIVED_DETAIL';
export const TOGGLE_DETAILS = 'TOGGLE_DETAILS';
export const SET_TOTAL_BLOCKS = 'SET_TOTAL_BLOCKS';

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

export const toggleDetails = (blockId) => ({
  type: TOGGLE_DETAILS,
  blockId,
});

export const setTotalBlocks = (totalBlocks) => ({
  type: SET_TOTAL_BLOCKS,
  totalBlocks,
});

const fetchBlocks = async (args) => {
  const { dispatch, isFetchingBlocks, totalBlocks, eosClient } = args;
  if (!isFetchingBlocks) {
    let prevBlock;
    for (let i = 0; i < totalBlocks; i++) {
      const block = prevBlock;
      prevBlock = await eosClient.getPrevBlock(block);
      dispatch(receivedBlock(prevBlock));
    }
    dispatch(doneBlocks());
  }
};

export const requestBlocks = (args) => {
  fetchBlocks(args);
  return { type: REQUEST_BLOCKS };
};
