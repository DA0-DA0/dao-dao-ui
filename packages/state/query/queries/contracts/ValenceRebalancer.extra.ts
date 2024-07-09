import { QueryClient, queryOptions, skipToken } from '@tanstack/react-query'

import { GenericToken, TokenType } from '@dao-dao/types'

import { tokenQueries } from '../token'
import { valenceRebalancerQueries } from './ValenceRebalancer'

/**
 * Get the generic tokens for the whitelisted tokens in the rebalancer.
 */
export const fetchValenceRebalancerWhitelistGenericTokens = async (
  queryClient: QueryClient,
  {
    chainId,
    address,
  }: {
    chainId: string
    address: string
  }
): Promise<{
  baseDenoms: GenericToken[]
  denoms: GenericToken[]
}> => {
  const whitelists = await queryClient.fetchQuery(
    valenceRebalancerQueries.getWhiteLists({
      chainId,
      contractAddress: address,
    })
  )

  const [baseDenoms, denoms] = await Promise.all([
    Promise.all(
      whitelists.base_denom_whitelist.map(({ denom }) =>
        queryClient.fetchQuery(
          tokenQueries.info(queryClient, {
            chainId,
            type: TokenType.Native,
            denomOrAddress: denom,
          })
        )
      )
    ),
    Promise.all(
      whitelists.denom_whitelist.map((denom) =>
        queryClient.fetchQuery(
          tokenQueries.info(queryClient, {
            chainId,
            type: TokenType.Native,
            denomOrAddress: denom,
          })
        )
      )
    ),
  ])

  return {
    baseDenoms,
    denoms,
  }
}

export const valenceRebalancerExtraQueries = {
  /**
   * Get the generic tokens for the whitelisted tokens in the rebalancer.
   */
  whitelistGenericTokens: (
    queryClient: QueryClient,
    options?: Parameters<typeof fetchValenceRebalancerWhitelistGenericTokens>[1]
  ) =>
    queryOptions({
      queryKey: ['valenceRebalancerExtra', 'whitelistGenericTokens', options],
      queryFn: options
        ? () =>
            fetchValenceRebalancerWhitelistGenericTokens(queryClient, options)
        : skipToken,
    }),
}
