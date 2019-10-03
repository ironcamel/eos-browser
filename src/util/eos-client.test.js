import EosClient from './eos-client';

test('getAbi creates action => contract mapping properly', async () => {
  const abiResponse = {
    account_name: 'eosio.token',
    abi: {
      actions: [
        {
          name: 'close',
          type: 'close',
          ricardian_contract: 'foo',
        },
        {
          name: 'create',
          type: 'create',
          ricardian_contract: 'bar',
        },
      ],
    },
  };
  const mockRpc = {
    get_abi: jest.fn().mockReturnValue(abiResponse),
  };
  const client = new EosClient({ rpc: mockRpc, retryDelay: 0 });
  const abi = await client.getAbi();
  expect(abi.contracts).toEqual({ close: 'foo', create: 'bar' });
});

test('getInfo', async () => {
  const mockRpc = {
    get_info: jest.fn().mockReturnValue({ head_block_id: 'id100' }),
  };
  const client = new EosClient({ rpc: mockRpc, retryDelay: 0 });
  const info = await client.getInfo();
  expect(info).toEqual({ head_block_id: 'id100' });
});

test('getBlock', async () => {
  const mockRpc = {
    get_block: jest.fn().mockReturnValue({ id: 'id101' }),
  };
  const client = new EosClient({ rpc: mockRpc, retryDelay: 0 });
  const block = await client.getBlock();
  expect(block).toEqual({ id: 'id101' });
});

test('getPrevBlock with no arguments returns the head block', async () => {
  const mockRpc = {
    get_info: jest.fn().mockResolvedValue({ head_block_id: 'abc' }),
    get_block: jest.fn().mockImplementation((blockId) => ({
      id: blockId,
      transactions: [],
    })),
  };
  const client = new EosClient({ rpc: mockRpc, retryDelay: 0, maxRetries: 0 });
  const block = await client.getPrevBlock();
  expect(block).toEqual({
    id: 'abc',
    actions: [],
    transactions: [],
  });
});

test('getPrevBlock the block preceding the given block', async () => {
  const mockRpc = {
    get_block: jest.fn().mockImplementation((blockId) => ({
      id: blockId,
      transactions: [],
    })),
  };
  const client = new EosClient({ rpc: mockRpc, retryDelay: 0, maxRetries: 0 });
  const block = await client.getPrevBlock({ id: 'id101', previous: 'id100' });
  expect(block).toEqual({
    id: 'id100',
    actions: [],
    transactions: [],
  });
});

test('getPrevBlock transforms and actions array to the block', async () => {
  const transactions = [
    {
      trx: {
        transaction: {
          actions: [{ account: 'eosio.token', name: 'transfer' }],
        }
      }
    },
    {
      trx: {
        transaction: {
          actions: [{ account: 'eosio.token', name: 'create' }],
        }
      }
    },
  ];
  const mockRpc = {
    get_block: jest.fn().mockImplementation((blockId) => ({
      id: blockId,
      transactions,
    })),
  };
  const client = new EosClient({ rpc: mockRpc, retryDelay: 0, maxRetries: 0 });
  const block = await client.getPrevBlock({ id: 'id101', previous: 'id100' });
  expect(block).toEqual({
    id: 'id100',
    actions: [
      { account: 'eosio.token', name: 'transfer' },
      { account: 'eosio.token', name: 'create' },
    ],
    transactions,
  });
});

test('maxRetries', async () => {
  const mockRpc = {
    get_info: jest.fn().mockImplementation(() => { throw 'oops' }),
  };
  const client = new EosClient({ rpc: mockRpc, retryDelay: 0, maxRetries: 2 });
  const block = await client.getInfo();
  expect(mockRpc.get_info.mock.calls).toHaveLength(3); // should be maxRetries + 1
});

