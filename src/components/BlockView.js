import React from 'react';
import BlockEntry from './BlockEntry';

function BlockView(props) {
  const { block, onClick } = props;

  let key = 0;
  const actionBlocks = block.actions.map((action) => (
    /* eslint react/no-danger: "off" */
    <div className="eos-block" key={++key}>
      <BlockEntry label="action" value={action.name} />
      <BlockEntry label="account" value={action.account} />
      <BlockEntry label="contract" />
      <div className="contract" dangerouslySetInnerHTML={{ __html: action.contract }} />
    </div>
  ));

  const hideDetailsLink = (
    <button type="button" className="link-button" onClick={() => onClick(block)}>
      hide actions
    </button>
  );

  const details = (
    <div className="eos-details">
      {hideDetailsLink}
      {actionBlocks}
      {hideDetailsLink}
    </div>
  );

  return (
    <div>
      <div className="eos-block">
        <BlockEntry label="hash" value={block.id} />
        <BlockEntry label="timestamp" value={block.timestamp} />
        <BlockEntry label="actions" value={block.actions.length} onClick={() => onClick(block)} />
      </div>
      {block.showDetails && details}
      <hr />
    </div>
  );
}

export default BlockView;
