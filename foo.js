const { JsonRpc } = require('eosjs');
const fetch = require('node-fetch');
const api_url = 'https://api.eosnewyork.io';
const rpc = new JsonRpc(api_url, { fetch });

(async () => {

    let id = '04dc0be29e116608856ff7da1de69a39370b78435605505e0010707216ba342e';
    console.log(JSON.stringify(await rpc.get_block(id)));
    process.exit();

    //console.log(await rpc.get_info());
    const { head_block_id, head_block_num } = await rpc.get_info();
    //console.log(head_block_id, head_block_num);
    let block = await rpc.get_block(head_block_id);
    const abi = await rpc.get_abi('eosio.token');
    console.log(JSON.stringify(abi));
    process.exit();
    //console.log(JSON.stringify(block));
    let sum = 0;
    for (let i = 0; i < block.transactions.length; i++) {
    //block.transactions.forEach((t) => {
      const t = block.transactions[i];
      if (typeof t.trx === 'object') {
        const actions = t.trx.transaction.actions;
        sum += actions.length;
        //actions.forEach(async (action) => {
        for (let j = 0; j < actions.length; j++) {
          const action = actions[j];
          console.log(`checking action: ${action.name} account: ${action.account}`);
          const abi = await rpc.get_abi(action.account);
          const abi_action = abi.abi.actions.find((a) => a.name === action.name);
          console.log(abi_action);
        }
      }
    }
    console.log(sum);
    
    /*
    //console.log(block);
    //console.log(block.block_num);
    for (let i = 0; i < 10; i++) {
        block = await rpc.get_block(block.previous);
        console.log(i, block.block_num, block.confirmed);
    }
    //console.log(block);
    */

})();

