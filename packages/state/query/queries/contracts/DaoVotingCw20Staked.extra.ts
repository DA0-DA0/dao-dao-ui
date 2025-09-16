import { QueryClient, queryOptions } from '@tanstack/react-query'

import { HugeDecimal } from '@dao-dao/math'
import { chainIsIndexed } from '@dao-dao/utils'

import { indexerQueries } from '../indexer'
import { cw20StakeQueries } from './Cw20Stake'
import { daoVotingCw20StakedQueries } from './DaoVotingCw20Staked'

/**
 * Fetch dao-voting-cw20-staked voting module top stakers.
 */
export const fetchDaoVotingCw20StakedTopStakers = async (
  queryClient: QueryClient,
  {
    chainId,
    address,
  }: {
    chainId: string
    address: string
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
          formula: 'daoVotingCw20Staked/topStakers',
          noFallback: true,
        })
      )) || []
    )
  }

  // Fallback to contract query if not indexed.
  const [cw20Stake, { power: totalStaked }] = await Promise.all([
    queryClient.fetchQuery(
      daoVotingCw20StakedQueries.stakingContract({
        chainId,
        contractAddress: address,
      })
    ),
    queryClient.fetchQuery(
      daoVotingCw20StakedQueries.totalPowerAtHeight({
        chainId,
        contractAddress: address,
        args: {},
      })
    ),
  ])

  const pageLimit = 30
  const topStakers: {
    address: string
    balance: string
    votingPowerPercent: number
  }[] = []

  while (true) {
    const { stakers } = await queryClient.fetchQuery(
      cw20StakeQueries.listStakers({
        chainId,
        contractAddress: cw20Stake,
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

export const daoVotingCw20StakedExtraQueries = {
  /**
   * Fetch cw20-staked voting module top stakers.
   */
  topStakers: (
    options: Parameters<typeof fetchDaoVotingCw20StakedTopStakers>[1]
  ) =>
    queryOptions({
      queryKey: ['daoVotingCw20StakedExtra', 'topStakers', options],
      queryFn: (ctx) => fetchDaoVotingCw20StakedTopStakers(ctx.client, options),
    }),
}
