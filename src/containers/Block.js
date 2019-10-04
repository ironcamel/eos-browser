import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { requestDetails, toggleDetails } from '../actions';
import BlockView from '../components/BlockView';

const mapDispatchToProps = (dispatch) => {
  const actionCreators = bindActionCreators({ toggleDetails, requestDetails }, dispatch);
  return { ...actionCreators, dispatch };
};

export default connect(null, mapDispatchToProps)(BlockView);
