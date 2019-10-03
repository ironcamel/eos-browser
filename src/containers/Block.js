import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { requestDetails, toggleDetails } from '../actions';
import BlockView from '../components/BlockView';

const mapStateToProps = (state, ownProps) => {
  const { blocksById } = state;
  const { block } = ownProps;
  return { block: blocksById[block.id] };
};

const mapDispatchToProps = (dispatch) => {
  const actionCreators = bindActionCreators({ toggleDetails, requestDetails }, dispatch);
  return { ...actionCreators, dispatch };
};

export default connect(mapStateToProps, mapDispatchToProps)(BlockView);
