import { QueryObserver } from '@tanstack/react-query'
import { afterEach, expect, test, vi } from 'vitest'

import { tokenQueries } from '@dao-dao/state/query'
import { TokenType } from '@dao-dao/types'
import { makeDependencyTrackedQueryClient } from '@dao-dao/utils'

const hooks = vi.hoisted(() => ({
  client: null as any,
  cleanups: [] as (() => void)[],
}))
// Invoke the two real mounted effects together without rendering wallet/layout UI.
vi.mock('react', async (original) => ({
  ...(await original<typeof import('react')>()),
  useEffect: (effect: () => () => void) => hooks.cleanups.push(effect()),
}))
vi.mock('recoil', async (original) => ({
  ...(await original<typeof import('recoil')>()),
  useSetRecoilState: () => vi.fn(),
}))
vi.mock('@dao-dao/stateless', () => ({
  useDependencyTrackedQueryClient: () => hooks.client,
}))
vi.mock('@dao-dao/utils', async (original) => ({
  ...(await original<typeof import('@dao-dao/utils')>()),
  MAINNET: true,
}))

import { useAutoRefreshData } from './useAutoRefreshData'
import { useRefreshUsdPrices } from './useRefreshUsdPrices'

afterEach(() => {
  hooks.cleanups.splice(0).forEach((stop) => stop())
  hooks.client?.queryClient.clear()
  vi.useRealTimers()
  vi.unstubAllGlobals()
})

test('layout and StateProvider schedules keep hidden/inactive prices quiet and refresh active quotes without metadata', async () => {
  vi.useFakeTimers()
  hooks.client = makeDependencyTrackedQueryClient()
  const source = {
    chainId: 'cosmoshub-4',
    type: TokenType.Native,
    denomOrAddress: 'uatom',
  }
  const asset = {
    chain_id: source.chainId,
    denom: 'uatom',
    origin_chain_id: source.chainId,
    origin_denom: 'uatom',
    is_cw20: false,
    decimals: 6,
  }
  let price = '2'
  const fetcher = vi.fn(async (url: string) =>
    Response.json(
      url.includes('/assets?')
        ? { chain_to_assets_map: { [source.chainId]: { assets: [asset] } } }
        : { price, time: new Date().toISOString() }
    )
  )
  vi.stubGlobal('fetch', fetcher)
  const doc = Object.assign(new EventTarget(), { visibilityState: 'hidden' })
  vi.stubGlobal('window', new EventTarget())
  vi.stubGlobal('document', doc)
  expect(
    (await hooks.client.fetchQuery(tokenQueries.usdPrice(source))).usdPrice
  ).toBe(2)
  expect(fetcher).toHaveBeenCalledTimes(2)
  useAutoRefreshData()
  useRefreshUsdPrices()
  await vi.advanceTimersByTimeAsync(61_000)
  expect(fetcher).toHaveBeenCalledTimes(2)
  // Visible but inactive queries are only marked stale, never eagerly fetched.
  doc.visibilityState = 'visible'
  doc.dispatchEvent(new Event('visibilitychange'))
  await vi.advanceTimersByTimeAsync(1)
  expect(fetcher).toHaveBeenCalledTimes(2)
  const observer = new QueryObserver(
    hooks.client.queryClient,
    tokenQueries.usdPrice(source)
  )
  const stop = observer.subscribe(() => {})
  try {
    await vi.advanceTimersByTimeAsync(1000)
    expect(observer.getCurrentResult().data?.usdPrice).toBe(2)
    price = '3'
    window.dispatchEvent(new Event('focus'))
    await vi.advanceTimersByTimeAsync(1000)
    expect(observer.getCurrentResult().data?.usdPrice).toBe(3)
    expect(
      fetcher.mock.calls.filter(([url]) => url.includes('/assets?'))
    ).toHaveLength(1)
  } finally {
    stop()
  }
})
