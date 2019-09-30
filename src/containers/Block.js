import React, { Component } from 'react';
import { connect } from 'react-redux';
import Mustache from 'mustache';
import MarkdownIt from 'markdown-it';
import BlockEntry from '../components/BlockEntry';
import EosClient from '../eos-client';
import { receivedDetail, requestDetails } from '../actions';

const md = new MarkdownIt();

const eosClient = new EosClient();

class Block extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetails: false,
    };
  }

  handleClick = () => {
    const { showDetails } = this.state;
    if (!showDetails) {
      this.populateDetails();
    }
    this.setState((state) => ({ showDetails: !state.showDetails }));
  };

  renderContract = (contract, data) => {
    try {
      return md.render(Mustache.render(contract, data));
    } catch (err) {
      console.log('ERROR: failed to render contract');
      console.log(err);
      return '';
    }
  };

  populateDetails = async () => {
    const { block, dispatch } = this.props;
    const { actions, isFetchingDetails } = block;
    if (isFetchingDetails) return;

    dispatch(requestDetails(block.id));
    for (let i = 0; i < actions.length; i++) {
      const action = actions[i];
      if (action.contract) continue;
      const abi = await eosClient.getAbi(action.account);
      const contract = abi.contracts[action.name];
      if (contract) {
        action.contract = this.renderContract(contract, action.data);
        const renderedContract = this.renderContract(contract, action.data);
        dispatch(receivedDetail(block.id, i, renderedContract));
      }
    }
  }

  render() {
    const { block } = this.props;
    const { showDetails } = this.state;
    let key = 0;
    const actionBlocks = block.actions.map((action) => (
      /* eslint react/no-danger: "off" */
      <div className="eos-block" key={++key}>
        <BlockEntry label="action" value={action.name} />
        <BlockEntry label="account" value={action.account} />
        <BlockEntry label="contract" />
        <div dangerouslySetInnerHTML={{ __html: action.contract }} />
      </div>
    ));

    const hideDetailsLink = (
      <button type="button" className="link-button" onClick={this.handleClick}>
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
          <BlockEntry label="actions" value={block.actions.length} onClick={this.handleClick} />
        </div>
        {showDetails && details}
        <hr />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { blocksById, isFetchingDetails } = state;
  const { block } = ownProps;
  return {
    block: blocksById[block.id],
    isFetchingDetails,
  };
};

export default connect(mapStateToProps)(Block);
