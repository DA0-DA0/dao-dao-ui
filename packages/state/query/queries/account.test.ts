import { QueryClient } from '@tanstack/react-query'
import { beforeEach, expect, test, vi } from 'vitest'

const mocks = vi.hoisted(() => ({ channels: vi.fn(), address: vi.fn() }))
vi.mock('@dao-dao/utils', async (original) => ({
  ...(await original<typeof import('@dao-dao/utils')>()),
  getIbcTransferInfoBetweenChains: () => ({
    sourceChain: { connection_id: 'connection-1' },
  }),
  ibcProtoRpcClientRouter: {
    connect: async () => ({
      core: { channel: { v1: { connectionChannels: mocks.channels } } },
      applications: {
        interchain_accounts: {
          controller: { v1: { interchainAccount: mocks.address } },
        },
      },
    }),
  },
}))
import { accountQueries } from './account'
const options = { srcChainId: 'a', destChainId: 'b', address: 'owner' }
const q = () =>
  new QueryClient({ defaultOptions: { queries: { retry: false } } })
beforeEach(() => vi.clearAllMocks())

test('reads address directly; recognized missing is null, RPC failure rejects', async () => {
  const fetcher = vi.fn()
  vi.stubGlobal('fetch', fetcher)
  mocks.address
    .mockResolvedValueOnce({ address: 'remote' })
    .mockRejectedValueOnce(new Error('key not found'))
    .mockRejectedValueOnce(new Error('network down'))
  expect(await q().fetchQuery(accountQueries.remoteIcaAddress(options))).toBe(
    'remote'
  )
  expect(
    await q().fetchQuery(accountQueries.remoteIcaAddress(options))
  ).toBeNull()
  await expect(
    q().fetchQuery(accountQueries.remoteIcaAddress(options))
  ).rejects.toThrow('network down')
  expect(fetcher).not.toHaveBeenCalled()
  vi.unstubAllGlobals()
})

test('paginates and finds closed controller channels, ignoring other owners/connections', async () => {
  mocks.channels
    .mockResolvedValueOnce({
      channels: [
        {
          portId: 'icacontroller-other',
          connectionHops: ['connection-1'],
          ordering: 1,
        },
      ],
      pagination: { nextKey: new Uint8Array([1]) },
    })
    .mockResolvedValueOnce({
      channels: [
        {
          portId: 'icacontroller-owner',
          connectionHops: ['connection-other'],
          ordering: 1,
        },
        {
          portId: 'icacontroller-owner',
          connectionHops: ['connection-1'],
          ordering: 2,
          state: 4,
        },
      ],
      pagination: { nextKey: new Uint8Array() },
    })
  expect(
    (await q().fetchQuery(accountQueries.icaChannel(options)))?.ordering
  ).toBe(2)
  expect(mocks.channels).toHaveBeenCalledTimes(2)
})

test('conflicting ordering and repeated pagination fail closed', async () => {
  mocks.channels.mockResolvedValue({
    channels: [1, 2].map((ordering) => ({
      portId: 'icacontroller-owner',
      connectionHops: ['connection-1'],
      ordering,
    })),
    pagination: {},
  })
  await expect(
    q().fetchQuery(accountQueries.icaChannel(options))
  ).rejects.toThrow('ordering')
  mocks.channels.mockResolvedValue({
    channels: [],
    pagination: { nextKey: new Uint8Array([1]) },
  })
  await expect(
    q().fetchQuery(accountQueries.icaChannel(options))
  ).rejects.toThrow('pagination')
})
