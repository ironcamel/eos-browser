import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import AppView from '../components/AppView';

class App extends Component {
  componentDidMount() {
    const { requestBlocks } = this.props;
    requestBlocks(this.props);
  }

  componentDidUpdate(prevProps) {
    const { requestBlocks } = this.props;
    if (prevProps.totalBlocks !== this.props.totalBlocks) {
      requestBlocks(this.props);
    }
  }

  render() {
    const {
      blocks,
      blocksById,
      totalBlocks,
      isFetchingBlocks,
      eosClient,
      setTotalBlocks,
      requestBlocks,
      dispatch,
    } = this.props;

    return (
      <AppView
        blocks={blocks}
        blocksById={blocksById}
        eosClient={eosClient}
        isFetchingBlocks={isFetchingBlocks}
        loadData={this.loadData}
        requestBlocks={requestBlocks}
        setTotalBlocks={setTotalBlocks}
        totalBlocks={totalBlocks}
        dispatch={dispatch}
      />
    );
  }
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => {
  const actionCreators = bindActionCreators(
    {
      requestBlocks: actions.requestBlocks,
      setTotalBlocks: actions.setTotalBlocks,
    },
    dispatch,
  );
  return { ...actionCreators, dispatch };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
