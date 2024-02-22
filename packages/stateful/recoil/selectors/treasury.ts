import uniq from 'lodash.uniq'
import { noWait, selectorFamily, waitForAll, waitForNone } from 'recoil'

import {
  accountsSelector,
  genericTokenBalancesSelector,
  genericTokenSelector,
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
  getNativeTokenForChainId,
  loadableToLoadingData,
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
      const { timestamps, assets, totals } = get(
        querySnapperSelector({
          query: 'daodao-many-value-history',
          parameters: {
            accounts: allAccounts.map(
              ({ chainId, address }) => `${chainId}:${address}`
            ),
            range,
            tokenFilter: filter?.tokens
              ?.map(
                ({ chainId, denomOrAddress }) => `${chainId}:${denomOrAddress}`
              )
              .join(','),
          },
        })
      ) as {
        timestamps: number[]
        assets: {
          origin: {
            chainId: string
            denom: string
          }
          // Value at each timestamp.
          values: (number | null)[]
        }[]
        // Total value at each timestamp.
        totals: (number | null)[]
      }

      const tokens = get(
        waitForAll(
          assets.map(({ origin: { chainId, denom } }) =>
            genericTokenSelector({
              type: denom.startsWith('cw20:')
                ? TokenType.Cw20
                : TokenType.Native,
              chainId,
              denomOrAddress: denom.startsWith('cw20:')
                ? denom.slice(5)
                : denom,
            })
          )
        )
      )

      return {
        timestamps: timestamps.map((timestamp) => new Date(timestamp)),
        tokens: assets.map(({ values }, index) => ({
          token: tokens[index],
          values: values.map((value) => value ?? null),
        })),
        totals,
      }
    },
})
