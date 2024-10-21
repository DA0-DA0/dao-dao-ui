import { QueryClient, queryOptions } from '@tanstack/react-query'
import uniq from 'lodash.uniq'

import { HugeDecimal } from '@dao-dao/math'
import {
  DaoRewardDistribution,
  GenericTokenBalanceAndValue,
  GenericTokenWithUsdPrice,
  PendingDaoRewards,
  TokenType,
} from '@dao-dao/types'
import {
  DistributionPendingRewards,
  DistributionState,
  PendingRewardsResponse,
} from '@dao-dao/types/contracts/DaoRewardsDistributor'
import {
  deserializeTokenSource,
  getRewardDistributorStorageItemKey,
  serializeTokenSource,
  tokenSourcesEqual,
} from '@dao-dao/utils'

import { indexerQueries } from '../indexer'
import { tokenQueries } from '../token'
import { daoDaoCoreQueries } from './DaoDaoCore'
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
    const limit = 15
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

      // Cache each distribution individually, to be used in the distribution
      // query at the bottom of this function.
      for (const distribution of page) {
        queryClient.setQueryData(
          daoRewardsDistributorQueries.distribution(queryClient, {
            chainId,
            contractAddress: address,
            args: {
              id: distribution.id,
            },
          }).queryKey,
          distribution
        )
      }

      states.push(...page)

      // If we have less than the limit of items, we've exhausted them.
      if (page.length < limit) {
        break
      }
    }
  }

  const distributions = await Promise.all(
    states.map(({ id }) =>
      queryClient.fetchQuery(
        daoRewardsDistributorExtraQueries.distribution(queryClient, {
          chainId,
          address,
          id,
        })
      )
    )
  )

  return distributions
}

/**
 * List all pending rewards.
 */
export const listAllDaoRewardDistributorPendingRewards = async (
  queryClient: QueryClient,
  {
    chainId,
    address,
    recipient,
  }: {
    chainId: string
    address: string
    recipient: string
  }
): Promise<PendingRewardsResponse> => {
  const rewards: DistributionPendingRewards[] = []

  const limit = 15
  while (true) {
    const page = (
      await queryClient.fetchQuery(
        daoRewardsDistributorQueries.pendingRewards({
          chainId,
          contractAddress: address,
          args: {
            address: recipient,
            limit,
            startAfter: rewards[rewards.length - 1]?.id,
          },
        })
      )
    )?.pending_rewards

    if (!page?.length) {
      break
    }

    rewards.push(...page)

    // If we have less than the limit of items, we've exhausted them.
    if (page.length < limit) {
      break
    }
  }

  return {
    pending_rewards: rewards,
  }
}

/**
 * Fetch all DAO reward distributions.
 */
export const fetchAllDaoRewardDistributions = async (
  queryClient: QueryClient,
  {
    chainId,
    daoAddress,
  }: {
    chainId: string
    daoAddress: string
  }
): Promise<DaoRewardDistribution[]> => {
  // Active distributors for a DAO.
  const distributors = (
    await queryClient.fetchQuery(
      daoDaoCoreQueries.listAllItems(queryClient, {
        chainId,
        contractAddress: daoAddress,
        args: {
          prefix: getRewardDistributorStorageItemKey(''),
        },
      })
    )
  ).map(([, value]) => value)

  // Fetch all distributions with pending rewards from all distributors.
  const distributions = (
    await Promise.all(
      distributors.map((address) =>
        queryClient.fetchQuery(
          daoRewardsDistributorExtraQueries.distributions(queryClient, {
            chainId,
            address,
          })
        )
      )
    )
  ).flat()

  return distributions
}

/**
 * Fetch all DAO reward distributions and pending rewards for an account.
 */
