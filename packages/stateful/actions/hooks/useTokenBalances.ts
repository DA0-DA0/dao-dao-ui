import {
  allBalancesSelector,
  communityPoolBalancesSelector,
} from '@dao-dao/state'
import { useActionOptions, useCachedLoading } from '@dao-dao/stateless'
import {
  AccountType,
  ActionContextType,
  GenericToken,
  GenericTokenBalanceWithOwner,
  LoadingData,
  TokenType,
} from '@dao-dao/types'

import { useCw20CommonGovernanceTokenInfoIfExists } from '../../voting-module-adapter'

export type UseTokenBalancesOptions = {
  /**
   * Only return balances for tokens of this type.
   */
  filter?: TokenType
  /**
   * If these are not returned in the balances, they will be added to the end.
   */
  additionalTokens?: Pick<GenericToken, 'chainId' | 'type' | 'denomOrAddress'>[]
  /**
   * Don't load balances from Valence accounts. Defaults to true.
   */
  ignoreValence?: boolean
  /**
   * Include only these account types.
   */
  includeAccountTypes?: AccountType[]
  /**
   * Exclude these account types.
   *
   * Valence account funds must first be withdrawn into the DAO's treasury
   * before they can be used in actions, so this defaults to excluding them.
   */
  excludeAccountTypes?: AccountType[]
}

// Get native and cw20 token unstaked balances for the current context account.
export const useTokenBalances = ({
  filter,
  additionalTokens,
  includeAccountTypes,
  excludeAccountTypes = [AccountType.Valence],
}: UseTokenBalancesOptions = {}): LoadingData<
  GenericTokenBalanceWithOwner[]
> => {
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
      : allBalancesSelector({
          chainId,
          address,
          cw20GovernanceTokenAddress: governanceTokenAddress,
          filter,
          additionalTokens,
          // This hook is used to fetch usable balances for actions. Staked
          // balances are not desired.
          ignoreStaked: true,
          includeAccountTypes,
          excludeAccountTypes,
        }),
    [],
    (error) => console.error(error)
  )

  return balances
}
