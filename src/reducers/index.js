import {
  REQUEST_BLOCKS, RECEIVED_BLOCK, DONE_FETCHING_BLOCKS, SET_TOTAL_BLOCKS,
  REQUEST_DETAILS, RECEIVED_DETAIL, TOGGLE_DETAILS,
} from '../actions';

const initialState = {
  totalBlocks: 10,
  isFetchingBlocks: false,
  blocks: [],
  blocksById: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // When requesting new blocks, reset the blocks and set isFetchingBlocks to true
    case REQUEST_BLOCKS:
      return {
        ...state,
        blocks: [],
        blocksById: {},
        isFetchingBlocks: true,
      };

    // When we receive a new block, append it to blocks and update blocksById
    case RECEIVED_BLOCK: {
      const { block } = action;
      const blocks = [...state.blocks, block.id];
      const blocksById = {
        ...state.blocksById,
        [block.id]: block,
      };
      return { ...state, blocks, blocksById };
    }

    // After we finish fetching the blocks, set isFetchingBlocks to false
    case DONE_FETCHING_BLOCKS:
      return { ...state, isFetchingBlocks: false };

    case SET_TOTAL_BLOCKS:
      return { ...state, totalBlocks: action.totalBlocks };

    // When details are request for a block, set isFetchingDetails to true for that block
    case REQUEST_DETAILS: {
      const { blockId } = action;
      const block = {
        ...state.blocksById[blockId],
        isFetchingDetails: true,
      };
      const blocksById = {
        ...state.blocksById,
        [block.id]: block,
      };
      return { ...state, blocksById };
    }

    // When we receive block action details, update the corresponding contract
    case RECEIVED_DETAIL: {
      const { blockId, actionIdx, contract } = action;
      const oldBlock = state.blocksById[blockId];
      const oldActions = oldBlock.actions;
      const newAction = { ...oldActions[actionIdx], contract };
      const actions = [
        ...oldActions.slice(0, actionIdx),
        newAction,
        ...oldActions.slice(actionIdx + 1),
      ];
      const block = { ...oldBlock, actions };
      const blocksById = {
        ...state.blocksById,
        [block.id]: block,
      };
      return { ...state, blocksById };
    }

    // Toggle the showDetails field for the block
    case TOGGLE_DETAILS: {
      const { blockId } = action;
      const oldBlock = state.blocksById[blockId];
      const block = {
        ...oldBlock,
        showDetails: !oldBlock.showDetails,
      };
      const blocksById = {
        ...state.blocksById,
        [block.id]: block,
      };
      return { ...state, blocksById };
    }

    // Should never get here, but just to be safe, return the current state
    default:
      return state;
  }
};

export default reducer;
