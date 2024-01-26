import uniq from 'lodash.uniq'
import { noWait, selectorFamily, waitForAll, waitForNone } from 'recoil'

import {
  accountsSelector,
  allBalancesSelector,
  communityPoolBalancesSelector,
  genericTokenBalancesSelector,
  historicalBalancesByTokenSelector,
  historicalBalancesSelector,
  historicalUsdPriceSelector,
  nativeDelegatedBalanceSelector,
  usdPriceSelector,
} from '@dao-dao/state'
import {
  Account,
  AccountType,
  GenericToken,
  GenericTokenSource,
  LoadingTokens,
  TokenCardInfo,
  TokenPriceHistoryRange,
  TokenType,
  WithChainId,
} from '@dao-dao/types'
import {
  COMMUNITY_POOL_ADDRESS_PLACEHOLDER,
  convertMicroDenomToDenomWithDecimals,
  deserializeTokenSource,
  getNativeTokenForChainId,
  loadableToLoadingData,
  serializeTokenSource,
} from '@dao-dao/utils'

import { tokenCardLazyInfoSelector } from './token'

// lazyInfo must be loaded in the component separately, since it refreshes on a
// timer and we don't want this whole selector to reevaluate and load when that
// refreshes. Use `tokenCardLazyInfoSelector`.
export const treasuryTokenCardInfosForDaoSelector = selectorFamily<
  // Map chain ID to DAO-owned tokens on that chain.
  LoadingTokens,
  WithChainId<{
    coreAddress: string
    cw20GovernanceTokenAddress?: string
    nativeGovernanceTokenDenom?: string
  }>
>({
  key: 'treasuryTokenCardInfosForDao',
  get:
    ({
      chainId: nativeChainId,
      coreAddress,
      cw20GovernanceTokenAddress,
      nativeGovernanceTokenDenom,
    }) =>
    ({ get }) => {
      const allAccounts = get(
        accountsSelector({
          chainId: nativeChainId,
          address: coreAddress,
        })
      )

      const uniqueChainIds = uniq(allAccounts.map((account) => account.chainId))

      return uniqueChainIds.reduce((acc, chainId) => {
        const accounts = allAccounts.filter(
          (account) => account.chainId === chainId
        )

        const accountBalancesLoadables = get(
          waitForNone(
            accounts.map(({ chainId, address }) =>
              genericTokenBalancesSelector({
                chainId: nativeChainId,
                address: coreAddress,
                nativeGovernanceTokenDenom:
                  chainId === nativeChainId
                    ? nativeGovernanceTokenDenom
                    : undefined,
                cw20GovernanceTokenAddress:
                  chainId === nativeChainId
                    ? cw20GovernanceTokenAddress
                    : undefined,
                filter: {
                  account: {
                    chainId,
                    address,
                  },
                },
              })
            )
          )
        )
        const accountBalances = accountBalancesLoadables.flatMap(
          (loadable, index) =>
            loadable.state === 'hasValue'
              ? {
                  account: accounts[index],
                  balances: loadable.contents,
                }
              : []
        )

        // Updating if any loadables are still loading. If none are loading but
        // a native token is still waiting for staking info, this is updated
        // below.
        let updating = accountBalancesLoadables.some(
          (loadable) => loadable.state === 'loading'
        )

        // Get token card infos for loaded tokens.
        const infos = accountBalances.flatMap(({ account, balances }) =>
          balances.flatMap(
            ({
              token,
              balance,
              isGovernanceToken = false,
            }): TokenCardInfo | [] => {
              const unstakedBalance = convertMicroDenomToDenomWithDecimals(
                balance,
                token.decimals
              )

              let hasStakingInfo = false
              // Staking info only exists for native token.
              if (
                token.type === TokenType.Native &&
                token.denomOrAddress ===
                  getNativeTokenForChainId(chainId).denomOrAddress
              ) {
                // Check if anything staked.
                const stakedBalance = get(
                  noWait(
                    nativeDelegatedBalanceSelector({
                      chainId,
                      address: account.address,
                    })
                  )
                )

                // Ignore this token until staking info loads.
                if (stakedBalance.state === 'loading') {
                  // Make sure updating is true if waiting on staking info.
                  updating = true

                  return []
                }

                hasStakingInfo =
                  stakedBalance.state === 'hasValue' &&
                  stakedBalance.contents.amount !== '0'
              }

              const lazyInfo = get(
                noWait(
                  tokenCardLazyInfoSelector({
                    owner: account.address,
                    token,
                    unstakedBalance,
                  })
                )
              )

              return {
                owner: account,
                token,
                isGovernanceToken,
                unstakedBalance,
                hasStakingInfo,
                lazyInfo: loadableToLoadingData(lazyInfo, {
                  usdUnitPrice: undefined,
                  stakingInfo: undefined,
                  totalBalance: unstakedBalance,
                }),
              }
            }
          )
        )

        return {
          ...acc,
          [chainId]:
            accounts.length > 0 &&
            accountBalancesLoadables.every(
              (loadable) => loadable.state === 'loading'
            )
              ? {
                  loading: true,
                  errored: false,
                }
              : {
                  loading: false,
                  errored: false,
                  updating,
                  data: infos,
                },
        }
      }, {} as LoadingTokens)
    },
})

