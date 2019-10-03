import * as markstache from '../util/markstache';

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

const fetchDetails = async (dispatch, block, eosClient) => {
  const { actions, isFetchingDetails } = block;
  if (isFetchingDetails) return;

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];
    const abi = await eosClient.getAbi(action.account);
    const contract = abi.contracts[action.name];
    if (contract) {
      const renderedContract = markstache.render(contract, action.data);
      dispatch(receivedDetail(block.id, i, renderedContract));
    }
  }
};

export const requestDetails = (dispatch, block, eosClient) => {
  fetchDetails(dispatch, block, eosClient);
  return {
    type: REQUEST_DETAILS,
    blockId: block.id,
  };
};
