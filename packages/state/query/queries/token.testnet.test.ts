import { QueryClient } from '@tanstack/react-query'
import { afterEach, expect, test, vi } from 'vitest'

import { TokenType } from '@dao-dao/types'

vi.mock('@dao-dao/utils', async (original) => ({
  ...(await original<typeof import('@dao-dao/utils')>()),
  MAINNET: false,
}))

import { tokenQueries } from './token'

afterEach(() => vi.unstubAllGlobals())
test('testnet makes no market request even if metadata refers to a canonical mainnet source', async () => {
  const q = new QueryClient({
    defaultOptions: { queries: { staleTime: Infinity } },
  })
  const source = {
    chainId: 'cosmoshub-4',
    type: TokenType.Native,
    denomOrAddress: 'uatom',
  }
  const token = { ...source, source, decimals: 6, symbol: 'ATOM' }
  q.setQueryData(tokenQueries.info(source).queryKey, token)
  const fetcher = vi.fn()
  vi.stubGlobal('fetch', fetcher)
  expect(await q.fetchQuery(tokenQueries.usdPrice(source))).toEqual({ token })
  expect(fetcher).not.toHaveBeenCalled()
})
