import { parseCoins } from '@cosmjs/proto-signing'
import { IndexedTx } from '@cosmjs/stargate'
import uniq from 'lodash.uniq'
import {
  constSelector,
  selectorFamily,
  waitForAll,
  waitForAllSettled,
} from 'recoil'

import {
  AmountWithTimestamp,
  GenericToken,
  GenericTokenBalance,
  TokenType,
  WithChainId,
} from '@dao-dao/types'
import {
  convertMicroDenomToDenomWithDecimals,
  deserializeTokenSource,
  getTokenForChainIdAndDenom,
  serializeTokenSource,
} from '@dao-dao/utils'

import { refreshWalletBalancesIdAtom } from '../atoms'
import { allBalancesSelector } from './account'
import {
  blockHeightTimestampSafeSelector,
  communityPoolBalancesSelector,
  cosmWasmClientForChainSelector,
} from './chain'
import { queryWalletIndexerSelector } from './indexer'
import { allNftUsdValueSelector } from './nft'
import { genericTokenSelector, usdPriceSelector } from './token'

type TreasuryTransactionsParams = WithChainId<{
  address: string
  minHeight?: number
  maxHeight?: number
}>

interface TreasuryTransaction {
  tx: IndexedTx
  timestamp: Date | undefined
  events: {
    type: string
    attributes: {
      key: string
      value: string
    }[]
  }[]
}

export const treasuryTransactionsSelector = selectorFamily<
  TreasuryTransaction[],
  TreasuryTransactionsParams
>({
  key: 'treasuryTransactions',
  get:
    ({ address, minHeight, maxHeight, chainId }) =>
    async ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))

      const txs = await client.searchTx(
        [
          `message.module='bank' AND (transfer.sender='${address}' OR transfer.recipient='${address}')`,
          ...(minHeight !== undefined ? `tx.height>=${minHeight}` : []),
          ...(maxHeight !== undefined ? `tx.height<=${maxHeight}` : []),
        ].join('AND')
      )

      const txDates = get(
        waitForAll(
          txs.map(({ height }) =>
            blockHeightTimestampSafeSelector({
              blockHeight: height,
              chainId,
            })
          )
        )
      )

      return (
        txs
          .map((tx, index) => {
            let events
            try {
              events = JSON.parse(tx.rawLog)[0].events
            } catch {
              return
            }

            return {
              tx,
              timestamp: txDates[index],
              events,
            }
          })
          .filter(Boolean) as TreasuryTransaction[]
      ).sort((a, b) =>
        // Sort descending by timestamp, putting undefined timestamps last.
        b.timestamp && a.timestamp
          ? b.timestamp.getTime() - a.timestamp.getTime()
          : !a.timestamp
          ? 1
          : !b.timestamp
          ? -1
          : b.tx.height - a.tx.height
      )
    },
})

export interface TransformedTreasuryTransaction {
  hash: string
  height: number
  timestamp: Date | undefined
  sender: string
  recipient: string
  amount: number
  denomLabel: string
  outgoing: boolean
}

export const transformedTreasuryTransactionsSelector = selectorFamily<
  TransformedTreasuryTransaction[],
  TreasuryTransactionsParams
>({
  key: 'transformedTreasuryTransactions',
  get:
    (params) =>
    async ({ get }) => {
      const txs = get(treasuryTransactionsSelector(params))

      return txs
        .map(({ tx: { hash, height }, timestamp, events }) => {
          const transferEvent = events.find(({ type }) => type === 'transfer')
          if (!transferEvent) {
            return
          }

          let sender = transferEvent.attributes.find(
            ({ key }) => key === 'sender'
          )?.value
          let recipient = transferEvent.attributes.find(
            ({ key }) => key === 'recipient'
          )?.value
          const amount = transferEvent.attributes.find(
            ({ key }) => key === 'amount'
          )?.value

          if (!sender || !recipient || !amount) {
            return
          }

          const coin = parseCoins(amount)[0]
          if (!coin) {
            return
          }

          const token = getTokenForChainIdAndDenom(params.chainId, coin.denom)

          return {
            hash,
            height,
            timestamp,
            sender,
            recipient,
            amount: convertMicroDenomToDenomWithDecimals(
              coin.amount,
              token.decimals
            ),
            denomLabel: token.symbol,
            outgoing: sender === params.address,
          }
        })
        .filter(Boolean) as TransformedTreasuryTransaction[]
    },
})

