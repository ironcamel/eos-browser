import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { requestBlocks, setTotalBlocks } from '../actions';
import AppView from '../components/AppView';

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => {
  const actionCreators = bindActionCreators({ requestBlocks, setTotalBlocks }, dispatch);
  return { ...actionCreators, dispatch };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppView);
