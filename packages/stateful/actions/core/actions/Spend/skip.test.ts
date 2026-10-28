import { expect, test, vi } from 'vitest'

import { AccountType } from '@dao-dao/types'
import { ActionContextType } from '@dao-dao/types/actions'
import { decodeMessage } from '@dao-dao/utils'

vi.mock('../../../../components', () => ({ AddressInput: () => null }))
vi.mock('../../../../hooks', () => ({ useQueryLoadingDataWithError: vi.fn() }))
vi.mock('../../../../proposal-module-adapter/react/context', () => ({
  useProposalModuleAdapterCommonContextIfAvailable: vi.fn(),
}))
vi.mock('../../../hooks/useTokenBalances', () => ({
  useTokenBalances: vi.fn(),
}))

import { SpendAction } from './index'

const action = () =>
  Object.assign(Object.create(SpendAction.prototype), {
    options: {
      chain: { chainId: 'osmosis-1' },
      address: 'osmo1source',
      context: {
        type: ActionContextType.Wallet,
        accounts: [
          {
            type: AccountType.Base,
            chainId: 'osmosis-1',
            address: 'osmo1source',
          },
        ],
      },
      queryClient: { fetchQuery: vi.fn(async () => ({ decimals: 6 })) },
    },
  }) as SpendAction
const data = {
  fromChainId: 'osmosis-1',
  toChainId: 'cosmoshub-4',
  from: 'osmo1source',
  to: 'cosmos1dest',
  amount: '2',
  denom: 'uosmo',
  cw20: false,
}

test('automatic provider failure still encodes the existing safe direct single-hop transfer', async () => {
  const msg = await action().encode(
    {
      ...data,
      _skipIbcTransferMsg: {
        loading: false,
        errored: true,
        error: new Error('Skip unavailable'),
      },
    },
    { type: ActionContextType.Wallet }
  )
  expect(
    decodeMessage((Array.isArray(msg) ? msg[0] : msg) as any)
  ).toMatchObject({
    stargate: {
      value: {
        sourcePort: 'transfer',
        sender: 'osmo1source',
        receiver: 'cosmos1dest',
        token: { amount: '2000000', denom: 'uosmo' },
        memo: '',
      },
    },
  })
})

test('a Skip result cannot encode a non-transfer message', async () => {
  await expect(
    action().encode(
      {
        ...data,
        _skipIbcTransferMsg: {
          loading: false,
          errored: false,
          data: {
            msg_type_url: '/bad',
            msg: '{}',
            chain_id: 'osmosis-1',
            path: [],
          },
        },
      },
      { type: ActionContextType.Wallet }
    )
  ).rejects.toThrow('Unexpected Skip transfer message type')
})

test('a successful automatic Skip transfer encodes without signing or broadcasting', async () => {
  const message = await action().encode(
    {
      ...data,
      _skipIbcTransferMsg: {
        loading: false,
        errored: false,
        data: {
          msg_type_url: '/ibc.applications.transfer.v1.MsgTransfer',
          chain_id: 'osmosis-1',
          path: [],
          msg: JSON.stringify({
            source_port: 'transfer',
            source_channel: 'channel-0',
            sender: 'osmo1source',
            receiver: 'cosmos1dest',
            token: { denom: 'uosmo', amount: '2000000' },
            memo: '',
          }),
        },
      },
    },
    { type: ActionContextType.Wallet }
  )
  expect(
    decodeMessage((Array.isArray(message) ? message[0] : message) as any)
  ).toMatchObject({
    stargate: {
      value: {
        sourceChannel: 'channel-0',
        sender: data.from,
        receiver: data.to,
        token: { denom: 'uosmo', amount: '2000000' },
      },
    },
  })
})
