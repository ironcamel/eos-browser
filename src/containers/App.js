import React, { Component } from 'react';
import { connect } from 'react-redux';
import { doneBlocks, receivedBlock, requestBlocks } from '../actions';
import EosClient from '../util/eos-client';
import Blockchain from '../components/Blockchain';

const eosClient = new EosClient();

class App extends Component {
  totalBlocks = 10;

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    const { dispatch, isFetchingBlocks } = this.props;
    if (isFetchingBlocks) return;

    let prevBlock;
    dispatch(requestBlocks());
    for (let i = 0; i < this.totalBlocks; i++) {
      const block = prevBlock;
      prevBlock = await eosClient.getPrevBlock(block);
      dispatch(receivedBlock(prevBlock));
    }
    dispatch(doneBlocks());
  }

  render() {
    const { blocks, blocksById } = this.props;
    return (
      <div className="container">
        <h1 className="app-title">EOSIO Blockchain</h1>
        <button type="button" className="button" onClick={this.loadData}>LOAD</button>
        <Blockchain
          blocks={blocks}
          blocksById={blocksById}
          totalBlocks={this.totalBlocks}
          eosClient={eosClient}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { blocks, blocksById, isFetchingBlocks } = state;
  return { blocks, blocksById, isFetchingBlocks };
};

export default connect(mapStateToProps)(App);
