import {
  REQUEST_BLOCKS, RECEIVED_BLOCK, DONE_FETCHING_BLOCKS,
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
    case REQUEST_BLOCKS:
      return {
        ...state,
        blocks: [],
        blocksById: {},
        isFetchingBlocks: true,
      };
    case RECEIVED_BLOCK: {
      const { block } = action;
      const blocks = [...state.blocks, block.id];
      const blocksById = {
        ...state.blocksById,
        [block.id]: block,
      };
      return { ...state, blocks, blocksById };
    }
    case DONE_FETCHING_BLOCKS:
      return { ...state, isFetchingBlocks: false };
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
    default:
      return state;
  }
};

export default reducer;
