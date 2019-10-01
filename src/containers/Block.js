import { connect } from 'react-redux';
import Mustache from 'mustache';
import MarkdownIt from 'markdown-it';
import { receivedDetail, requestDetails, toggleDetails } from '../actions';
import BlockView from '../components/BlockView';

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

const populateDetails = async (block, eosClient, dispatch) => {
  const { actions, isFetchingDetails } = block;
  if (isFetchingDetails) return;

  dispatch(requestDetails(block.id));
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

const mapStateToProps = (state, ownProps) => {
  const { blocksById, isFetchingDetails } = state;
  const { block } = ownProps;
  return {
    block: blocksById[block.id],
    isFetchingDetails,
  };
};

const mapDispatchToProps = (dispatch) => ({
  loadDetails: (block, eosClient) => {
    populateDetails(block, eosClient, dispatch);
  },
  toggleDetails: (blockId) => dispatch(toggleDetails(blockId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BlockView);
