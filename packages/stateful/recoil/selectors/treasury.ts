import { noWait, selectorFamily, waitForNone } from 'recoil'

import {
  DaoCoreV2Selectors,
  nativeBalancesSelector,
  nativeDelegatedBalanceSelector,
} from '@dao-dao/state'
import {
  DaoAccount,
  LoadingTokens,
  TokenCardInfo,
  WithChainId,
} from '@dao-dao/types'
import {
  convertMicroDenomToDenomWithDecimals,
  getNativeTokenForChainId,
} from '@dao-dao/utils'

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
        DaoCoreV2Selectors.allAccountsSelector({
          chainId: nativeChainId,
          contractAddress: coreAddress,
        })
      )

      const uniqueChainIds = [
        ...new Set(allAccounts.map((account) => account.chainId)),
      ]

      return uniqueChainIds.reduce((acc, chainId) => {
        const accounts = allAccounts.filter(
          (account) => account.chainId === chainId
        )

        const nativeBalancesLoadables = get(
          waitForNone(
            accounts.map(({ address }) =>
              nativeBalancesSelector({
                chainId,
                address,
              })
            )
          )
        )
        const nativeBalances = nativeBalancesLoadables.flatMap(
          (loadable, index) =>
            loadable.state === 'hasValue'
              ? {
                  account: accounts[index],
                  balances: loadable.contents,
                }
              : []
        )

        const cw20sLoadable =
          // Only load cw20s on native chain.
          chainId === nativeChainId
            ? get(
                waitForNone([
                  DaoCoreV2Selectors.allCw20TokensWithBalancesSelector({
                    contractAddress: coreAddress,
                    chainId,
                    governanceTokenAddress: cw20GovernanceTokenAddress,
                  }),
                ])
              )
            : []
        const cw20s = cw20sLoadable.flatMap((loadable) =>
          loadable.state === 'hasValue'
            ? {
                account: {
                  type: 'native',
                  chainId,
                  address: coreAddress,
                } as DaoAccount,
                balances: loadable.contents,
              }
            : []
        )

        // Collect loadables so we can check loading status below.
        const loadables = [...nativeBalancesLoadables, ...cw20sLoadable]
        // Updating if any loadables are still loading. If none are loading but
        // a native token is still waiting for staking info, this is updated
        // below.
        let updating = loadables.some(
          (loadable) => loadable.state === 'loading'
        )

        // Get token card infos for loaded tokens.
        const infos: TokenCardInfo[] = [
          ...nativeBalances.flatMap(
            ({ account: { address, type }, balances }) =>
              balances.flatMap(({ token, balance }): TokenCardInfo | [] => {
                const unstakedBalance = convertMicroDenomToDenomWithDecimals(
                  balance,
                  token.decimals
                )

                let hasStakingInfo = false
                // Staking info only exists for native token.
                if (
                  token.denomOrAddress ===
                  getNativeTokenForChainId(chainId).denomOrAddress
                ) {
                  // Check if anything staked.
                  const stakedBalance = get(
                    noWait(
                      nativeDelegatedBalanceSelector({
                        chainId,
                        address,
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

                return {
                  owner: address,
                  daoOwnerType: type,
                  token,
                  // True if native token DAO and using this denom.
                  isGovernanceToken:
                    nativeGovernanceTokenDenom === token.denomOrAddress,
                  unstakedBalance,
                  hasStakingInfo,

                  lazyInfo: { loading: true },
                }
              })
          ),
          ...cw20s.flatMap(({ account: { address, type }, balances }) =>
            balances.map(
              ({ token, balance, isGovernanceToken }): TokenCardInfo => {
                const unstakedBalance = convertMicroDenomToDenomWithDecimals(
                  balance,
                  token.decimals
                )

                return {
                  owner: address,
                  daoOwnerType: type,
                  token,
                  isGovernanceToken: isGovernanceToken ?? false,
                  unstakedBalance,
                  // No staking info for CW20.
                  hasStakingInfo: false,

                  lazyInfo: { loading: true },
                }
              }
            )
          ),
        ]

        return {
          ...acc,
          [chainId]:
            accounts.length > 0 &&
            loadables.every((loadable) => loadable.state === 'loading')
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
