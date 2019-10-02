import React, { Component } from 'react';
import { connect } from 'react-redux';
import { doneBlocks, receivedBlock, requestBlocks, setTotalBlocks } from '../actions';
import EosClient from '../util/eos-client';
import AppView from '../components/AppView';

const eosClient = new EosClient();

class App extends Component {
  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.totalBlocks !== this.props.totalBlocks) {
      this.loadData();
    }
  }

  loadData = async () => {
    const { dispatch, isFetchingBlocks, totalBlocks } = this.props;
    if (isFetchingBlocks) return;

    let prevBlock;
    dispatch(requestBlocks());
    for (let i = 0; i < totalBlocks; i++) {
      const block = prevBlock;
      prevBlock = await eosClient.getPrevBlock(block);
      dispatch(receivedBlock(prevBlock));
    }
    dispatch(doneBlocks());
  };

  setTotalBlocks = (event) => {
    const { dispatch } = this.props;
    dispatch(setTotalBlocks(event.target.value));
  };

  render() {
    const { blocks, blocksById, totalBlocks, isFetchingBlocks } = this.props;
    return (
      <AppView
        blocks={blocks}
        blocksById={blocksById}
        eosClient={eosClient}
        isFetchingBlocks={isFetchingBlocks}
        loadData={this.loadData}
        setTotalBlocks={this.setTotalBlocks}
        totalBlocks={totalBlocks}
      />
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(App);
