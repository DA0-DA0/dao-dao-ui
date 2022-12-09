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
      const client = get(queryClient(queryClientParams))
      get(refreshWalletBalancesIdAtom(params[0].address))
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
      const client = get(queryClient(queryClientParams))
      get(refreshWalletBalancesIdAtom(undefined))
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
