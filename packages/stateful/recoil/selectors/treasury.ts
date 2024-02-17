import { Asset as SkipAsset } from '@skip-router/core'
import uniq from 'lodash.uniq'
import { noWait, selectorFamily, waitForAll, waitForNone } from 'recoil'

import {
  accountsSelector,
  genericTokenBalancesSelector,
  genericTokenSelector,
  genericTokenSourceSelector,
  nativeDelegatedBalanceSelector,
  querySnapperSelector,
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
  findValueAtTimestamp,
  getNativeTokenForChainId,
  loadableToLoadingData,
  serializeTokenSource,
  tokensEqual,
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

export const treasuryValueHistorySelector = selectorFamily<
  {
    timestamps: Date[]
    tokens: {
      token: GenericToken
      // Value at each timestamp.
      values: (number | null)[]
    }[]
    // Total value at each timestamp.
    totals: (number | null)[]
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
  }>
>({
  key: 'treasuryValueHistory',
  get:
    ({ chainId: nativeChainId, address, range, filter }) =>
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

      // Value history for all accounts.
      const historicalBalances = get(
        waitForAll(
          allAccounts.map(({ chainId, address }) =>
            querySnapperSelector({
              query: 'daodao-value-history',
              parameters: {
                chainId,
                address,
                range,
              },
            })
          )
        )
      ) as {
        assets: SkipAsset[]
        snapshots: {
          timestamp: number
          values: {
            price?: number
            balance?: string
            value?: number
          }[]
          totalValue: number
        }[]
      }[]

      const historicalBalanceTokenSources = get(
        waitForAll(
          historicalBalances.map(({ assets }) =>
            waitForAll(
              assets.map(({ chainID, denom, isCW20, tokenContract }) =>
                genericTokenSourceSelector({
                  chainId: chainID,
                  type: isCW20 ? TokenType.Cw20 : TokenType.Native,
                  denomOrAddress: (isCW20 && tokenContract) || denom,
                })
              )
            )
          )
        )
      )

      // All queries have similar timestamps since they use the same range
      // (though they may have been cached at different times), so choose the
      // one with the most timestamps available.
      const oldestAccount = historicalBalances.reduce((acc, asset) =>
        asset.snapshots.length > acc.snapshots.length ? acc : asset
      )
      let timestamps =
        oldestAccount?.snapshots.map(({ timestamp }) => timestamp) || []

      // Get unique tokens across all accounts.
      const uniqueTokenSources = uniq(
        historicalBalanceTokenSources.flatMap((sources) =>
          sources.map((source) => serializeTokenSource(source))
        )
      ).map((tokenSource) => deserializeTokenSource(tokenSource))
      // These are loaded/cached above, so this `get` should be instant.
      const uniqueTokens = get(
        waitForAll(
          uniqueTokenSources.map((source) => genericTokenSelector(source))
        )
      )

      const tokensWithValues = uniqueTokens.map((token) => {
        // Get the snapshots of this token at each timestamp for each account.
        const accountTokenSnapshots = historicalBalances.map(
          ({ snapshots }, index) => {
            // Get the index of this token in the snapshots for this account's
            // historical balances.
            const snapshotTokenIndex = historicalBalanceTokenSources[
              index
            ].findIndex((snapshotTokenSource) =>
              tokensEqual(snapshotTokenSource, token)
            )

            if (snapshotTokenIndex === -1) {
              return []
            }

            // Extract this token's value at each timestamp.
            return snapshots.map(({ timestamp, values }) => ({
              timestamp,
              value: values[snapshotTokenIndex].value,
            }))
          }
        )

        const values = timestamps.map((timestamp) => {
          // Get the account values at this timestamp for each account.
          const accountValues = accountTokenSnapshots.map(
            (snapshots) => findValueAtTimestamp(snapshots, timestamp)?.value
          )

          // Sum the values at this timestamp. If all are undefined, return null
          // to indicate there's no data for this timestamp.
          return accountValues.reduce(
            (acc, value) =>
              acc === null && value === undefined
                ? null
                : (acc || 0) + (value || 0),
            null as number | null
          )
        })

        return {
          token,
          values,
        }
      })

      // Sum up the values at each timestamp, ignoring null values.
      let totals = timestamps.map((_, index) =>
        tokensWithValues.reduce(
          (acc, { values }) => acc + (values[index] || 0),
          0
        )
      )

      // Remove timestamps at the front that have no data for all tokens.

      // Get first timestamp with a value.
      let firstNonNullTimestamp = timestamps.findIndex((_, index) =>
        tokensWithValues.some(({ values }) => values[index] !== null)
      )

      // If no non-null timestamps, remove all.
      if (firstNonNullTimestamp === -1) {
        firstNonNullTimestamp = totals.length
      }

      if (firstNonNullTimestamp > 0) {
        timestamps = timestamps.slice(firstNonNullTimestamp)
        tokensWithValues.forEach(
          (data) => (data.values = data.values.slice(firstNonNullTimestamp))
        )
        totals = totals.slice(firstNonNullTimestamp)
      }

      return {
        timestamps: timestamps.map((timestamp) => new Date(timestamp)),
        tokens: tokensWithValues,
        totals,
      }
    },
})
