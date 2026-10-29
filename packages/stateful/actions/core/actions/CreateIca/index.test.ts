import { expect, test, vi } from 'vitest'

import { Order } from '@dao-dao/types/protobuf/codegen/ibc/core/channel/v1/channel'
import { decodeMessage } from '@dao-dao/utils'

vi.mock('../../../../hooks', () => ({ useQueryLoadingDataWithError: vi.fn() }))
vi.mock('../ManageStorageItems', () => ({ ManageStorageItemsAction: class {} }))

import { CreateIcaAction } from './index'

const action = (fetchQuery: any) =>
  Object.assign(Object.create(CreateIcaAction.prototype), {
    manageStorageItemsAction: { encode: vi.fn(() => ({ custom: 'storage' })) },
    options: {
      address: 'osmo1owner',
      chain: { chainId: 'osmosis-1' },
      queryClient: { fetchQuery },
    },
  }) as CreateIcaAction

test('new ICA keeps requested ordering; an existing closed ordered channel keeps its ordering', async () => {
  for (const existing of [false, true]) {
    const fetchQuery = vi
      .fn()
      .mockResolvedValueOnce(existing ? 'remote' : null)
      .mockResolvedValueOnce({ ordering: Order.ORDER_ORDERED })
    const messages = await action(fetchQuery).encode({
      chainId: 'cosmoshub-4',
      ordering: Order.ORDER_UNORDERED,
    })
    expect(decodeMessage(messages[0])).toMatchObject({
      stargate: {
        value: {
          ordering: existing ? Order.ORDER_ORDERED : Order.ORDER_UNORDERED,
        },
      },
    })
    expect(fetchQuery).toHaveBeenCalledTimes(existing ? 2 : 1)
  }
})

test('existing ICA with missing/failed channel lookup cannot encode optimistically', async () => {
  const missing = vi
    .fn()
    .mockResolvedValueOnce('remote')
    .mockResolvedValueOnce(null)
  await expect(
    action(missing).encode({ chainId: 'cosmoshub-4' })
  ).rejects.toThrow('Cannot verify existing ICA')
  const failed = vi
    .fn()
    .mockResolvedValueOnce('remote')
    .mockRejectedValueOnce(new Error('RPC unavailable'))
  await expect(
    action(failed).encode({ chainId: 'cosmoshub-4' })
  ).rejects.toThrow('RPC unavailable')
})
