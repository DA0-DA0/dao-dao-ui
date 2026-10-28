import { toHex } from '@cosmjs/encoding'
import { QueryClient } from '@tanstack/react-query'

import { HugeDecimal } from '@dao-dao/math'
import {
  Account,
  ChainId,
  DaoSource,
  GenericTokenSource,
  TokenType,
  UsdValuation,
} from '@dao-dao/types'
import {
  COMMUNITY_POOL_ADDRESS_PLACEHOLDER,
  chainIsIndexed,
  CW20_ITEM_KEY_PREFIX,
  POLYTONE_CW20_ITEM_KEY_PREFIX,
  cosmosProtoRpcClientRouter,
  getNativeTokenForChainId,
  isNonexistentQueryError,
} from '@dao-dao/utils'

import { stargazeIndexerClient } from '../../graphql/stargaze/client'
import { stargazeWalletTotalValueUsdQuery } from '../../graphql/stargaze/queries/wallet'
import { accountQueries } from './account'
import { tokenQueries } from './token'
import { indexerQueries } from './indexer'
import { cw20BaseQueries } from './contracts/Cw20Base'
import { daoDaoCoreQueries } from './contracts/DaoDaoCore'

export type Holding = GenericTokenSource & { raw: string }
export type ValuedHolding = {
  raw: string
  decimals: number
  usdPrice?: number
  timestamp?: number
}

export const sumValuedHoldings = (
  holdings: ValuedHolding[],
  incompleteBalances = false
): UsdValuation => {
  let amount = HugeDecimal.zero
  let priced = 0
  let unpricedTokens = 0
  let timestamp: number | null = null
  for (const holding of holdings) {
    if (HugeDecimal.from(holding.raw).isZero()) continue
    if (
      holding.usdPrice === undefined ||
      !Number.isFinite(holding.usdPrice) ||
      holding.usdPrice < 0 ||
      holding.timestamp === undefined ||
      Date.now() - holding.timestamp > 300_000 ||
      holding.timestamp - Date.now() > 30_000
    ) {
      unpricedTokens++
      continue
    }
    amount = amount.plus(
      HugeDecimal.from(holding.raw).toUsdValue(
        holding.decimals,
        holding.usdPrice
      )
    )
    timestamp =
      timestamp === null
        ? holding.timestamp
        : Math.min(timestamp, holding.timestamp)
    priced++
  }
  const unknown = unpricedTokens > 0 || incompleteBalances
  const value = amount.toNumber()
  return {
    amount: (!unknown || priced > 0) && Number.isFinite(value) ? value : null,
    status: unknown ? (priced > 0 ? 'partial' : 'unavailable') : 'complete',
    timestamp,
    unpricedTokens,
    incompleteBalances,
  }
}

/** Finite pagination, shared by valuation only (never truncates transaction UI). */
export const collectPages = async <T>(
  fetchPage: (key: Uint8Array) => Promise<{ items: T[]; nextKey?: Uint8Array }>
): Promise<T[]> => {
  let key = new Uint8Array()
  const seen = new Set<string>()
  const items: T[] = []
  for (let page = 0; page < 50; page++) {
    const result = await fetchPage(key)
    items.push(...result.items)
    key = new Uint8Array(result.nextKey || [])
    if (!key.length) return items
    const cursor = toHex(key)
    if (seen.has(cursor)) throw new Error('Repeated valuation pagination')
    seen.add(cursor)
  }
  throw new Error('Valuation pagination budget exceeded')
}

export const mapValuationWork = async <T, R>(
  items: T[],
  work: (item: T) => Promise<R>
): Promise<R[]> => {
  const results: R[] = new Array(items.length)
  let next = 0
  await Promise.all(
    Array.from({ length: Math.min(4, items.length) }, async () => {
      while (next < items.length) {
        const index = next++
        results[index] = await work(items[index])
      }
    })
  )
  return results
}

const pagination = (key: Uint8Array) => ({
  key,
  limit: 100n,
  offset: 0n,
  countTotal: false,
  reverse: false,
})

/** Current bank + delegation + unbonding + all reward denoms. Reward totals are
 * added once, not both per-validator and total. DecCoin fractions are retained.
 */
