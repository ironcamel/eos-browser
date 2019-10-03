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
    get_info: jest.fn().mockResolvedValue({ head_block_id: 'abc' }),
  };
  const client = new EosClient({ rpc: mockRpc, retryDelay: 0 });
  const info = await client.getInfo();
  expect(info).toEqual({ head_block_id: 'abc' });
});
