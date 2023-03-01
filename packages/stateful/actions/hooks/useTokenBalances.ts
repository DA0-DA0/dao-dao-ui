import { useCachedLoading } from '@dao-dao/stateless'
import { GenericTokenBalance, LoadingData } from '@dao-dao/types'

import { genericTokenBalancesSelector } from '../../recoil'
import { useCw20CommonGovernanceTokenInfoIfExists } from '../../voting-module-adapter'
import { useActionOptions } from '../react'

// Get native and cw20 token balances for the current context address.
export const useTokenBalances = (): LoadingData<GenericTokenBalance[]> => {
  const { address, chainId } = useActionOptions()

  // Get CW20 governance token address from voting module adapter if exists, so
  // we can make sure to load it with all cw20 balances, even if it has not been
  // explicitly added to the DAO.
  const { denomOrAddress: governanceTokenAddress } =
    useCw20CommonGovernanceTokenInfoIfExists() ?? {}

  return useCachedLoading(
    genericTokenBalancesSelector({
      address,
      cw20GovernanceTokenAddress: governanceTokenAddress,
      chainId,
    }),
    []
  )
}
