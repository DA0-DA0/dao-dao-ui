import { selectorFamily } from 'recoil'

import { WithChainId } from '@dao-dao/types'
import {
  ActiveThresholdResponse,
  DaoResponse,
  InfoResponse,
  IsActiveResponse,
  StakingContractResponse,
  TokenContractResponse,
  TotalPowerAtHeightResponse,
  VotingPowerAtHeightResponse,
} from '@dao-dao/types/contracts/DaoVotingCw20Staked'

import { DaoVotingCw20StakedQueryClient } from '../../../contracts/DaoVotingCw20Staked'
import { refreshWalletBalancesIdAtom } from '../../atoms/refresh'
import { cosmWasmClientForChainSelector } from '../chain'
import { queryContractIndexerSelector } from '../indexer'

type QueryClientParams = WithChainId<{
  contractAddress: string
}>

const queryClient = selectorFamily<
  DaoVotingCw20StakedQueryClient,
  QueryClientParams
>({
  key: 'daoVotingCw20StakedQueryClient',
  get:
    ({ contractAddress, chainId }) =>
    ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      return new DaoVotingCw20StakedQueryClient(client, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export const stakingContractSelector = selectorFamily<
  StakingContractResponse,
  QueryClientParams & {
    params: Parameters<DaoVotingCw20StakedQueryClient['stakingContract']>
  }
>({
  key: 'daoVotingCw20StakedStakingContract',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const stakingContract = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formula: 'daoVotingCw20Staked/stakingContract',
        })
      )
      if (stakingContract) {
        return stakingContract
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.stakingContract(...params)
    },
})
export const daoSelector = selectorFamily<
  DaoResponse,
  QueryClientParams & {
    params: Parameters<DaoVotingCw20StakedQueryClient['dao']>
  }
>({
  key: 'daoVotingCw20StakedDao',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const dao = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formula: 'daoVotingCw20Staked/dao',
        })
      )
      if (dao) {
        return dao
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.dao(...params)
    },
})
export const activeThresholdSelector = selectorFamily<
  ActiveThresholdResponse,
  QueryClientParams & {
    params: Parameters<DaoVotingCw20StakedQueryClient['activeThreshold']>
  }
>({
  key: 'daoVotingCw20StakedActiveThreshold',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const activeThreshold = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formula: 'daoVotingCw20Staked/activeThreshold',
        })
      )
      // Null when indexer fails. Undefined if no active threshold.
      if (activeThreshold !== null) {
        return { active_threshold: activeThreshold || null }
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.activeThreshold(...params)
    },
})
export const votingPowerAtHeightSelector = selectorFamily<
  VotingPowerAtHeightResponse,
  QueryClientParams & {
    params: Parameters<DaoVotingCw20StakedQueryClient['votingPowerAtHeight']>
  }
>({
  key: 'daoVotingCw20StakedVotingPowerAtHeight',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const id = get(refreshWalletBalancesIdAtom(params[0].address))

      const votingPower = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formula: 'daoVotingCw20Staked/votingPower',
          args: {
            address: params[0].address,
          },
          block: params[0].height ? { height: params[0].height } : undefined,
          id,
        })
      )
      if (votingPower && !isNaN(votingPower)) {
        return {
          power: votingPower,
          height: params[0].height,
        }
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.votingPowerAtHeight(...params)
    },
})
export const totalPowerAtHeightSelector = selectorFamily<
  TotalPowerAtHeightResponse,
  QueryClientParams & {
    params: Parameters<DaoVotingCw20StakedQueryClient['totalPowerAtHeight']>
  }
>({
  key: 'daoVotingCw20StakedTotalPowerAtHeight',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const id = get(refreshWalletBalancesIdAtom(undefined))

      const totalPower = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formula: 'daoVotingCw20Staked/totalPower',
          block: params[0].height ? { height: params[0].height } : undefined,
          id,
        })
      )
      if (totalPower && !isNaN(totalPower)) {
        return {
          power: totalPower,
          height: params[0].height,
        }
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.totalPowerAtHeight(...params)
    },
})
export const infoSelector = selectorFamily<
  InfoResponse,
  QueryClientParams & {
    params: Parameters<DaoVotingCw20StakedQueryClient['info']>
  }
>({
  key: 'daoVotingCw20StakedInfo',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const info = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formula: 'info',
        })
      )
      if (info) {
        return { info }
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.info(...params)
    },
})
export const tokenContractSelector = selectorFamily<
  TokenContractResponse,
  QueryClientParams & {
    params: Parameters<DaoVotingCw20StakedQueryClient['tokenContract']>
  }
>({
  key: 'daoVotingCw20StakedTokenContract',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const tokenContract = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formula: 'daoVotingCw20Staked/tokenContract',
        })
      )
      if (tokenContract) {
        return tokenContract
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.tokenContract(...params)
    },
})
export const isActiveSelector = selectorFamily<
  IsActiveResponse,
  QueryClientParams & {
    params: Parameters<DaoVotingCw20StakedQueryClient['isActive']>
  }
>({
  key: 'daoVotingCw20StakedIsActive',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.isActive(...params)
    },
})

///! Custom selectors

export const topStakersSelector = selectorFamily<
  | {
      address: string
      balance: string
      votingPowerPercent: number
    }[]
  | undefined,
  QueryClientParams & { limit?: number }
>({
  key: 'daoVotingCw20StakedTopStakers',
  get:
    ({ limit, ...queryClientParams }) =>
    ({ get }) =>
      get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formula: 'daoVotingCw20Staked/topStakers',
          args: {
            limit,
          },
        })
      ) ?? undefined,
})