const ACCOUNT_FILTER_PROPERTIES = ['type', 'chainId', 'address'] as const

// The interval of data returned from CoinGecko at these ranges.
// https://www.coingecko.com/api/documentation
const tokenPriceHistoryRangeInterval: Record<TokenPriceHistoryRange, number> = {
  // Daily.
  [TokenPriceHistoryRange.Year]: 24 * 60 * 60 * 1000,
  // Hourly.
  [TokenPriceHistoryRange.Month]: 60 * 60 * 1000,
  [TokenPriceHistoryRange.Week]: 60 * 60 * 1000,
  // Every 5 minutes.
  [TokenPriceHistoryRange.Day]: 5 * 60 * 1000,
}

export const treasuryValueHistorySelector = selectorFamily<
  {
    timestamps: Date[]
    tokens: {
      token: GenericToken
      // Value at each timestamp.
      values: (number | null)[]
      // Current value.
      currentValue: number
    }[]
    total: {
      // Total value at each timestamp.
      values: (number | null)[]
      // Current total.
      currentValue: number
    }
  },
  WithChainId<{
    address: string
    range: TokenPriceHistoryRange
    filter?: {
      // Filter by any of the account properties.
      account?: Partial<Pick<Account, typeof ACCOUNT_FILTER_PROPERTIES[number]>>
      // If defined, only show these tokens.
      tokens?: GenericTokenSource[]
    }
    // If account is a DAO, set this to the denom of its native governance
    // token.
    nativeGovernanceTokenDenom?: string
    // If account is a DAO, set this to the address of its cw20 governance
    // token.
    cw20GovernanceTokenAddress?: string
  }>
