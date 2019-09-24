import React, { Component } from 'react'
import { JsonRpc } from 'eosjs';
import Mustache from 'mustache';
import MarkdownIt from 'markdown-it';
const md = new MarkdownIt();

class EosClient {
  api_url = 'https://api.eosnewyork.io';
  rpc = new JsonRpc(this.api_url);
  abiCache = {};
  retryDelay = 1000;
  maxRetries = 10;

  getPrevBlock = async (block) => {
    let blockId;
    if (block) {
      blockId = block.previous;
    } else {
      const { head_block_id } = await this.getInfo();
      blockId = head_block_id;
    }
    let prevBlock = await this.getBlock(blockId);
    prevBlock.actions = [];
    this.processBlock(prevBlock);
    console.log(prevBlock.actions);
    return prevBlock;
  }

  processBlock = (block) => {
    block.actions = [];
    block.transactions.forEach((t) => {
      if (typeof t.trx === 'object') {
        const actions = t.trx.transaction.actions;
        block.actions.push(...actions);
      }
    });
  };

  wait = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  getInfo = async () => {
    return this.retry(async () => this.rpc.get_info());
  };

  getBlock = async (blockId) => {
    return this.retry(async () => this.rpc.get_block(blockId));
  };

  getAbi = async (account) => {
    if (this.abiCache[account]) return this.abiCache[account];
    const abi = await this.retry(async () => this.rpc.get_abi(account));
    abi.contracts = {};
    if (abi.abi) {
      abi.abi.actions.forEach(action => {
        abi.contracts[action.name] = action.ricardian_contract;
      });
    }
    this.abiCache[account] = abi;
    return abi;
  };

  retry = async (fun) => {
    let numRetries = 0;
    let resource;
    while(!resource && numRetries < this.maxRetries) {
      try {
        resource = await fun();
      } catch(err) {
        numRetries++;
        console.log("ERROR !!!!!!!!! retry: " + numRetries);
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

  loadData = async () => {
    let blocks = [];
    this.setState({ blocks });
    for (let i = 0; i < this.totalBlocks; i++) {
      const block = blocks[blocks.length-1];
      const prevBlock = await eosClient.getPrevBlock(block);
      blocks = [...blocks, prevBlock];
      this.setState({ blocks });
    };
  }

  componentDidMount() {
    this.loadData();
  }

  render() {
    const { blocks } = this.state;
    return (
      <div className="container">
        <h1 className="app-title">EOSIO Blockchain Browser</h1>
        <button onClick={this.loadData}>LOAD</button>
        <Blockchain blocks={blocks} totalBlocks={this.totalBlocks} />
      </div>
    )
  }
}

function BlockEntry(props) {
  let value = <span className="eos-value">{props.value}</span>;
  let label = <div className="eos-label">{props.label}:</div>;
  if (props.onClick) {
    value = <a href="#" onClick={props.onClick}>{value}</a>;
    label = <a href="#" onClick={props.onClick}>{label}</a>;
  }
  return <div>{label}{value}</div>;
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

  handleClick = (e) => {
    e.preventDefault();
    if (!this.state.showDetails) {
      this.populateDetails();
    }
    this.setState(state => ({ showDetails: !state.showDetails }));
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
    if (this.state.detailsDownloaded) return;
    const { actions } = this.state;

    for (let i = 0; i < actions.length; i++) {
      const action = actions[i];
      if (action.contract) continue;
      const abi = await eosClient.getAbi(action.account);
      const contract = abi.contracts[action.name];
      if (contract) {
        const newActions = [...this.state.actions];
        newActions[i].contract = this.renderContract(contract, action.data);
        this.setState({ actions: newActions });
      }
    }
    this.setState({ detailsDownloaded: true });
  }

  render() {
    const { block } = this.props;
    const { showDetails } = this.state;
    let key = 0;
    const actions = this.state.actions.map(action => (
        <div className="eos-block" key={key++} >
          <BlockEntry label="action"  value={action.name} />
          <BlockEntry label="account" value={action.account} />
          <BlockEntry label="contract" />
          <div dangerouslySetInnerHTML={{__html:action.contract}} />
        </div>
    ));

    const hideDetailsLink = (
      <a href="#" onClick={this.handleClick}>hide actions</a>
    );

    const details = (
      <div className="eos-details">
        {hideDetailsLink}
        {actions}
        {hideDetailsLink}
      </div>
    );

    return (
      <div>
        <div className="eos-block">
          <BlockEntry label="hash"      value={block.id} />
          <BlockEntry label="timestamp" value={block.timestamp} />
          <BlockEntry label="actions"   value={block.actions.length} onClick={this.handleClick} />
        </div>
        {showDetails && details}
        <hr/>
      </div>
    );
  }
}

class Blockchain extends Component {

  isLoading = (rows) => {
    return rows.length < this.props.totalBlocks;
  }

  render() {
    const { blocks } = this.props;
    const rows = blocks.map(block => (
      <Block block={block} key={block.id} />
    ));

    const spinner = (
      <div className="spinner-container">
        <img className="spinner" src="spinner.gif" />
      </div>
    );

    return (
      <div>
        <hr/>
        <div className="eos-blockchain">
          {rows}
        </div>
        {this.isLoading(rows) && spinner}
      </div>
    );
  }

}

export default App;
