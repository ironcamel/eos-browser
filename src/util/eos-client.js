import { JsonRpc } from 'eosjs';

class EosClient {
  constructor(args = {}) {
    Object.assign(
      this,
      {
        apiUrl: 'https://api.eosnewyork.io',
        abiCache: {},
        retryDelay: 1000,
        maxRetries: 10,
      },
      args,
    );
    if (!this.rpc) {
      this.rpc = new JsonRpc(this.apiUrl);
    }
  }

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

  getInfo = () => this.retry(() => this.rpc.get_info());

  getBlock = (blockId) => this.retry(() => this.rpc.get_block(blockId));

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
        // console.log(`ERROR !!!!!!!!! retry: ${numRetries}`);
        await this.wait(this.retryDelay);
      }
    }
    return resource;
  };
}

export default EosClient;