export const fetchPendingDaoRewards = async (
  queryClient: QueryClient,
  {
    chainId,
    daoAddress,
    recipient,
  }: {
    chainId: string
    daoAddress: string
    recipient: string
  }
): Promise<PendingDaoRewards> => {
  // Active distributors for a DAO.
  const distributors = (
    await queryClient.fetchQuery(
      daoDaoCoreQueries.listAllItems(queryClient, {
        chainId,
        contractAddress: daoAddress,
        args: {
          prefix: getRewardDistributorStorageItemKey(''),
        },
      })
    )
  ).map(([, value]) => value)

  // Fetch all distributions with pending rewards from all distributors.
  const distributions = (
    await Promise.all(
      distributors.map(
        async (address): Promise<PendingDaoRewards['distributions']> => {
          const [distributions, { pending_rewards }] = await Promise.all([
            queryClient.fetchQuery(
              daoRewardsDistributorExtraQueries.distributions(queryClient, {
                chainId,
                address,
              })
            ),
            queryClient.fetchQuery(
              daoRewardsDistributorExtraQueries.listAllPendingRewards(
                queryClient,
                {
                  chainId,
                  address,
                  recipient,
                }
              )
            ),
          ])

          return distributions.map((distribution) => ({
            distribution,
            rewards: HugeDecimal.from(
              pending_rewards.find((pending) => pending.id === distribution.id)
                ?.pending_rewards || 0
            ),
          }))
        }
      )
    )
  ).flat()

  const uniqueTokenSources = uniq(
    distributions.map(({ distribution }) =>
      serializeTokenSource(distribution.token)
    )
  )

  const rewards = await Promise.all(
    uniqueTokenSources.map(
      async (source): Promise<GenericTokenBalanceAndValue> => {
        // These should already be cached from the distributions query.
        const {
          token,
          usdPrice = 0,
          timestamp = new Date(),
        } = await queryClient
          .fetchQuery(
            tokenQueries.usdPrice(queryClient, deserializeTokenSource(source))
          )
          // If failed to load price, just load token info with no price.
          .catch(
            async (): Promise<GenericTokenWithUsdPrice> => ({
              token: await queryClient.fetchQuery(
                tokenQueries.info(queryClient, deserializeTokenSource(source))
              ),
            })
          )

        // Sum all pending rewards for this token.
        const allPendingRewards = distributions.reduce(
          (acc, { distribution, rewards }) =>
            acc.plus(
              tokenSourcesEqual(token, distribution.token) ? rewards : 0
            ),
          HugeDecimal.zero
        )

        const balance = allPendingRewards.toHumanReadableNumber(token.decimals)
        const usdValue = allPendingRewards.toUsdValue(token.decimals, usdPrice)

        return {
          token,
          balance,
          usdValue,
          timestamp,
        }
      }
    )
  )

  return {
    distributions,
    rewards,
  }
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
  /**
   * List all pending rewards.
   */
  listAllPendingRewards: (
    queryClient: QueryClient,
    options: Parameters<typeof listAllDaoRewardDistributorPendingRewards>[1]
  ) =>
    queryOptions({
      queryKey: [
        'daoRewardsDistributorExtra',
        'listAllPendingRewards',
        options,
      ],
      queryFn: () =>
        listAllDaoRewardDistributorPendingRewards(queryClient, options),
    }),
  /**
   * Fetch all DAO reward distributions.
   */
  allDistributions: (
    queryClient: QueryClient,
    options: Parameters<typeof fetchAllDaoRewardDistributions>[1]
  ) =>
    queryOptions({
      queryKey: ['daoRewardsDistributorExtra', 'allDistributions', options],
      queryFn: () => fetchAllDaoRewardDistributions(queryClient, options),
    }),
  /**
   * Fetch all DAO reward distributions and pending rewards for an account.
   */
  pendingDaoRewards: (
    queryClient: QueryClient,
    options: Parameters<typeof fetchPendingDaoRewards>[1]
  ) =>
    queryOptions({
      queryKey: ['daoRewardsDistributorExtra', 'pendingDaoRewards', options],
      queryFn: () => fetchPendingDaoRewards(queryClient, options),
    }),
}