export const daoTvlSelector = selectorFamily<
  AmountWithTimestamp,
  WithChainId<{
    coreAddress: string
    cw20GovernanceTokenAddress?: string
  }>
>({
  key: 'daoTvl',
  get:
    ({ chainId, coreAddress, cw20GovernanceTokenAddress }) =>
    ({ get }) => {
      const timestamp = new Date()

      const allBalances = get(
        allBalancesSelector({
          chainId,
          address: coreAddress,
          cw20GovernanceTokenAddress,
        })
      )

      const usdPrices = get(
        waitForAllSettled(
          allBalances.map(({ token }) =>
            usdPriceSelector({
              type: token.type,
              denomOrAddress: token.denomOrAddress,
              chainId: token.chainId,
            })
          )
        )
      )

      const nftAmount = get(
        allNftUsdValueSelector({
          chainId,
          address: coreAddress,
        })
      )

      const amount =
        nftAmount +
        allBalances
          .map(({ token, balance }, index) => {
            // Don't calculate price if could not load token decimals correctly.
            if (token.decimals === 0) {
              return 0
            }

            const price =
              (usdPrices[index].state === 'hasValue' &&
                usdPrices[index].getValue()?.usdPrice) ||
              0
            return (
              price &&
              convertMicroDenomToDenomWithDecimals(balance, token.decimals) *
                price
            )
          })
          .reduce((price, total) => price + total, 0)

      return {
        amount,
        timestamp,
      }
    },
})

export const communityPoolTvlSelector = selectorFamily<
  AmountWithTimestamp,
  WithChainId<{}>
>({
  key: 'communityPoolTvl',
  get:
    ({ chainId }) =>
    async ({ get }) => {
      const timestamp = new Date()

      const tokenBalances = get(communityPoolBalancesSelector({ chainId }))

      const prices = tokenBalances.map(
        ({ token: { chainId, type, denomOrAddress, decimals }, balance }) => {
          // Don't calculate price if could not load token decimals correctly.
          if (decimals === 0) {
            return 0
          }

          const price = get(
            usdPriceSelector({
              type,
              denomOrAddress,
              chainId,
            })
          )?.usdPrice

          return price
            ? convertMicroDenomToDenomWithDecimals(balance, decimals) * price
            : 0
        }
      )
      const amount = prices.reduce((price, total) => price + total, 0)

      return {
        amount,
        timestamp,
      }
    },
})

export type HistoricalBalancesOptions = WithChainId<{
  address: string
  filter?: TokenType
  startTimeUnixMs: number
  endTimeUnixMs?: number
  intervalMs?: number
}>

// Get historical token balances from the indexer.
export const historicalBalancesSelector = selectorFamily<
  {
    timestamp: Date
    balances: GenericTokenBalance[]
  }[],
  HistoricalBalancesOptions
