import EosClient from './eos-client';
import { JsonRpc } from 'eosjs';

test('getAbi creates contracts object properly', async () => {
  const abiResponse = {
    account_name: "eosio.token",
    abi: {
      actions: [
        {
          name: "close",
          type: "close",
          ricardian_contract: "foo",
        },
        {
          name: "create",
          type: "create",
          ricardian_contract: "bar",
        },
      ]
    },
  };
  const mockRpc = {
    get_abi: jest.fn().mockReturnValue(abiResponse),
  };
  const client = new EosClient({ rpc: mockRpc, retryDelay: 0 });
  const abi = await client.getAbi();
  expect(abi.contracts).toEqual({ close: 'foo', create: 'bar' });
});
