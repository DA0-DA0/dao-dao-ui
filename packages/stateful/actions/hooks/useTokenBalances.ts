import { useMemo } from 'react'
import { waitForAll } from 'recoil'

import {
  communityPoolBalancesSelector,
  genericTokenBalanceSelector,
  genericTokenBalancesSelector,
} from '@dao-dao/state'
import { useCachedLoading } from '@dao-dao/stateless'
import {
  ActionContextType,
  GenericToken,
  GenericTokenBalance,
  LoadingData,
  TokenType,
} from '@dao-dao/types'

import { useCw20CommonGovernanceTokenInfoIfExists } from '../../voting-module-adapter'
import { useActionOptions } from '../react'

export type UseTokenBalancesOptions = {
  // Only return balances for tokens of this type.
  filter?: TokenType
  // If these are not returned in the balances, they will be added to the end.
  additionalTokens?: Pick<GenericToken, 'chainId' | 'type' | 'denomOrAddress'>[]
  // If true, will return balances for all polytone proxies if this is a DAO.
  // Defaults to false.
  allChains?: boolean
}

// TODO: refactor to use accounts selector, make genericTokenBalancesSelector use accounts?

// Get native and cw20 token balances for the current context address.
export const useTokenBalances = ({
  filter,
  additionalTokens,
  allChains = false,
}: UseTokenBalancesOptions = {}): LoadingData<GenericTokenBalance[]> => {
  const {
    address,
    chain: { chain_id: chainId },
    context,
  } = useActionOptions()

  // Get CW20 governance token address from voting module adapter if exists, so
  // we can make sure to load it with all cw20 balances, even if it has not been
  // explicitly added to the DAO.
  const { denomOrAddress: governanceTokenAddress } =
    useCw20CommonGovernanceTokenInfoIfExists() ?? {}

  const balances = useCachedLoading(
    context.type === ActionContextType.Gov
      ? // Get gov module balances from community pool query.
        communityPoolBalancesSelector({
          chainId,
        })
      : genericTokenBalancesSelector({
          address,
          cw20GovernanceTokenAddress: governanceTokenAddress,
          chainId,
          filter,
        }),
    []
  )

  const additionalBalances = useCachedLoading(
    waitForAll(
      context.type === ActionContextType.Gov
        ? []
        : additionalTokens?.map((token) =>
            genericTokenBalanceSelector({
              ...token,
              walletAddress: address,
            })
          ) ?? []
    ),
    []
  )

  const polytoneBalances = useCachedLoading(
    waitForAll(
      allChains && context.type === ActionContextType.Dao
        ? Object.entries(context.info.polytoneProxies).map(([chainId, proxy]) =>
            genericTokenBalancesSelector({
              address: proxy,
              chainId,
              filter: TokenType.Native,
            })
          )
        : []
    ),
    []
  )

  const allPolytoneBalances = useMemo(
    () => (polytoneBalances.loading ? [] : polytoneBalances.data.flat()),
    [polytoneBalances]
  )

  return useMemo(() => {
    if (
      balances.loading ||
      additionalBalances.loading ||
      polytoneBalances.loading
    ) {
      return { loading: true }
    }

    const allBalances = [
      ...balances.data,
      // Add balances from other chains.
      ...allPolytoneBalances,
    ]
    // Add additional balances that are not already in all balances.
    allBalances.push(
      ...additionalBalances.data.filter(
        ({ token: additionalToken }) =>
          !allBalances.some(
            ({ token: balanceToken }) =>
              balanceToken.chainId === additionalToken.chainId &&
              balanceToken.type === additionalToken.type &&
              balanceToken.denomOrAddress === additionalToken.denomOrAddress
          )
      )
    )

    return {
      loading: false,
      updating:
        balances.updating ||
        additionalBalances.updating ||
        polytoneBalances.updating,
      data: allBalances,
    }
  }, [balances, additionalBalances, polytoneBalances, allPolytoneBalances])
}
