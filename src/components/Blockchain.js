import React from 'react';
import Block from '../containers/Block';

function Blockchain({ blocks, blocksById, totalBlocks }) {
  const isLoading = blocks.length < totalBlocks;
  const rows = blocks.map((id) => (
    <Block block={blocksById[id]} key={id} />
  ));

  const spinner = (
    <div className="spinner-container">
      <img alt="spinner" className="spinner" src="spinner.gif" />
    </div>
  );

  return (
    <div className="eos-blockchain">
      <hr />
      <div>
        {rows}
      </div>
      {isLoading && spinner}
    </div>
  );
}

export default Blockchain;
