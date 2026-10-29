import { QueryClient } from '@tanstack/react-query'
import { expect, test, vi } from 'vitest'

import { daoQueries } from './dao'

test('featured list is stable local configuration with the existing 14 ordered entries', async () => {
  const fetcher = vi.fn()
  vi.stubGlobal('fetch', fetcher)
  const list = await new QueryClient().fetchQuery(daoQueries.listFeatured())
  expect(list).toHaveLength(14)
  expect(list[0]).toEqual({
    chainId: 'juno-1',
    coreAddress:
      'juno10h0hc64jv006rr8qy0zhlu4jsxct8qwa0vtaleayh0ujz0zynf2s2r7v8q',
  })
  expect(list[13].chainId).toBe('osmosis-1')
  expect(new Set(list.map((d) => d.chainId + d.coreAddress)).size).toBe(14)
  expect(fetcher).not.toHaveBeenCalled()
  vi.unstubAllGlobals()
})
