import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { requestDetails, toggleDetails } from '../actions';
import BlockView from '../components/BlockView';

class Block extends Component {
  componentDidUpdate(prevProps) {
    const { dispatch, block, eosClient } = this.props;
    const prevShowDetails = prevProps.block.showDetails;
    const { showDetails } = this.props.block;
    if ((prevShowDetails !== showDetails) && showDetails) {
      this.props.requestDetails(dispatch, block, eosClient);
    }
  }

  render() {
    const { block } = this.props;
    return <BlockView block={block} toggleDetails={this.props.toggleDetails} />;
  }
}

const mapDispatchToProps = (dispatch) => {
  const actionCreators = bindActionCreators({ toggleDetails, requestDetails }, dispatch);
  return { ...actionCreators, dispatch };
};

export default connect(null, mapDispatchToProps)(Block);
