import { selectorFamily } from 'recoil'

import {
  DaoResponse,
  InfoResponse,
  QueryClient,
  StakingContractResponse,
  TokenContractResponse,
  TotalPowerAtHeightResponse,
  VotingPowerAtHeightResponse,
} from '../../../clients/cw20-staked-balance-voting'
import { cosmWasmClientSelector } from '../chain'

type QueryClientParams = {
  contractAddress: string
}

const queryClient = selectorFamily<QueryClient | undefined, QueryClientParams>({
  key: 'cw20StakedBalanceVotingQueryClient',
  get:
    ({ contractAddress }) =>
    ({ get }) => {
      const client = get(cosmWasmClientSelector)
      if (!client) return

      return new QueryClient(client, contractAddress)
    },
})

export const stakingContractSelector = selectorFamily<
  StakingContractResponse | undefined,
  QueryClientParams
>({
  key: 'cw20StakedBalanceVotingStakingContract',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      if (!client) return

      return await client.stakingContract()
    },
})

export const daoSelector = selectorFamily<
  DaoResponse | undefined,
  QueryClientParams
>({
  key: 'cw20StakedBalanceVotingDao',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      if (!client) return

      return await client.dao()
    },
})

export const votingPowerAtHeightSelector = selectorFamily<
  VotingPowerAtHeightResponse | undefined,
  QueryClientParams & { params: Parameters<QueryClient['votingPowerAtHeight']> }
>({
  key: 'cw20StakedBalanceVotingVotingPowerAtHeight',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      if (!client) return

      return await client.votingPowerAtHeight(...params)
    },
})

export const totalPowerAtHeightSelector = selectorFamily<
  TotalPowerAtHeightResponse | undefined,
  QueryClientParams & { params: Parameters<QueryClient['totalPowerAtHeight']> }
>({
  key: 'cw20StakedBalanceVotingTotalPowerAtHeight',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      if (!client) return

      return await client.totalPowerAtHeight(...params)
    },
})

export const infoSelector = selectorFamily<
  InfoResponse | undefined,
  QueryClientParams
>({
  key: 'cw20StakedBalanceVotingInfo',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      if (!client) return

      return await client.info()
    },
})

export const tokenContractSelector = selectorFamily<
  TokenContractResponse | undefined,
  QueryClientParams
>({
  key: 'cw20StakedBalanceVotingTokenContract',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      if (!client) return

      return await client.tokenContract()
    },
})
