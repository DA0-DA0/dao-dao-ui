import { QueryClient, queryOptions } from '@tanstack/react-query'

import { DaoRewardDistribution, TokenType } from '@dao-dao/types'
import { DistributionState } from '@dao-dao/types/contracts/DaoRewardsDistributor'

import { indexerQueries } from '../indexer'
import { tokenQueries } from '../token'
import { daoRewardsDistributorQueries } from './DaoRewardsDistributor'

/**
 * Fetch a DAO reward distribution.
 */
export const fetchDaoRewardDistribution = async (
  queryClient: QueryClient,
  {
    chainId,
    address,
    id,
  }: {
    chainId: string
    address: string
    id: number
  }
): Promise<DaoRewardDistribution> => {
  const state = await queryClient.fetchQuery(
    daoRewardsDistributorQueries.distribution(queryClient, {
      chainId,
      contractAddress: address,
      args: {
        id,
      },
    })
  )

  const token = await queryClient.fetchQuery(
    tokenQueries.info(queryClient, {
      chainId,
      type: 'cw20' in state.denom ? TokenType.Cw20 : TokenType.Native,
      denomOrAddress:
        'cw20' in state.denom ? state.denom.cw20 : state.denom.native,
    })
  )

  return {
    chainId,
    address,
    token,
    ...state,
  }
}

/**
 * Fetch all DAO reward distributions.
 */
export const fetchDaoRewardDistributions = async (
  queryClient: QueryClient,
  {
    chainId,
    address,
  }: {
    chainId: string
    address: string
  }
): Promise<DaoRewardDistribution[]> => {
  let states: DistributionState[] | undefined
  try {
    states = (
      await queryClient.fetchQuery(
        indexerQueries.queryContract(queryClient, {
          chainId,
          contractAddress: address,
          formula: 'daoRewardsDistributor/distributions',
        })
      )
    ).distributions
  } catch (err) {
    console.error(err)
  }

  // If indexer query fails, fallback to contract query.
  if (!states) {
    states = []
    const limit = 30
    while (true) {
      const page = (
        await queryClient.fetchQuery(
          daoRewardsDistributorQueries.distributions(queryClient, {
            chainId,
            contractAddress: address,
            args: {
              limit,
              startAfter: states[states.length - 1]?.id,
            },
          })
        )
      )?.distributions

      if (!page?.length) {
        break
      }

      states.push(...page)

      // If we have less than the limit of items, we've exhausted them.
      if (page.length < limit) {
        break
      }
    }
  }

  const distributions = await Promise.all(
    states.map(async (state): Promise<DaoRewardDistribution> => {
      const token = await queryClient.fetchQuery(
        tokenQueries.info(queryClient, {
          chainId,
          type: 'cw20' in state.denom ? TokenType.Cw20 : TokenType.Native,
          denomOrAddress:
            'cw20' in state.denom ? state.denom.cw20 : state.denom.native,
        })
      )

      return {
        chainId,
        address,
        token,
        ...state,
      }
    })
  )

  // Cache individually.
  for (const distribution of distributions) {
    queryClient.setQueryData(
      daoRewardsDistributorExtraQueries.distribution(queryClient, {
        chainId,
        address,
        id: distribution.id,
      }).queryKey,
      distribution
    )
  }

  return distributions
}

export const daoRewardsDistributorExtraQueries = {
  /**
   * Fetch a reward distribution.
   */
  distribution: (
    queryClient: QueryClient,
    options: Parameters<typeof fetchDaoRewardDistribution>[1]
  ) =>
    queryOptions({
      queryKey: ['daoRewardsDistributorExtra', 'distribution', options],
      queryFn: () => fetchDaoRewardDistribution(queryClient, options),
    }),
  /**
   * Fetch all DAO reward distributions.
   */
  distributions: (
    queryClient: QueryClient,
    options: Parameters<typeof fetchDaoRewardDistributions>[1]
  ) =>
    queryOptions({
      queryKey: ['daoRewardsDistributorExtra', 'distributions', options],
      queryFn: () => fetchDaoRewardDistributions(queryClient, options),
    }),
}
