import { QueryClient } from '@tanstack/react-query'
import { beforeEach, expect, test, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
  balances: vi.fn(),
  delegations: vi.fn(),
  unbonding: vi.fn(),
  rewards: vi.fn(),
  pool: vi.fn(),
}))
vi.mock('@dao-dao/utils', async (original) => ({
  ...(await original<typeof import('@dao-dao/utils')>()),
  getNativeTokenForChainId: () => ({ denomOrAddress: 'uatom' }),
  cosmosProtoRpcClientRouter: {
    connect: async () => ({
      bank: { v1beta1: { allBalances: mocks.balances } },
      staking: {
        v1beta1: {
          delegatorDelegations: mocks.delegations,
          delegatorUnbondingDelegations: mocks.unbonding,
        },
      },
      distribution: {
        v1beta1: {
          delegationTotalRewards: mocks.rewards,
          communityPool: mocks.pool,
        },
      },
    }),
  },
}))
import { fetchAccountHoldings, sumValuedHoldings } from './treasury'

beforeEach(() => {
  vi.clearAllMocks()
  mocks.balances.mockResolvedValue({ balances: [], pagination: {} })
  mocks.delegations.mockResolvedValue({
    delegationResponses: [],
    pagination: {},
  })
  mocks.unbonding.mockResolvedValue({ unbondingResponses: [], pagination: {} })
  mocks.rewards.mockResolvedValue({ total: [] })
})

test('known empty holdings are zero; unknown nonzero holdings are not', () => {
  expect(sumValuedHoldings([])).toMatchObject({ amount: 0, status: 'complete' })
  expect(sumValuedHoldings([{ raw: '1000000', decimals: 6 }])).toMatchObject({
    amount: null,
    status: 'unavailable',
    unpricedTokens: 1,
  })
})

test('partial aggregation uses decimals and oldest source time, not current time', () => {
  const now = Date.now()
  expect(
    sumValuedHoldings([
      {
        raw: '1000000000000000000',
        decimals: 18,
        usdPrice: 2,
        timestamp: now - 1000,
      },
      { raw: '1000000', decimals: 6 },
      { raw: '1000000', decimals: 6, usdPrice: 0, timestamp: now - 2000 },
    ])
  ).toMatchObject({ amount: 2, status: 'partial', timestamp: now - 2000 })
})

test('expired holdings are unavailable even when an old successful quote is retained', () => {
  expect(
    sumValuedHoldings([
      { raw: '1', decimals: 0, usdPrice: 1, timestamp: Date.now() - 300001 },
    ])
  ).toMatchObject({ amount: null, status: 'unavailable' })
})

test('bank, staking-only, unbonding-only and all reward denominations are retained once', async () => {
  mocks.balances.mockResolvedValue({
    balances: [{ denom: 'uatom', amount: '10' }],
    pagination: {},
  })
  mocks.delegations.mockResolvedValue({
    delegationResponses: [{ balance: { denom: 'ustaked', amount: '20' } }],
    pagination: {},
  })
  mocks.unbonding.mockResolvedValue({
    unbondingResponses: [{ entries: [{ balance: '30' }] }],
    pagination: {},
  })
  mocks.rewards.mockResolvedValue({
    total: [
      { denom: 'ureward', amount: '0.5' },
      { denom: 'uatom', amount: '2' },
    ],
  })
  const result = await fetchAccountHoldings(new QueryClient(), {
    chainId: 'a',
    address: 'addr',
  })
  expect(result.holdings.map((h) => [h.denomOrAddress, h.raw]).sort()).toEqual([
    ['uatom', '42'],
    ['ureward', '0.5'],
    ['ustaked', '20'],
  ])
})

test('community pool preserves fractional minimal units, not governance bank balances', async () => {
  mocks.pool.mockResolvedValue({ pool: [{ denom: 'uatom', amount: '1.25' }] })
  const result = await fetchAccountHoldings(
    new QueryClient(),
    { chainId: 'a', address: 'community-pool' },
    true
  )
  expect(result.holdings[0].raw).toBe('1.25')
  expect(mocks.pool).toHaveBeenCalled()
})