>({
  key: 'historicalBalances',
  get:
    ({
      chainId,
      address,
      filter,
      startTimeUnixMs,
      endTimeUnixMs,
      intervalMs,
    }) =>
    ({ get }) => {
      const id = get(refreshWalletBalancesIdAtom(address))

      const [nativeBalanceSnapshots, cw20BalanceSnapshots] = get(
        waitForAll([
          !filter || filter === TokenType.Native
            ? queryWalletIndexerSelector({
                id,
                chainId,
                walletAddress: address,
                formula: 'bank/balances',
                times: {
                  startUnixMs: startTimeUnixMs,
                  endUnixMs: endTimeUnixMs,
                  stepMs: intervalMs,
                },
              })
            : constSelector([]),
          !filter || filter === TokenType.Cw20
            ? queryWalletIndexerSelector({
                id,
                chainId,
                walletAddress: address,
                formula: 'tokens/list',
                times: {
                  startUnixMs: startTimeUnixMs,
                  endUnixMs: endTimeUnixMs,
                  stepMs: intervalMs,
                },
              })
            : constSelector([]),
        ])
      ) as [
        (
          | {
              at?: string
              // Map of denom to balance.
              value: Record<string, string | undefined>
              blockHeight: number
              blockTimeUnixMs: number
            }[]
          | null
        ),
        (
          | {
              at?: string
              // List of contract addresses and balances.
              value: { contractAddress: string; balance: string }[]
              blockHeight: number
              blockTimeUnixMs: number
            }[]
          | null
        )
      ]

      // Get all unique token sources.
      const uniqueTokenSources = uniq([
        ...(nativeBalanceSnapshots || []).flatMap(({ value }) =>
          Object.keys(value).map((denomOrAddress) =>
            serializeTokenSource({
              chainId,
              type: TokenType.Native,
              denomOrAddress,
            })
          )
        ),
        ...(cw20BalanceSnapshots || []).flatMap(({ value }) =>
          value.map(({ contractAddress }) =>
            serializeTokenSource({
              chainId,
              type: TokenType.Cw20,
              denomOrAddress: contractAddress,
            })
          )
        ),
      ])

      // Map of denomOrAddress to token.
      const tokens = get(
        waitForAll(
          uniqueTokenSources.map((tokenSource) => {
            const { chainId, type, denomOrAddress } =
              deserializeTokenSource(tokenSource)

            return genericTokenSelector({
              chainId,
              type,
              denomOrAddress,
            })
          })
        )
      ).reduce(
        (acc, token) => ({
          ...acc,
          [token.denomOrAddress]: token,
        }),
        {} as Record<string, GenericToken>
      )

      // Group snapshots by timestamp.
      const nativeBalanceSnapshotsByTimestamp = (
        nativeBalanceSnapshots || []
      ).reduce(
        (acc, { at, blockTimeUnixMs, value }) => ({
          ...acc,
          [Number(at || blockTimeUnixMs)]: Object.entries(value).reduce(
            (acc, [denom, balance]) => [
              ...acc,
              ...((balance ? [[denom, balance!]] : []) as [string, string][]),
            ],
            [] as [string, string][]
          ),
        }),
        {} as Record<number, [string, string][] | undefined>
      )
      const cw20BalanceSnapshotsByTimestamp = (
        cw20BalanceSnapshots || []
      ).reduce(
        (acc, { at, blockTimeUnixMs, value }) => ({
          ...acc,
          [Number(at || blockTimeUnixMs)]: value.map(
            ({ contractAddress, balance }): [string, string] => [
              contractAddress,
              balance,
            ]
          ),
        }),
        {} as Record<number, [string, string][] | undefined>
      )

      const timestamps = uniq([
        ...Object.keys(nativeBalanceSnapshotsByTimestamp).map((key) =>
          Number(key)
        ),
        ...Object.keys(cw20BalanceSnapshotsByTimestamp).map((key) =>
          Number(key)
        ),
      ])

      return timestamps
        .map((timestamp) => {
          const native = nativeBalanceSnapshotsByTimestamp[timestamp] || []
          const cw20 = cw20BalanceSnapshotsByTimestamp[timestamp] || []

          return {
            timestamp: new Date(timestamp),
            balances: [...native, ...cw20].map(([denomOrAddress, balance]) => ({
              token: tokens[denomOrAddress],
              balance,
            })),
          }
        })
        .filter(({ balances }) => balances.length)
    },
})

// Get historical balances from the indexer grouped by token.
export const historicalBalancesByTokenSelector = selectorFamily<
  {
    token: GenericToken
    balances: {
      timestamp: Date
      // undefined balance means this token was not detected at this timestamp.
      // This means the indexer does not have historical data at this time,
      // which is not the same as a balance of '0'.
      balance: string | undefined
    }[]
  }[],
  HistoricalBalancesOptions
>({
  key: 'historicalNativeBalancesByToken',
  get:
    (options) =>
    ({ get }) => {
      const historicalBalances = get(historicalBalancesSelector(options))

      // Get all unique token sources.
      const tokenSources = uniq(
        historicalBalances.flatMap(({ balances }) =>
          balances.map(({ token }) => serializeTokenSource(token))
        )
      ).map(deserializeTokenSource)

      // Map of denomOrAddress to token.
      const tokens = get(
        waitForAll(
          tokenSources.map(({ chainId, type, denomOrAddress }) =>
            genericTokenSelector({
              chainId,
              type,
              denomOrAddress,
            })
          )
        )
      ).reduce(
        (acc, token) => ({
          ...acc,
          [token.denomOrAddress]: token,
        }),
        {} as Record<string, GenericToken>
      )

      return tokenSources.map((tokenSource) => ({
        token: tokens[tokenSource.denomOrAddress],
        balances: historicalBalances.flatMap(({ timestamp, balances }) => {
          const { balance } =
            balances.find(
              ({ token }) =>
                serializeTokenSource(token) ===
                serializeTokenSource(tokenSource)
            ) ?? {}

          return {
            timestamp,
            balance,
          }
        }),
      }))
    },
})
