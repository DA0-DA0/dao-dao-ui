import { QueryObserver } from '@tanstack/react-query'
import { afterEach, expect, test, vi } from 'vitest'

import { TokenType } from '@dao-dao/types'
import { makeDependencyTrackedQueryClient } from '@dao-dao/utils'

vi.mock('@dao-dao/utils', async (original) => ({
  ...(await original<typeof import('@dao-dao/utils')>()),
  MAINNET: true,
}))

import { tokenQueries } from './token'

afterEach(() => vi.unstubAllGlobals())
test('market refresh recomputes active token consumers but leaves metadata alone', async () => {
  const client = makeDependencyTrackedQueryClient()
  const source = {
    chainId: 'cosmoshub-4',
    type: TokenType.Native,
    denomOrAddress: 'uatom',
  }
  const token = { ...source, source, symbol: 'ATOM', decimals: 6 }
  client.queryClient.setQueryData(tokenQueries.info(source).queryKey, token)
  const metadataTime = client.queryClient.getQueryState(
    tokenQueries.info(source).queryKey
  )?.dataUpdatedAt
  const fetcher = vi.fn(async () =>
    Response.json({ price: '2', time: new Date().toISOString() })
  )
  vi.stubGlobal('fetch', fetcher)
  const observer = new QueryObserver(
    client.queryClient,
    tokenQueries.usdPrice(source)
  )
  const stop = observer.subscribe(() => {})
  try {
    expect(
      (await client.fetchQuery(tokenQueries.usdPrice(source))).usdPrice
    ).toBe(2)
    fetcher.mockImplementation(async () =>
      Response.json({
        price: '3',
        time: new Date(Date.now() - 300001).toISOString(),
      })
    )
    await client.invalidateQueries({ queryKey: ['prices'] })
    expect(observer.getCurrentResult().data?.usdPrice).toBeUndefined()
    expect(fetcher).toHaveBeenCalledTimes(2)
    expect(
      client.queryClient.getQueryState(tokenQueries.info(source).queryKey)
        ?.dataUpdatedAt
    ).toBe(metadataTime)
  } finally {
    stop()
    client.queryClient.clear()
  }
})
