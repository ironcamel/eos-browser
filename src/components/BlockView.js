import React, { Component } from 'react';
import BlockEntry from './BlockEntry';

class BlockView extends Component {
  componentDidUpdate(prevProps) {
    const { dispatch, block, eosClient, requestDetails } = this.props;
    const prevShowDetails = prevProps.block.showDetails;
    const { showDetails } = this.props.block;
    if ((prevShowDetails !== showDetails) && showDetails) {
      requestDetails(dispatch, block, eosClient);
    }
  }

  render() {
    const { block, toggleDetails } = this.props;

    let key = 0;
    const actionBlocks = block.actions.map((action) => (
      <div className="eos-block" key={++key}>
        <BlockEntry label="action" value={action.name} />
        <BlockEntry label="account" value={action.account} />
        <BlockEntry label="contract" />
        <div className="contract" dangerouslySetInnerHTML={{ __html: action.contract }} />
      </div>
    ));

    const hideDetailsLink = (
      <button type="button" className="link-button" onClick={() => toggleDetails(block.id)}>
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
          <BlockEntry
            label="actions"
            value={block.actions.length}
            onClick={() => toggleDetails(block.id)}
          />
        </div>
        {block.showDetails && details}
        <hr />
      </div>
    );
  }
}

export default BlockView;
