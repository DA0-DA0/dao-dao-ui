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
  TokenPriceHistoryRange,
  TokenType,
  WithChainId,
} from '@dao-dao/types'
import {
  COMMUNITY_POOL_ADDRESS_PLACEHOLDER,
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
import { querySnapperSelector } from './indexer'
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
  range: TokenPriceHistoryRange
}>

// Get historical token balances from the indexer.
export const historicalBalancesSelector = selectorFamily<
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
  key: 'historicalBalances',
  get:
    ({ chainId, address, filter, range }) =>
    ({ get }) => {
      const isCommunityPool = address === COMMUNITY_POOL_ADDRESS_PLACEHOLDER

      const id = get(refreshWalletBalancesIdAtom(address))

      const [nativeBalanceSnapshots, cw20BalanceSnapshots] = get(
        waitForAll([
          !filter || filter === TokenType.Native
            ? isCommunityPool
              ? querySnapperSelector({
                  id,
                  query: 'daodao-community-pool-history',
                  args: {
                    chainId,
                    range,
                  },
                })
              : querySnapperSelector({
                  id,
                  query: 'daodao-bank-balances-history',
                  args: {
                    chainId,
                    address,
                    range,
                  },
                })
            : constSelector([]),
          (!filter || filter === TokenType.Cw20) && !isCommunityPool
            ? querySnapperSelector({
                id,
                query: 'daodao-cw20-balances-history',
                args: {
                  chainId,
                  address,
                  range,
                },
              })
            : constSelector([]),
        ])
      ) as [
        (
          | {
              // Map of denom to balance.
              value: Record<string, string | undefined>
              blockHeight: number
              blockTimeUnixMs: number
            }[]
          | null
        ),
        (
          | {
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

      // Get generic tokens for all sources.
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
      )

      return tokens.map((token) => {
        const balances =
          token.type === TokenType.Native
            ? (nativeBalanceSnapshots || []).flatMap(
                ({ value, blockTimeUnixMs }) => {
                  const balance = value[token.denomOrAddress]
                  return balance
                    ? {
                        timestamp: new Date(blockTimeUnixMs),
                        balance,
                      }
                    : []
                }
              )
            : (cw20BalanceSnapshots || []).flatMap(
                ({ value, blockTimeUnixMs }) => {
                  const balance = value.find(
                    ({ contractAddress }) =>
                      contractAddress === token.denomOrAddress
                  )?.balance

                  return balance
                    ? {
                        timestamp: new Date(blockTimeUnixMs),
                        balance,
                      }
                    : []
                }
              )

        return {
          token,
          balances,
        }
      })
    },
})
