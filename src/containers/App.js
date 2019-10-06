import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { requestBlocks, setTotalBlocks } from '../actions';
import AppView from '../components/AppView';

class App extends Component {
  componentDidMount() {
    this._requestBlocks();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.totalBlocks !== this.props.totalBlocks) {
      this._requestBlocks();
    }
  }

  _requestBlocks() {
    const { dispatch, isFetchingBlocks, totalBlocks, eosClient } = this.props;
    this.props.requestBlocks({ dispatch, isFetchingBlocks, totalBlocks, eosClient });
  }

  render() {
    const {
      blocks,
      blocksById,
      eosClient,
      isFetchingBlocks,
      totalBlocks,
      dispatch,
    } = this.props;

    return (
      <AppView
        blocks={blocks}
        blocksById={blocksById}
        eosClient={eosClient}
        isFetchingBlocks={isFetchingBlocks}
        setTotalBlocks={this.props.setTotalBlocks}
        totalBlocks={totalBlocks}
        requestBlocks={this.props.requestBlocks}
        dispatch={dispatch}
      />
    );
  }
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => {
  const actionCreators = bindActionCreators({ requestBlocks, setTotalBlocks }, dispatch);
  return { ...actionCreators, dispatch };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
