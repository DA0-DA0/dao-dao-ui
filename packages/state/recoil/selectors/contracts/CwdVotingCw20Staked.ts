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
} from '@dao-dao/types/contracts/CwdVotingCw20Staked'

import { CwdVotingCw20StakedQueryClient } from '../../../contracts/CwdVotingCw20Staked'
import { refreshWalletBalancesIdAtom } from '../../atoms/refresh'
import { cosmWasmClientForChainSelector } from '../chain'
import { queryIndexerSelector } from '../indexer'

type QueryClientParams = WithChainId<{
  contractAddress: string
}>

const queryClient = selectorFamily<
  CwdVotingCw20StakedQueryClient,
  QueryClientParams
>({
  key: 'cwdVotingCw20StakedQueryClient',
  get:
    ({ contractAddress, chainId }) =>
    ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      return new CwdVotingCw20StakedQueryClient(client, contractAddress)
    },
})

export const stakingContractSelector = selectorFamily<
  StakingContractResponse,
  QueryClientParams & {
    params: Parameters<CwdVotingCw20StakedQueryClient['stakingContract']>
  }
>({
  key: 'cwdVotingCw20StakedStakingContract',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const stakingContract = get(
        queryIndexerSelector({
          ...queryClientParams,
          formulaName: 'daoVotingCw20Staked/stakingContract',
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
    params: Parameters<CwdVotingCw20StakedQueryClient['dao']>
  }
>({
  key: 'cwdVotingCw20StakedDao',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const dao = get(
        queryIndexerSelector({
          ...queryClientParams,
          formulaName: 'daoVotingCw20Staked/dao',
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
    params: Parameters<CwdVotingCw20StakedQueryClient['activeThreshold']>
  }
>({
  key: 'cwdVotingCw20StakedActiveThreshold',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const activeThreshold = get(
        queryIndexerSelector({
          ...queryClientParams,
          formulaName: 'daoVotingCw20Staked/activeThreshold',
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
    params: Parameters<CwdVotingCw20StakedQueryClient['votingPowerAtHeight']>
  }
>({
  key: 'cwdVotingCw20StakedVotingPowerAtHeight',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const id = get(refreshWalletBalancesIdAtom(params[0].address))

      const votingPower = get(
        queryIndexerSelector({
          ...queryClientParams,
          formulaName: 'daoVotingCw20Staked/votingPower',
          args: {
            address: params[0].address,
          },
          blockHeight: params[0].height,
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
    params: Parameters<CwdVotingCw20StakedQueryClient['totalPowerAtHeight']>
  }
>({
  key: 'cwdVotingCw20StakedTotalPowerAtHeight',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const id = get(refreshWalletBalancesIdAtom(undefined))

      const totalPower = get(
        queryIndexerSelector({
          ...queryClientParams,
          formulaName: 'daoVotingCw20Staked/totalPower',
          blockHeight: params[0].height,
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
    params: Parameters<CwdVotingCw20StakedQueryClient['info']>
  }
>({
  key: 'cwdVotingCw20StakedInfo',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const info = get(
        queryIndexerSelector({
          ...queryClientParams,
          formulaName: 'info',
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
    params: Parameters<CwdVotingCw20StakedQueryClient['tokenContract']>
  }
>({
  key: 'cwdVotingCw20StakedTokenContract',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const tokenContract = get(
        queryIndexerSelector({
          ...queryClientParams,
          formulaName: 'daoVotingCw20Staked/tokenContract',
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
    params: Parameters<CwdVotingCw20StakedQueryClient['isActive']>
  }
>({
  key: 'cwdVotingCw20StakedIsActive',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.isActive(...params)
    },
})
