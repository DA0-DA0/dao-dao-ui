import { useMemo } from 'react'
import { waitForAll } from 'recoil'

import {
  genericTokenBalanceSelector,
  genericTokenBalancesSelector,
} from '@dao-dao/state'
import { useCachedLoading } from '@dao-dao/stateless'
import {
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
  additionalTokens?: Pick<GenericToken, 'type' | 'denomOrAddress'>[]
}

// Get native and cw20 token balances for the current context address.
export const useTokenBalances = ({
  filter,
  additionalTokens,
}: UseTokenBalancesOptions = {}): LoadingData<GenericTokenBalance[]> => {
  const { address, chainId } = useActionOptions()

  // Get CW20 governance token address from voting module adapter if exists, so
  // we can make sure to load it with all cw20 balances, even if it has not been
  // explicitly added to the DAO.
  const { denomOrAddress: governanceTokenAddress } =
    useCw20CommonGovernanceTokenInfoIfExists() ?? {}

  const balances = useCachedLoading(
    genericTokenBalancesSelector({
      address,
      cw20GovernanceTokenAddress: governanceTokenAddress,
      chainId,
      filter,
    }),
    []
  )

  const additionalBalances = useCachedLoading(
    waitForAll(
      additionalTokens?.map((token) =>
        genericTokenBalanceSelector({
          ...token,
          walletAddress: address,
          chainId,
        })
      ) ?? []
    ),
    []
  )

  return useMemo(
    () =>
      balances.loading || additionalBalances.loading
        ? { loading: true }
        : {
            ...balances,
            data: [
              ...balances.data,
              ...additionalBalances.data
                // Filter out any tokens that are already in the balances.
                .filter(
                  ({ token: additionalToken }) =>
                    !balances.data.some(
                      ({ token: balanceToken }) =>
                        balanceToken.type === additionalToken.type &&
                        balanceToken.denomOrAddress ===
                          additionalToken.denomOrAddress
                    )
                ),
            ],
          },
    [balances, additionalBalances]
  )
}
