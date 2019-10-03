import Mustache from 'mustache';
import MarkdownIt from 'markdown-it';

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

const md = new MarkdownIt();

const renderContract = (contract, data) => {
  try {
    return md.render(Mustache.render(contract, data));
  } catch (err) {
    console.log('ERROR: failed to render contract');
    console.log(err);
    return '';
  }
};

const fetchDetails = async (dispatch, block, eosClient) => {
  const { actions, isFetchingDetails } = block;
  if (isFetchingDetails) return;

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];
    if (action.contract) continue;
    const abi = await eosClient.getAbi(action.account);
    const contract = abi.contracts[action.name];
    if (contract) {
      action.contract = renderContract(contract, action.data);
      const renderedContract = renderContract(contract, action.data);
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
