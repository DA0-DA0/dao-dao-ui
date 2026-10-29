import { snapshot_UNSTABLE } from 'recoil'
import { afterEach, expect, test, vi } from 'vitest'

import {
  QueryAllBalancesRequest,
  QueryAllBalancesResponse,
} from '@dao-dao/types/protobuf/codegen/cosmos/bank/v1beta1/query'
import {
  getIbcTransferInfoBetweenChains,
  makeDependencyTrackedQueryClient,
} from '@dao-dao/utils'

import {
  TransferScenario,
  automaticFixtureMemo,
  transferFixtureDao,
  transferFixtureRecipient,
  transferFixtureResponse,
} from '../../tests/helpers/snapperFreeTransfers'
import { queryClientAtom } from '../recoil/atoms'
import { skipRouteMessageSelector } from '../recoil/selectors/skip'

const options = {
  fromChainId: 'juno-1',
  toChainId: 'osmosis-1',
  sourceDenom: 'ujuno',
  amountIn: '2000000',
  chainAddresses: { 'juno-1': transferFixtureDao },
  toAddress: transferFixtureRecipient,
}
afterEach(() => vi.unstubAllGlobals())
const setup = (scenario: TransferScenario) => {
  const client = makeDependencyTrackedQueryClient()
  client.queryClient.setDefaultOptions({ queries: { retry: false } })
  vi.stubGlobal(
    'fetch',
    vi.fn(async (url: string, init?: RequestInit) => {
      const response = transferFixtureResponse(
        new URL(url),
        init?.body ? JSON.parse(String(init.body)) : undefined,
        scenario
      )
      if (!response) throw new Error(`Unexpected fixture request: ${url}`)
      return Response.json(response.body, { status: response.status })
    })
  )
  return snapshot_UNSTABLE(({ set }) => set(queryClientAtom, client))
}

test('automatic browser responses satisfy the actual route/message selector contracts', async () => {
  const message = await setup('automatic').getPromise(
    skipRouteMessageSelector(options)
  )
  expect(message.msg_type_url).toBe('/ibc.applications.transfer.v1.MsgTransfer')
  expect(JSON.parse(message.msg)).toMatchObject({
    sender: transferFixtureDao,
    receiver: transferFixtureRecipient,
    token: { denom: 'ujuno', amount: '2000000' },
    memo: automaticFixtureMemo,
  })
})

test('fixture channels agree with the registry used by the direct fallback', () => {
  expect(getIbcTransferInfoBetweenChains('juno-1', 'osmosis-1')).toMatchObject({
    sourceChannel: 'channel-0',
    destinationChannel: 'channel-42',
  })
})

test('the outage fixture really rejects the route used by the browser', async () => {
  await expect(
    setup('outage').getPromise(skipRouteMessageSelector(options))
  ).rejects.toThrow()
})

test('bank fixtures preserve minimal amounts and do not fulfill other accounts, unknown RPC or writes', () => {
  const rpc = new URL('https://rpc.example.test')
  const body = {
    id: 7,
    method: 'abci_query',
    params: {
      path: '/cosmos.bank.v1beta1.Query/AllBalances',
      data: Buffer.from(
        QueryAllBalancesRequest.encode(
          QueryAllBalancesRequest.fromPartial({ address: transferFixtureDao })
        ).finish()
      ).toString('hex'),
    },
  }
  const response = transferFixtureResponse(rpc, body, 'automatic')?.body as any
  expect(
    QueryAllBalancesResponse.decode(
      Buffer.from(response.result.response.value, 'base64')
    ).balances
  ).toEqual([{ denom: 'ujuno', amount: '5000000' }])
  expect(
    transferFixtureResponse(
      rpc,
      {
        ...body,
        params: {
          ...body.params,
          data: Buffer.from(
            QueryAllBalancesRequest.encode(
              QueryAllBalancesRequest.fromPartial({
                address: transferFixtureRecipient,
              })
            ).finish()
          ).toString('hex'),
        },
      },
      'automatic'
    )
  ).toBeUndefined()
  expect(
    transferFixtureResponse(
      rpc,
      { method: 'broadcast_tx_sync', params: {} },
      'automatic'
    )
  ).toBeUndefined()
  expect(
    transferFixtureResponse(
      rpc,
      { ...body, params: { path: '/unknown' } },
      'automatic'
    )
  ).toBeUndefined()
})
