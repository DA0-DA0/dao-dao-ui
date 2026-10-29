import { snapshot_UNSTABLE } from 'recoil'
import { expect, test, vi } from 'vitest'

import { TokenType } from '@dao-dao/types'
import { makeDependencyTrackedQueryClient } from '@dao-dao/utils'

vi.mock('@dao-dao/utils', async (original) => ({
  ...(await original<typeof import('@dao-dao/utils')>()),
  MAINNET: true,
}))

import { tokenQueries } from '../../query/queries/token'
import { queryClientAtom, refreshUsdPricesAtom } from '../atoms'
import { usdPriceSelector } from './token'

test('Recoil expires retained cache successes and refresh clocks do not touch metadata', async () => {
  const source = {
    chainId: 'cosmoshub-4',
    type: TokenType.Native,
    denomOrAddress: 'uatom',
  }
  const token = { ...source, source, decimals: 6, symbol: 'ATOM' }
  const client = makeDependencyTrackedQueryClient()
  const fetcher = vi.fn()
  vi.stubGlobal('fetch', fetcher)
  const snapshot = (clock: number) =>
    snapshot_UNSTABLE(({ set }) => {
      set(queryClientAtom, client)
      set(refreshUsdPricesAtom, clock)
    })
  client.queryClient.setQueryData(tokenQueries.usdPrice(source).queryKey, {
    token,
    usdPrice: 2,
    timestamp: new Date(Date.now() - 300001),
  })
  expect(
    (await snapshot(0).getPromise(usdPriceSelector(source)))?.usdPrice
  ).toBeUndefined()
  client.queryClient.setQueryData(tokenQueries.usdPrice(source).queryKey, {
    token,
    usdPrice: 0,
    timestamp: new Date(),
  })
  expect(
    (await snapshot(1).getPromise(usdPriceSelector(source)))?.usdPrice
  ).toBe(0)
  expect(fetcher).not.toHaveBeenCalled()
  vi.unstubAllGlobals()
})
