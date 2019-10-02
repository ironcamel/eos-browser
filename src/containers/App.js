import React, { Component } from 'react';
import { connect } from 'react-redux';
import { doneBlocks, receivedBlock, requestBlocks, setTotalBlocks } from '../actions';
import EosClient from '../util/eos-client';
import Blockchain from '../components/Blockchain';

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
    console.log(`render ${totalBlocks} blocks`);
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
        <select
          value={totalBlocks}
          onChange={this.setTotalBlocks}
          disabled={isFetchingBlocks}
          className="load"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="25">25</option>
        </select>
        blocks

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