test('RPC failure marks incomplete data rather than a complete empty treasury', async () => {
  mocks.balances.mockRejectedValue(new Error('network down'))
  expect(
    (
      await fetchAccountHoldings(new QueryClient(), {
        chainId: 'a',
        address: 'addr',
      })
    ).incomplete
  ).toBe(true)
})

test('registered CW20 pagination keeps storage keys separate from the contract cursor', async () => {
  const { fetchRegisteredCw20s } = await import('./treasury')
  const q = new QueryClient()
  const seen: any[] = []
  vi.spyOn(q, 'fetchQuery').mockImplementation(
    async (options: any): Promise<any> => {
      seen.push(options.queryKey)
      const text = JSON.stringify(options.queryKey)
      if (text.includes('list_items'))
        return [
          ['cw20:stored', ''],
          ['polytone_cw20:b:remote', ''],
        ]
      if (text.includes('cw20_token_list')) return ['contract-token']
      throw new Error(text)
    }
  )
  expect(
    await fetchRegisteredCw20s(q, { chainId: 'a', coreAddress: 'dao' })
  ).toEqual({ a: ['stored', 'contract-token'], b: ['remote'] })
  expect(
    JSON.stringify(
      seen.find((key) => JSON.stringify(key).includes('cw20_token_list'))
    )
  ).not.toContain('stored')
})

test('valuation account work is deduplicated and bounded', async () => {
  const { mapValuationWork } = await import('./treasury')
  let active = 0
  let max = 0
  const results = await mapValuationWork(
    Array.from({ length: 12 }, (_, i) => i),
    async (i) => {
      max = Math.max(max, ++active)
      await new Promise((r) => setTimeout(r, 1))
      active--
      return i
    }
  )
  expect(max).toBe(4)
  expect(results).toEqual(Array.from({ length: 12 }, (_, i) => i))
})

test('DAO valuation deduplicates accounts, keeps price coverage and uses no legacy service', async () => {
  const { fetchDaoValuation } = await import('./treasury')
  const q = new QueryClient()
  vi.spyOn(q, 'fetchQuery').mockImplementation(
    async (options: any): Promise<any> => {
      const text = JSON.stringify(options.queryKey)
      if (text.includes('"account","list"'))
        return [
          { chainId: 'a', address: 'dao' },
          { chainId: 'a', address: 'dao' },
        ]
      if (text.includes('list_items') || text.includes('cw20_token_list'))
        return []
      if (text.includes('"token","usdPrice"'))
        return { token: { decimals: 6 }, usdPrice: 2, timestamp: new Date() }
      return null
    }
  )
  mocks.balances.mockResolvedValue({
    balances: [{ denom: 'uatom', amount: '1000000' }],
    pagination: {},
  })
  const result = await fetchDaoValuation(q, {
    chainId: 'a',
    coreAddress: 'dao',
  })
  expect(result).toMatchObject({
    amount: 2,
    status: 'partial',
    incompleteBalances: true,
  })
  // Account discovery cannot prove absence of arbitrary unregistered CW20s.
  expect(mocks.balances).toHaveBeenCalledTimes(1)
})

test('fractional minimal-unit rewards keep precision until final valuation conversion', () => {
  expect(
    sumValuedHoldings([
      { raw: '0.5', decimals: 6, usdPrice: 1, timestamp: Date.now() },
    ]).amount
  ).toBe(0.0000005)
})

test('pagination rejects repeated cursors rather than advertising truncated balances', async () => {
  const { collectPages } = await import('./treasury')
  const fetchPage = vi.fn(async () => ({
    items: ['one'],
    nextKey: new Uint8Array([1]),
  }))
  await expect(collectPages(fetchPage)).rejects.toThrow(
    'Repeated valuation pagination'
  )
  expect(fetchPage).toHaveBeenCalledTimes(2)
})

test('non-finite source times are unavailable, not apparently complete estimates', () => {
  expect(
    sumValuedHoldings([{ raw: '1', decimals: 6, usdPrice: 1, timestamp: NaN }])
  ).toMatchObject({ amount: null, status: 'unavailable' })
})
