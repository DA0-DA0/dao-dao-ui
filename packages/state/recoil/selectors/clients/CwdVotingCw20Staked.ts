import { selectorFamily } from 'recoil'

import { WithChainId } from '@dao-dao/tstypes'
import {
  ActiveThresholdResponse,
  DaoResponse,
  InfoResponse,
  IsActiveResponse,
  StakingContractResponse,
  TokenContractResponse,
  TotalPowerAtHeightResponse,
  VotingPowerAtHeightResponse,
} from '@dao-dao/tstypes/contracts/CwdVotingCw20Staked'

import { CwdVotingCw20StakedQueryClient } from '../../../clients/CwdVotingCw20Staked'
import { refreshWalletBalancesIdAtom } from '../../atoms/refresh'
import { cosmWasmClientForChainSelector } from '../chain'

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
      const client = get(queryClient(queryClientParams))
      get(refreshWalletBalancesIdAtom(params[0].address))
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
      const client = get(queryClient(queryClientParams))
      get(refreshWalletBalancesIdAtom(undefined))
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