export const fetchAccountHoldings = async (
  _queryClient: QueryClient,
  { chainId, address }: { chainId: string; address: string },
  communityPool = false
): Promise<{ holdings: Holding[]; incomplete: boolean }> => {
  const client = await cosmosProtoRpcClientRouter.connect(chainId)
  const amounts = new Map<string, HugeDecimal>()
  let incomplete = false
  const add = ({ denom, amount }: { denom: string; amount: string }) => {
    if (!denom || !/^\d+(\.\d+)?$/.test(amount))
      throw new Error('Invalid balance')
    amounts.set(denom, (amounts.get(denom) || HugeDecimal.zero).plus(amount))
  }
  if (communityPool) {
    try {
      ;(await client.distribution.v1beta1.communityPool()).pool.forEach(add)
    } catch {
      incomplete = true
    }
  } else {
    try {
      const coins = await collectPages(async (key) => {
        const r = await client.bank.v1beta1.allBalances({
          address,
          resolveDenom: false,
          pagination: pagination(key),
        })
        return { items: r.balances, nextKey: r.pagination?.nextKey }
      })
      coins.forEach(add)
    } catch {
      incomplete = true
    }
    const staking = async (work: () => Promise<void>) => {
      try {
        await work()
      } catch (error) {
        if (!isNonexistentQueryError(error)) incomplete = true
      }
    }
    await staking(async () => {
      const entries = await collectPages(async (key) => {
        const r = await client.staking.v1beta1.delegatorDelegations({
          delegatorAddr: address,
          pagination: pagination(key),
        })
        return { items: r.delegationResponses, nextKey: r.pagination?.nextKey }
      })
      entries.forEach(({ balance }) => balance && add(balance))
    })
    await staking(async () => {
      const entries = await collectPages(async (key) => {
        const r = await client.staking.v1beta1.delegatorUnbondingDelegations({
          delegatorAddr: address,
          pagination: pagination(key),
        })
        return { items: r.unbondingResponses, nextKey: r.pagination?.nextKey }
      })
      entries.forEach(({ entries }) =>
        entries.forEach(({ balance }) =>
          add({
            denom: getNativeTokenForChainId(chainId).denomOrAddress,
            amount: balance,
          })
        )
      )
    })
    await staking(async () =>
      (
        await client.distribution.v1beta1.delegationTotalRewards({
          delegatorAddress: address,
        })
      ).total.forEach(add)
    )
  }
  return {
    holdings: [...amounts]
      .filter(([, amount]) => !amount.isZero())
      .map(([denomOrAddress, raw]) => ({
        chainId,
        type: TokenType.Native,
        denomOrAddress,
        raw: raw.toString(),
      })),
    incomplete,
  }
}

/** Registered lists use their own cursors, never a custom storage address. */
export const fetchRegisteredCw20s = async (
  queryClient: QueryClient,
  { chainId, coreAddress }: DaoSource
): Promise<Record<string, string[]>> => {
  const tokens: Record<string, string[]> = { [chainId]: [] }
  const paginate = async <T>(
    work: (startAfter?: string) => Promise<T[]>,
    cursor: (entry: T) => string
  ): Promise<T[]> => {
    const all: T[] = []
    const seen = new Set<string>()
    let startAfter: string | undefined
    for (let page = 0; page < 50; page++) {
      const result = await work(startAfter)
      all.push(...result)
      if (result.length < 30) return all
      startAfter = cursor(result[result.length - 1])
      if (seen.has(startAfter)) throw new Error('Repeated CW20 pagination')
      seen.add(startAfter)
    }
    throw new Error('CW20 pagination budget exceeded')
  }
  const items = await paginate(
    (startAfter) =>
      queryClient.fetchQuery(
        daoDaoCoreQueries.listItems({
          chainId,
          contractAddress: coreAddress,
          args: { startAfter, limit: 30 },
        })
      ),
    (item) => item[0]
  )
  for (const [key] of items) {
    if (key.startsWith(CW20_ITEM_KEY_PREFIX))
      tokens[chainId].push(key.slice(CW20_ITEM_KEY_PREFIX.length))
    else if (key.startsWith(POLYTONE_CW20_ITEM_KEY_PREFIX)) {
      const [remoteChain, contract] = key
        .slice(POLYTONE_CW20_ITEM_KEY_PREFIX.length)
        .split(':')
      if (remoteChain && contract) (tokens[remoteChain] ||= []).push(contract)
    }
  }
  tokens[chainId].push(
    ...(await paginate(
      (startAfter) =>
        queryClient.fetchQuery(
          daoDaoCoreQueries.cw20TokenList({
            chainId,
            contractAddress: coreAddress,
            args: { startAfter, limit: 30 },
          })
        ),
      (token) => token
    ))
  )
  return Object.fromEntries(
    Object.entries(tokens).map(([chain, list]) => [chain, [...new Set(list)]])
  )
}

