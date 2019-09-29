import React, { Component } from 'react';
import { JsonRpc } from 'eosjs';
import Mustache from 'mustache';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt();

class EosClient {
  apiUrl = 'https://api.eosnewyork.io';

  rpc = new JsonRpc(this.apiUrl);

  abiCache = {};

  retryDelay = 1000;

  maxRetries = 10;

  getPrevBlock = async (block) => {
    let blockId;
    if (block) {
      blockId = block.previous;
    } else {
      const info = await this.getInfo();
      blockId = info.head_block_id;
    }
    const prevBlock = await this.getBlock(blockId);
    prevBlock.actions = [];
    this.processBlock(prevBlock);
    return prevBlock;
  }

  processBlock = (block) => {
    block.actions = [];
    block.transactions.forEach((t) => {
      if (typeof t.trx === 'object') {
        const { actions } = t.trx.transaction;
        block.actions.push(...actions);
      }
    });
  };

  wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  getInfo = async () => this.retry(() => this.rpc.get_info());

  getBlock = async (blockId) => this.retry(() => this.rpc.get_block(blockId));

  getAbi = async (account) => {
    if (this.abiCache[account]) return this.abiCache[account];
    const abi = await this.retry(async () => this.rpc.get_abi(account));
    abi.contracts = {};
    if (abi.abi) {
      abi.abi.actions.forEach((action) => {
        abi.contracts[action.name] = action.ricardian_contract;
      });
    }
    this.abiCache[account] = abi;
    return abi;
  };

  retry = async (fun) => {
    let numRetries = 0;
    let resource;
    while (!resource && numRetries < this.maxRetries) {
      try {
        resource = await fun();
      } catch (err) {
        numRetries++;
        console.log(`ERROR !!!!!!!!! retry: ${numRetries}`);
        await this.wait(this.retryDelay);
      }
    }
    return resource;
  };
}

const eosClient = new EosClient();

class App extends Component {
  state = {
    blocks: [],
  };

  totalBlocks = 10;

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    let blocks = [];
    this.setState({ blocks });
    for (let i = 0; i < this.totalBlocks; i++) {
      const block = blocks[blocks.length - 1];
      const prevBlock = await eosClient.getPrevBlock(block);
      blocks = [...blocks, prevBlock];
      this.setState({ blocks });
    }
  }

  render() {
    const { blocks } = this.state;
    return (
      <div className="container">
        <h1 className="app-title">EOSIO Blockchain Browser</h1>
        <button type="button" className="button" onClick={this.loadData}>LOAD</button>
        <Blockchain blocks={blocks} totalBlocks={this.totalBlocks} />
      </div>
    );
  }
}

function BlockEntry(props) {
  const { label, value, onClick } = props;
  let labelSpan = (
    <span className="eos-label">
      {label}
      :
    </span>
  );
  let valueSpan = (
    <span className="eos-value">
      {value}
    </span>
  );
  if (onClick) {
    labelSpan = (
      <button type="button" className="link-button" onClick={onClick}>
        {labelSpan}
      </button>
    );
    valueSpan = (
      <button type="button" className="link-button" onClick={onClick}>
        {valueSpan}
      </button>
    );
  }
  return (
    <div>
      <div className="eos-label">{labelSpan}</div>
      {valueSpan}
    </div>
  );
}

class Block extends Component {
  constructor(props) {
    super(props);
    const { block } = this.props;
    this.state = {
      actions: block.actions,
      showDetails: false,
      detailsDownloaded: false,
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
    const { actions, detailsDownloaded } = this.state;
    if (detailsDownloaded) return;

    for (let i = 0; i < actions.length; i++) {
      const action = actions[i];
      if (action.contract) continue;
      const abi = await eosClient.getAbi(action.account);
      const contract = abi.contracts[action.name];
      if (contract) {
        const newActions = [...actions];
        newActions[i].contract = this.renderContract(contract, action.data);
        this.setState({ actions: newActions });
      }
    }
    this.setState({ detailsDownloaded: true });
  }

  render() {
    const { block } = this.props;
    const { actions, showDetails } = this.state;
    let key = 0;
    /* eslint react/no-danger: "off" */
    const actionBlocks = actions.map((action) => (
      <div className="eos-block" key={key++}>
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

class Blockchain extends Component {
  isLoading = (rows) => {
    const { totalBlocks } = this.props;
    return rows.length < totalBlocks;
  }

  render() {
    const { blocks } = this.props;
    const rows = blocks.map((block) => (
      <Block block={block} key={block.id} />
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
        {this.isLoading(rows) && spinner}
      </div>
    );
  }
}

export default App;
