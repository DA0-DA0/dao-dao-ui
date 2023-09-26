import { parseCoins } from '@cosmjs/proto-signing'
import { IndexedTx } from '@cosmjs/stargate'
import { selectorFamily, waitForAll, waitForAllSettled } from 'recoil'

import {
  AmountWithTimestamp,
  GenericToken,
  GenericTokenBalance,
  TokenType,
  WithChainId,
} from '@dao-dao/types'
import {
  convertMicroDenomToDenomWithDecimals,
  getTokenForChainIdAndDenom,
} from '@dao-dao/utils'

import { refreshWalletBalancesIdAtom } from '../atoms'
import {
  blockHeightTimestampSafeSelector,
  communityPoolBalancesSelector,
  cosmWasmClientForChainSelector,
  nativeBalancesSelector,
} from './chain'
import { DaoCoreV2Selectors } from './contracts'
import { queryWalletIndexerSelector } from './indexer'
import {
  genericTokenBalancesSelector,
  genericTokenDelegatedBalanceSelector,
  genericTokenSelector,
  usdPriceSelector,
} from './token'

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

export const allDaoBalancesSelector = selectorFamily<
  // Map chain ID to token balances on that chain.
  Record<string, GenericTokenBalance[]>,
  WithChainId<{
    coreAddress: string
    cw20GovernanceTokenAddress?: string
  }>
>({
  key: 'allDaoBalances',
  get:
    ({ coreAddress, cw20GovernanceTokenAddress, chainId }) =>
    ({ get }) => {
      const allAccounts = get(
        DaoCoreV2Selectors.allAccountsSelector({
          chainId,
          contractAddress: coreAddress,
        })
      )

      // Neutron's modified DAOs do not support cw20s, so this may error. Ignore
      // if so.
      const cw20BalancesLoadable = get(
        waitForAllSettled([
          DaoCoreV2Selectors.allCw20TokensWithBalancesSelector({
            contractAddress: coreAddress,
            chainId,
            governanceTokenAddress: cw20GovernanceTokenAddress,
          }),
        ])
      )[0]

      const allBalances = [
        // Native balances.
        ...get(
          waitForAll(
            allAccounts.flatMap(({ address, chainId }) => [
              // All unstaked
              genericTokenBalancesSelector({
                chainId,
                address,
              }),
              // Native staked
              genericTokenDelegatedBalanceSelector({
                chainId,
                walletAddress: address,
              }),
            ])
          )
        ).flat(),
        // Cw20s on native chain.
        ...(cw20BalancesLoadable.state === 'hasValue'
          ? cw20BalancesLoadable.contents
          : []),
      ]

      const uniqueChainIds = [
        ...new Set(allAccounts.map(({ chainId }) => chainId)),
      ]

      return uniqueChainIds.reduce(
        (acc, chainId) => ({
          ...acc,
          [chainId]: allBalances.filter(
            ({ token }) => token.chainId === chainId
          ),
        }),
        {} as Record<string, GenericTokenBalance[]>
      )
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
    (params) =>
    ({ get }) => {
      const timestamp = new Date()

      const allBalances = Object.values(
        get(allDaoBalancesSelector(params))
      ).flat()

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

      const amount = allBalances
        .map(({ token, balance }, index) => {
          // Don't calculate price if could not load token decimals correctly.
          if (token.decimals === 0) {
            return 0
          }

          const price =
            (usdPrices[index].state === 'hasValue' &&
              usdPrices[index].getValue()?.amount) ||
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
          )?.amount

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

export type HistoricalNativeBalancesOptions = WithChainId<{
  address: string
  startTimeUnixMs: number
  endTimeUnixMs?: number
  intervalMs?: number
}>

// Get historical native balances from the indexer.
export const historicalNativeBalancesSelector = selectorFamily<
  {
    timestamp: Date
    balances: GenericTokenBalance[]
  }[],
  HistoricalNativeBalancesOptions
>({
  key: 'historicalNativeBalances',
  get:
    ({ address, chainId, startTimeUnixMs, endTimeUnixMs, intervalMs }) =>
    ({ get }) => {
      const id = get(refreshWalletBalancesIdAtom(address))

      const balanceSnapshots = (get(
        queryWalletIndexerSelector({
          id,
          chainId,
          walletAddress: address,
          formula: 'bank/balances',
          times: {
            startUnixMs: startTimeUnixMs,
            endUnixMs: endTimeUnixMs,
            stepMs: intervalMs,
          },
          required: true,
        })
      ) ?? []) as {
        at?: string
        // Map of denom to balance.
        value: Record<string, string | undefined>
        blockHeight: number
        blockTimeUnixMs: number
      }[]

      // Get all unique denoms.
      const uniqueDenoms = [
        ...new Set(balanceSnapshots.flatMap(({ value }) => Object.keys(value))),
      ]

      // Map of denom to token.
      const tokens = get(
        waitForAll(
          uniqueDenoms.map((denom) =>
            genericTokenSelector({
              type: TokenType.Native,
              denomOrAddress: denom,
              chainId,
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

      return balanceSnapshots
        .map(({ at, blockTimeUnixMs, value }) => ({
          timestamp: new Date(Number(at || blockTimeUnixMs)),
          balances: Object.entries(value).flatMap(
            ([denom, balance]): GenericTokenBalance | [] =>
              balance
                ? {
                    token: tokens[denom],
                    balance,
                  }
                : []
          ),
        }))
        .filter(({ balances }) => balances.length)
    },
})

// Get historical native balances from the indexer grouped by denom.
export const historicalNativeBalancesByDenomSelector = selectorFamily<
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
  HistoricalNativeBalancesOptions
>({
  key: 'historicalNativeBalancesByDenom',
  get:
    (options) =>
    ({ get }) => {
      const historicalNativeBalances = get(
        historicalNativeBalancesSelector(options)
      )

      // Get current native balances from chain and make sure the denoms are
      // present in history even if they are not in the indexer.
      const nativeBalances = get(
        nativeBalancesSelector({
          chainId: options.chainId,
          address: options.address,
        })
      )

      // Get all unique denoms.
      const uniqueDenoms = [
        ...new Set([
          ...new Set(
            historicalNativeBalances.flatMap(({ balances }) =>
              balances.map(({ token }) => token.denomOrAddress)
            )
          ),
          ...nativeBalances.map(({ token }) => token.denomOrAddress),
        ]),
      ]

      // Map of denom to token.
      const tokens = get(
        waitForAll(
          uniqueDenoms.map((denom) =>
            genericTokenSelector({
              type: TokenType.Native,
              denomOrAddress: denom,
              chainId: options.chainId,
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

      return uniqueDenoms.map((denom) => ({
        token: tokens[denom],
        balances: historicalNativeBalances.flatMap(
          ({ timestamp, balances }) => {
            const { balance } =
              balances.find(({ token }) => token.denomOrAddress === denom) ?? {}

            return {
              timestamp,
              balance,
            }
          }
        ),
      }))
    },
})
