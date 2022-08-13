import { selectorFamily } from 'recoil'

import {
  ActiveThresholdResponse,
  DaoResponse,
  InfoResponse,
  IsActiveResponse,
  Cw20StakedBalanceVotingQueryClient as QueryClient,
  StakingContractResponse,
  TokenContractResponse,
  TotalPowerAtHeightResponse,
  VotingPowerAtHeightResponse,
} from '../../../clients/cw20-staked-balance-voting'
import { refreshWalletBalancesIdAtom } from '../../atoms/refresh'
import { cosmWasmClientSelector } from '../chain'

type QueryClientParams = {
  contractAddress: string
}

const queryClient = selectorFamily<QueryClient, QueryClientParams>({
  key: 'cw20StakedBalanceVotingQueryClient',
  get:
    ({ contractAddress }) =>
    ({ get }) => {
      const client = get(cosmWasmClientSelector)
      return new QueryClient(client, contractAddress)
    },
})

export const stakingContractSelector = selectorFamily<
  StakingContractResponse,
  QueryClientParams
>({
  key: 'cw20StakedBalanceVotingStakingContract',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))

      return await client.stakingContract()
    },
})

export const daoSelector = selectorFamily<DaoResponse, QueryClientParams>({
  key: 'cw20StakedBalanceVotingDao',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))

      return await client.dao()
    },
})

export const activeThresholdSelector = selectorFamily<
  ActiveThresholdResponse,
  QueryClientParams & {
    params: Parameters<QueryClient['activeThreshold']>
  }
>({
  key: 'cw20StakedBalanceVotingActiveThreshold',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))

      return await client.activeThreshold(...params)
    },
})

export const votingPowerAtHeightSelector = selectorFamily<
  VotingPowerAtHeightResponse,
  QueryClientParams & { params: Parameters<QueryClient['votingPowerAtHeight']> }
>({
  key: 'cw20StakedBalanceVotingVotingPowerAtHeight',
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
  QueryClientParams & { params: Parameters<QueryClient['totalPowerAtHeight']> }
>({
  key: 'cw20StakedBalanceVotingTotalPowerAtHeight',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))

      get(refreshWalletBalancesIdAtom(undefined))

      return await client.totalPowerAtHeight(...params)
    },
})

export const infoSelector = selectorFamily<InfoResponse, QueryClientParams>({
  key: 'cw20StakedBalanceVotingInfo',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))

      return await client.info()
    },
})

export const tokenContractSelector = selectorFamily<
  TokenContractResponse,
  QueryClientParams
>({
  key: 'cw20StakedBalanceVotingTokenContract',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))

      return await client.tokenContract()
    },
})

export const isActiveSelector = selectorFamily<
  IsActiveResponse,
  QueryClientParams & {
    params: Parameters<QueryClient['isActive']>
  }
>({
  key: 'cw20StakedBalanceVotingIsActive',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))

      return await client.isActive(...params)
    },
})