/** Bounded current estimates, never an all-DAO crawl. Unregistered CW20/account
 * discovery cannot be proven complete, so ordinary DAOs retain a partial label.
 */
export const fetchDaoValuation = async (
  queryClient: QueryClient,
  { chainId, coreAddress }: DaoSource
): Promise<UsdValuation> => {
  const communityPool = coreAddress === COMMUNITY_POOL_ADDRESS_PLACEHOLDER
  let incomplete = !communityPool
  let accounts: Pick<Account, 'chainId' | 'address'>[] = [
    { chainId, address: coreAddress },
  ]
  if (!communityPool) {
    try {
      accounts = await queryClient.fetchQuery(
        accountQueries.list({ chainId, address: coreAddress })
      )
    } catch {
      incomplete = true
    }
    accounts = [
      ...new Map(
        [{ chainId, address: coreAddress }, ...accounts].map((a) => [
          a.chainId + ':' + a.address,
          a,
        ])
      ).values(),
    ]
  }
  if (accounts.length > 32) {
    incomplete = true
    accounts = accounts.slice(0, 32)
  }
  const native = await mapValuationWork(accounts, async (account) => {
    try {
      return await fetchAccountHoldings(queryClient, account, communityPool)
    } catch {
      return { holdings: [], incomplete: true }
    }
  })
  incomplete ||= native.some((n) => n.incomplete)
  const holdings = native.flatMap((n) => n.holdings)
  let registered: Record<string, string[]> = {}
  if (!communityPool) {
    try {
      registered = await fetchRegisteredCw20s(queryClient, {
        chainId,
        coreAddress,
      })
    } catch {
      incomplete = true
    }
    const lists = await mapValuationWork(accounts, async (account) => {
      let contracts = registered[account.chainId] || []
      if (chainIsIndexed(account.chainId)) {
        try {
          const indexed = await queryClient.fetchQuery(
            indexerQueries.queryAccount<
              { contractAddress: string; balance: string }[]
            >({ ...account, formula: 'tokens/list', noFallback: true })
          )
          if (Array.isArray(indexed))
            contracts = [...contracts, ...indexed.map((t) => t.contractAddress)]
        } catch {
          incomplete = true
        }
      }
      return [...new Set(contracts)].map((contract) => ({
        ...account,
        contract,
      }))
    })
    const cw20Work = lists.flat()
    if (cw20Work.length > 500) incomplete = true
    const balances = await mapValuationWork(
      cw20Work.slice(0, 500),
      async ({ chainId, address, contract }) => {
        try {
          const { balance } = await queryClient.fetchQuery(
            cw20BaseQueries.balance({
              chainId,
              contractAddress: contract,
              args: { address },
            })
          )
          return {
            chainId,
            type: TokenType.Cw20,
            denomOrAddress: contract,
            raw: balance,
          }
        } catch {
          incomplete = true
          return null
        }
      }
    )
    holdings.push(...balances.filter((b): b is Holding => b !== null))
  }
  if (holdings.length > 500) incomplete = true
  const valued = await mapValuationWork(
    holdings.slice(0, 500),
    async (holding): Promise<ValuedHolding> => {
      try {
        const { token, usdPrice, timestamp } = await queryClient.fetchQuery(
          tokenQueries.usdPrice(holding)
        )
        return {
          raw: holding.raw,
          decimals: token.decimals,
          usdPrice,
          timestamp: timestamp?.getTime(),
        }
      } catch {
        return { raw: holding.raw, decimals: 0 }
      }
    }
  )
  // Existing Stargaze NFT component, separate from fungible holdings. An error
  // is unknown, never a fabricated zero. This is observed provider valuation.
  const nfts = await mapValuationWork(
    accounts.filter((a) => a.chainId === ChainId.StargazeMainnet),
    async ({ address }): Promise<ValuedHolding | null> => {
      try {
        const { data } = await stargazeIndexerClient.query({
          query: stargazeWalletTotalValueUsdQuery,
          variables: { address },
          fetchPolicy: 'network-only',
        })
        const value = data?.wallet?.stats?.totalValueUsd
        if (typeof value !== 'number' || !Number.isFinite(value) || value < 0)
          throw new Error('NFT valuation unavailable')
        return { raw: '1', decimals: 0, usdPrice: value, timestamp: Date.now() }
      } catch {
        incomplete = true
        return null
      }
    }
  )
  return sumValuedHoldings(
    [...valued, ...nfts.filter((n): n is ValuedHolding => n !== null)],
    incomplete
  )
}
