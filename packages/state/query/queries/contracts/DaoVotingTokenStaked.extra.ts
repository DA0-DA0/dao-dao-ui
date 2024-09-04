import { QueryClient, queryOptions } from '@tanstack/react-query'

import { ContractName } from '@dao-dao/utils'

import { contractQueries } from '../contract'
import { daoVotingTokenStakedQueries } from './DaoVotingTokenStaked'

/**
 * Returns the cw-tokenfactory-issuer contract address if this voting module
 * uses a token factory denom and uses a cw-tokenfactory-issuer contract.
 */
export const fetchValidatedTokenfactoryIssuerContract = async (
  queryClient: QueryClient,
  {
    chainId,
    address,
  }: {
    chainId: string
    address: string
  }
): Promise<string | null> => {
  const { denom } = await queryClient.fetchQuery(
    daoVotingTokenStakedQueries.denom(queryClient, {
      chainId,
      contractAddress: address,
    })
  )

  if (!denom.startsWith('factory/')) {
    return null
  }

  const tokenContract = await queryClient.fetchQuery(
    daoVotingTokenStakedQueries.tokenContract(queryClient, {
      chainId,
      contractAddress: address,
    })
  )

  if (!tokenContract) {
    return null
  }

  const isTfIssuer = await queryClient.fetchQuery(
    contractQueries.isContract(queryClient, {
      chainId,
      address: tokenContract,
      nameOrNames: ContractName.CwTokenfactoryIssuer,
    })
  )

  if (!isTfIssuer) {
    return null
  }

  return tokenContract
}

export const daoVotingTokenStakedExtraQueries = {
  /**
   * Returns the cw-tokenfactory-issuer contract address if this voting module
   * uses a token factory denom and uses a cw-tokenfactory-issuer contract.
   */
  validatedTokenfactoryIssuerContract: (
    queryClient: QueryClient,
    options: Parameters<typeof fetchValidatedTokenfactoryIssuerContract>[1]
  ) =>
    queryOptions({
      queryKey: [
        'daoVotingTokenStakedExtra',
        'validatedTokenfactoryIssuerContract',
        options,
      ],
      queryFn: () =>
        fetchValidatedTokenfactoryIssuerContract(queryClient, options),
    }),
}