>({
  key: 'treasuryValueHistory',
  get:
    ({
      chainId: nativeChainId,
      address,
      range,
      filter,
      nativeGovernanceTokenDenom,
      cw20GovernanceTokenAddress,
    }) =>
    ({ get }) => {
      const isCommunityPool = address === COMMUNITY_POOL_ADDRESS_PLACEHOLDER

      let allAccounts: Account[] = isCommunityPool
        ? [
            {
              type: AccountType.Native,
              chainId: nativeChainId,
              address,
            },
          ]
        : get(
            accountsSelector({
              chainId: nativeChainId,
              address,
            })
          )

      // Filter by account fields.
      if (filter?.account) {
        allAccounts = allAccounts.filter((account) =>
          ACCOUNT_FILTER_PROPERTIES.every(
            (key) =>
              !filter.account ||
              !(key in filter.account) ||
              account[key] === filter.account[key]
          )
        )
      }

      const startTime = new Date(Date.now() - range)
      const intervalMs = tokenPriceHistoryRangeInterval[range]
      // Snap to beginning.
      startTime.setHours(0, 0, 0, 0)
      const startTimeUnixMs = startTime.getTime()

      // Historical balances.
      const historicalBalancesByTimestamp = get(
        waitForAll(
          allAccounts.map(({ chainId, address }) =>
            historicalBalancesSelector({
              chainId,
              address,
              startTimeUnixMs,
              intervalMs,
            })
          )
        )
      )
      // Get all unique timestamps.
      let timestamps = uniq(
        historicalBalancesByTimestamp.flatMap((balancesByTimestamp) =>
          balancesByTimestamp
            .map(({ timestamp }) => timestamp.getTime())
            // Remove last timestamp since we replace it with current balance.
            // Remove from each one individually like this (instead of after the
            // sort below) since the last timestamp will be different for each
            // account depending on when the query finished. Each is already
            // sorted internally, so no need to sort before slicing.
            .slice(0, -1)
        )
      )
        .map((timestamp) => new Date(timestamp))
        .sort((a, b) => a.getTime() - b.getTime())

      const historicalBalancesByToken = get(
        waitForAll(
          allAccounts.map(({ chainId, address }) =>
            historicalBalancesByTokenSelector({
              chainId,
              address,
              startTimeUnixMs,
              intervalMs,
            })
          )
        )
      ).flat()

      // Current balances.
      const currentBalances = isCommunityPool
        ? get(
            communityPoolBalancesSelector({
              chainId: nativeChainId,
            })
          )
        : get(
            allBalancesSelector({
              chainId: nativeChainId,
              address,
              nativeGovernanceTokenDenom,
              cw20GovernanceTokenAddress,
              // Don't include staked in current value since we don't have
              // staked history, which makes the graph spike at the end.
              ignoreStaked: true,
            })
          )

      const tokens = [
        ...currentBalances.map(({ token }) => token),
        ...historicalBalancesByToken.map(({ token }) => token),
      ].filter(
        (token) =>
          // Can only compute price if token decimals loaded correctly.
          token.decimals > 0 &&
          // Filter by tokens.
          (!filter?.tokens ||
            filter.tokens.some(
              (source) =>
                serializeTokenSource(source) === serializeTokenSource(token)
            ))
      )

      // Unique token sources.
      const uniqueTokenSources = uniq(
        tokens.map(({ source }) => serializeTokenSource(source))
      )
      const tokenSources = uniqueTokenSources.map(deserializeTokenSource)

      // Get historical token prices for unique tokens.
      const allHistoricalUsdPrices = get(
        waitForAll(
          tokenSources.map(({ chainId, type, denomOrAddress }) =>
            historicalUsdPriceSelector({
              chainId,
              type,
              denomOrAddress,
              range,
            })
          )
        )
      )
      // Get current token prices for unique tokens.
      const allCurrentUsdPrices = get(
        waitForAll(
          tokenSources.map(({ chainId, type, denomOrAddress }) =>
            usdPriceSelector({
              chainId,
              type,
              denomOrAddress,
            })
          )
        )
      )

      // Group tokens by unique ID and add balances at same timestamps.
      const tokensWithValues = uniqueTokenSources.reduce(
        (acc, source, index) => {
          const token = tokens.find(
            (token) =>
              serializeTokenSource(token.source) === source &&
              token.symbol &&
              token.decimals
          )
          const historicalUsdPrices = allHistoricalUsdPrices[index]
          const currentUsdPrice = allCurrentUsdPrices[index]?.usdPrice
          // If no token, decimals, nor prices, skip.
          if (!token?.decimals || !historicalUsdPrices || !currentUsdPrice) {
            return acc
          }

          // Flattened list of historical balances across all accounts.
          // Timestamps will likely be duplicated.
          const historical = historicalBalancesByToken
            .filter(
              ({ token }) => serializeTokenSource(token.source) === source
            )
            .flatMap(({ balances }) => balances)

          // Sum up historical balances per timestamp.
          const values = timestamps.map((timestamp) => {
            const balances = historical.filter(
              ({ timestamp: balanceTimestamp }) =>
                balanceTimestamp.getTime() === timestamp.getTime()
            )

            // Sum up the balances for this timestamp, unless they are all
            // undefined, in which case return null. This is to indicate that
            // the indexer has no data on this timestamp from any account and
            // thus should not show up in the graph. If any have a balance,
            // show it.
            const totalBalance = balances.reduce(
              (acc, { balance }) =>
                acc === null && !balance
                  ? null
                  : (acc || 0n) + BigInt(balance || 0),
              null as bigint | null
            )

            if (totalBalance === null) {
              return null
            }

            // Find the first price after this timestamp.
            let firstPriceAfterIndex = historicalUsdPrices.findIndex(
              (historical) => historical.timestamp > timestamp
            )
            // If all prices are before this timestamp, use the last one if it's
            // within the last day.
            if (firstPriceAfterIndex === -1) {
              const lastPrice =
                historicalUsdPrices[historicalUsdPrices.length - 1]
              if (
                timestamp.getTime() - lastPrice.timestamp.getTime() <
                24 * 60 * 60 * 1000
              ) {
                firstPriceAfterIndex = historicalUsdPrices.length - 1
              }
            }
            // If all prices are after this timestamp, use the second one if
            // it's within the next day so we check the first two.
            if (firstPriceAfterIndex === 0) {
              const firstPrice = historicalUsdPrices[0]
              if (
                firstPrice.timestamp.getTime() - timestamp.getTime() <
                24 * 60 * 60 * 1000
              ) {
                firstPriceAfterIndex = 1
              }
            }
            // If price is not found or is still the first one, no value for
            // this timestamp.
            if (firstPriceAfterIndex <= 0) {
              return null
            }

            // Get the closest price for this timestamp by choosing the closer
            // price of the two surrounding it.
            const priceBefore = historicalUsdPrices[firstPriceAfterIndex - 1]
            const priceAfter = historicalUsdPrices[firstPriceAfterIndex]
            const usdPrice = (
              Math.abs(priceBefore.timestamp.getTime() - timestamp.getTime()) <
              Math.abs(priceAfter.timestamp.getTime() - timestamp.getTime())
                ? priceBefore
                : priceAfter
            ).amount

            return (
              usdPrice *
              convertMicroDenomToDenomWithDecimals(
                totalBalance.toString(),
                token.decimals
              )
            )
          })

          // Sum up current balances.
          const currentBalance = currentBalances
            .filter(
              ({ token }) => serializeTokenSource(token.source) === source
            )
            .reduce((acc, { balance }) => acc + BigInt(balance), 0n)
          const currentValue =
            currentUsdPrice *
            convertMicroDenomToDenomWithDecimals(
              currentBalance.toString(),
              token.decimals
            )

          return [
            ...acc,
            {
              token,
              values,
              currentValue,
            },
          ]
        },
        [] as {
          token: GenericToken
          // Value at each timestamp.
          values: (number | null)[]
          // Current value.
          currentValue: number
        }[]
      )

      // Sum up the values at each timestamp, ignoring null values.
      let totalValues = timestamps.map((_, index) =>
        tokensWithValues.reduce(
          (acc, { values }) => acc + (values[index] || 0),
          0
        )
      )

      // Sum up the current value of each token.
      const totalCurrentValue = tokensWithValues.reduce(
        (acc, { currentValue }) => acc + currentValue,
        0
      )

      // Remove timestamps at the front that have no data for all tokens.

      // Get first timestamp with a value.
      let firstNonNullTimestamp = timestamps.findIndex((_, index) =>
        tokensWithValues.some(({ values }) => values[index] !== null)
      )

      // If no non-null timestamps, remove all.
      if (firstNonNullTimestamp === -1) {
        firstNonNullTimestamp = totalValues.length
      }
      if (firstNonNullTimestamp > 0) {
        timestamps = timestamps.slice(firstNonNullTimestamp)
        tokensWithValues.forEach(
          (data) => (data.values = data.values.splice(firstNonNullTimestamp))
        )
        totalValues = totalValues.slice(firstNonNullTimestamp)
      }

      return {
        timestamps,
        tokens: tokensWithValues,
        total: {
          values: totalValues,
          currentValue: totalCurrentValue,
        },
      }
    },
})
