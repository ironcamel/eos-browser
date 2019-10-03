import React from 'react';
import Blockchain from './Blockchain';

function AppView(props) {
  const {
    blocks,
    blocksById,
    eosClient,
    isFetchingBlocks,
    setTotalBlocks,
    totalBlocks,
    requestBlocks,
    dispatch,
  } = props;

  return (
    <div className="container">
      <h1 className="app-title">EOSIO Blockchain</h1>
      <button
        type="button"
        className="button"
        onClick={() => requestBlocks({ ...props, dispatch })}
        disabled={isFetchingBlocks}
      >
        LOAD
      </button>
      <select
        value={totalBlocks}
        onChange={(e) => setTotalBlocks(parseInt(e.target.value, 10))}
        disabled={isFetchingBlocks}
        className="load"
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
        <option value="25">25</option>
      </select>
      blocks

      <Blockchain
        blocks={blocks}
        blocksById={blocksById}
        eosClient={eosClient}
        isFetchingBlocks={isFetchingBlocks}
      />

    </div>
  );
}

export default AppView;
