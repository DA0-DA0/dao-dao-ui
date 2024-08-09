import { QueryClient, queryOptions } from '@tanstack/react-query'

import { LockInfosResponse } from '@dao-dao/types/contracts/OraichainCw20Staking'

import { OraichainCw20StakingQueryClient } from '../../../contracts/OraichainCw20Staking'
import { oraichainCw20StakingQueries } from './OraichainCw20Staking'

/**
 * List all lock infos for Oraichain's cw20-staking contract.
 */
export const listAllOraichainCw20StakingLockInfos = async (
  queryClient: QueryClient,
  {
    chainId,
    address,
    stakerAddr,
    stakingToken,
  }: {
    chainId: string
    address: string
  } & Pick<
    Parameters<OraichainCw20StakingQueryClient['lockInfos']>[0],
    'stakerAddr' | 'stakingToken'
  >
): Promise<LockInfosResponse> => {
  const response: LockInfosResponse = {
    lock_infos: [],
    staker_addr: '',
    staking_token: '',
  }

  const limit = 30
  while (true) {
    const page = await queryClient.fetchQuery(
      oraichainCw20StakingQueries.lockInfos({
        chainId,
        contractAddress: address,
        args: {
          stakerAddr,
          stakingToken,
          order: 1, // descending
          startAfter:
            response.lock_infos[response.lock_infos.length - 1]?.unlock_time,
          limit,
        },
      })
    )

    if (!page.staker_addr) {
      response.staker_addr = page.staker_addr
    }
    if (!page.staking_token) {
      response.staking_token = page.staking_token
    }

    response.lock_infos.push(...page.lock_infos)

    // If we have less than the limit of items, we've exhausted them.
    if (response.lock_infos.length < limit) {
      break
    }
  }

  return response
}

export const oraichainCw20StakingExtraQueries = {
  /**
   * Get all lock infos for Oraichain's cw20-staking contract.
   */
  listAllLockInfos: (
    queryClient: QueryClient,
    options: Parameters<typeof listAllOraichainCw20StakingLockInfos>[1]
  ) =>
    queryOptions({
      queryKey: ['oraichainCw20StakingExtra', 'listAllLockInfos', options],
      queryFn: () => listAllOraichainCw20StakingLockInfos(queryClient, options),
    }),
}
