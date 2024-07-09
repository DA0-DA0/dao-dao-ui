import { selectorFamily } from 'recoil'

import { WithChainId } from '@dao-dao/types'
import {
  ActiveThresholdResponse,
  TotalPowerAtHeightResponse,
  VotingPowerAtHeightResponse,
} from '@dao-dao/types/contracts/DaoVotingCw20Staked'

import { DaoVotingCw20StakedQueryClient } from '../../../contracts/DaoVotingCw20Staked'
import {
  refreshDaoVotingPowerAtom,
  refreshWalletBalancesIdAtom,
} from '../../atoms/refresh'
import { cosmWasmClientForChainSelector } from '../chain'
import { contractInfoSelector } from '../contract'
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
  string,
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
  string,
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

      const votingPowerAtHeight = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formula: 'daoVotingCw20Staked/votingPowerAtHeight',
          args: {
            address: params[0].address,
          },
          block: params[0].height ? { height: params[0].height } : undefined,
          id,
        })
      )
      if (votingPowerAtHeight) {
        return votingPowerAtHeight
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
      const id =
        get(refreshWalletBalancesIdAtom(undefined)) +
        get(refreshDaoVotingPowerAtom(queryClientParams.contractAddress))

      const totalPowerAtHeight = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formula: 'daoVotingCw20Staked/totalPowerAtHeight',
          block: params[0].height ? { height: params[0].height } : undefined,
          id,
        })
      )
      if (totalPowerAtHeight) {
        return totalPowerAtHeight
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.totalPowerAtHeight(...params)
    },
})
export const infoSelector = contractInfoSelector
export const tokenContractSelector = selectorFamily<
  string,
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
  Boolean,
  QueryClientParams & {
    params: Parameters<DaoVotingCw20StakedQueryClient['isActive']>
  }
>({
  key: 'daoVotingCw20StakedIsActive',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      get(refreshWalletBalancesIdAtom(undefined))
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
    ({ get }) => {
      const id =
        get(refreshWalletBalancesIdAtom(undefined)) +
        get(refreshDaoVotingPowerAtom(queryClientParams.contractAddress))

      return (
        get(
          queryContractIndexerSelector({
            ...queryClientParams,
            formula: 'daoVotingCw20Staked/topStakers',
            args: {
              limit,
            },
            id,
            noFallback: true,
          })
        ) ?? undefined
      )
    },
})
