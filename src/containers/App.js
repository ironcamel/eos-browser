import React, { Component } from 'react';
import { connect } from 'react-redux';
import { doneBlocks, receivedBlock, requestBlocks } from '../actions';
import EosClient from '../util/eos-client';
import Blockchain from '../components/Blockchain';

const eosClient = new EosClient();

class App extends Component {
  componentDidMount() {
    this.loadData();
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
  }

  render() {
    const { blocks, blocksById, totalBlocks, isFetchingBlocks } = this.props;
    return (
      <div className="container">
        <h1 className="app-title">EOSIO Blockchain</h1>
        <button
          type="button"
          className="button"
          onClick={this.loadData}
          disabled={isFetchingBlocks}
        >
          LOAD
        </button>
        <Blockchain
          blocks={blocks}
          blocksById={blocksById}
          totalBlocks={totalBlocks}
          eosClient={eosClient}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(App);
