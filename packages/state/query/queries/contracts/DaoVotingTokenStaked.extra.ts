import { QueryClient, queryOptions } from '@tanstack/react-query'

import { HugeDecimal } from '@dao-dao/math'
import { ContractName, chainIsIndexed } from '@dao-dao/utils'

import { contractQueries } from '../contract'
import { indexerQueries } from '../indexer'
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
    daoVotingTokenStakedQueries.denom({
      chainId,
      contractAddress: address,
    })
  )

  if (!denom.startsWith('factory/')) {
    return null
  }

  const tokenContract = await queryClient.fetchQuery(
    daoVotingTokenStakedQueries.tokenContract({
      chainId,
      contractAddress: address,
    })
  )

  if (!tokenContract) {
    return null
  }

  const isTfIssuer = await queryClient.fetchQuery(
    contractQueries.isContract({
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

/**
 * Fetch dao-voting-token-staked voting module top stakers.
 */
export const fetchDaoVotingTokenStakedTopStakers = async (
  queryClient: QueryClient,
  {
    chainId,
    address,
    legacyNativeStaked,
  }: {
    chainId: string
    address: string
    legacyNativeStaked?: boolean
  }
): Promise<
  {
    address: string
    balance: string
    votingPowerPercent: number
  }[]
> => {
  if (chainIsIndexed(chainId)) {
    return (
      (await queryClient.fetchQuery(
        indexerQueries.queryContract({
          chainId,
          contractAddress: address,
          formula: legacyNativeStaked
            ? 'daoVotingNativeStaked/topStakers'
            : 'daoVotingTokenStaked/topStakers',
          noFallback: true,
        })
      )) || []
    )
  }

  // Fallback to contract query if not indexed.
  const { power: totalStaked } = await queryClient.fetchQuery(
    daoVotingTokenStakedQueries.totalPowerAtHeight({
      chainId,
      contractAddress: address,
      args: {},
    })
  )

  const pageLimit = 30
  const topStakers: {
    address: string
    balance: string
    votingPowerPercent: number
  }[] = []

  while (true) {
    const { stakers } = await queryClient.fetchQuery(
      daoVotingTokenStakedQueries.listStakers({
        chainId,
        contractAddress: address,
        args: {
          startAfter: topStakers[topStakers.length - 1]?.address,
          limit: pageLimit,
        },
      })
    )

    topStakers.push(
      ...stakers.map(({ address, balance }) => ({
        address,
        balance,
        votingPowerPercent: HugeDecimal.from(balance)
          .div(totalStaked)
          .times(100)
          .toNumber(),
      }))
    )

    // If we have less than the limit of items, we've exhausted them.
    if (stakers.length < pageLimit) {
      break
    }
  }

  topStakers.sort((a, b) => b.votingPowerPercent - a.votingPowerPercent)

  return topStakers
}

export const daoVotingTokenStakedExtraQueries = {
  /**
   * Returns the cw-tokenfactory-issuer contract address if this voting module
   * uses a token factory denom and uses a cw-tokenfactory-issuer contract.
   */
  validatedTokenfactoryIssuerContract: (
    options: Parameters<typeof fetchValidatedTokenfactoryIssuerContract>[1]
  ) =>
    queryOptions({
      queryKey: [
        'daoVotingTokenStakedExtra',
        'validatedTokenfactoryIssuerContract',
        options,
      ],
      queryFn: (ctx) =>
        fetchValidatedTokenfactoryIssuerContract(ctx.client, options),
    }),
  /**
   * Fetch token-staked voting module top stakers.
   */
  topStakers: (
    options: Parameters<typeof fetchDaoVotingTokenStakedTopStakers>[1]
  ) =>
    queryOptions({
      queryKey: ['daoVotingTokenStakedExtra', 'topStakers', options],
      queryFn: (ctx) =>
        fetchDaoVotingTokenStakedTopStakers(ctx.client, options),
    }),
}
