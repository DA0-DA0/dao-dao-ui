import { QueryClient, queryOptions } from '@tanstack/react-query'

import {
  ActiveThreshold,
  ActiveThresholdResponse,
} from '@dao-dao/types/contracts/common'
import { getCosmWasmClientForChainId } from '@dao-dao/utils'

import { indexerQueries } from '../indexer'

/**
 * Fetch whether or not the voting module is active.
 */
export const fetchVotingModuleIsActive = async ({
  chainId,
  address,
}: {
  chainId: string
  address: string
}): Promise<boolean> =>
  (await getCosmWasmClientForChainId(chainId)).queryContractSmart(address, {
    is_active: {},
  })

/**
 * Fetch whether or not the voting module is active.
 */
export const fetchVotingModuleActiveThreshold = async (
  queryClient: QueryClient,
  {
    chainId,
    address,
  }: {
    chainId: string
    address: string
  }
): Promise<ActiveThresholdResponse> => {
  try {
    return {
      active_threshold: await queryClient.fetchQuery(
        indexerQueries.queryContract<ActiveThreshold>(queryClient, {
          chainId,
          contractAddress: address,
          formula: 'daoVoting/activeThreshold',
        })
      ),
    }
  } catch (error) {
    console.error(error)
  }

  // If indexer fails, fallback to querying chain.
  return (await getCosmWasmClientForChainId(chainId)).queryContractSmart(
    address,
    {
      active_threshold: {},
    }
  )
}

/**
 * Common voting module queries.
 */
export const votingModuleQueries = {
  /**
   * Fetch whether or not the voting module is active.
   */
  isActive: (options: Parameters<typeof fetchVotingModuleIsActive>[0]) =>
    queryOptions({
      queryKey: ['votingModule', 'isActive', options],
      queryFn: () => fetchVotingModuleIsActive(options),
    }),
  /**
   * Fetch the active threshold.
   */
  activeThresold: (
    queryClient: QueryClient,
    options: Parameters<typeof fetchVotingModuleActiveThreshold>[1]
  ) =>
    queryOptions({
      queryKey: ['votingModule', 'activeThresold', options],
      queryFn: () => fetchVotingModuleActiveThreshold(queryClient, options),
    }),
}
