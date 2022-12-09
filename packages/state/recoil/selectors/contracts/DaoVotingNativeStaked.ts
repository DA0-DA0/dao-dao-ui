import { selectorFamily } from 'recoil'

import { WithChainId } from '@dao-dao/types'
import {
  ClaimsResponse,
  DaoResponse,
  GetConfigResponse,
  InfoResponse,
  ListStakersResponse,
  TotalPowerAtHeightResponse,
  VotingPowerAtHeightResponse,
} from '@dao-dao/types/contracts/DaoVotingNativeStaked'

import {
  DaoVotingNativeStakedClient,
  DaoVotingNativeStakedQueryClient,
} from '../../../contracts/DaoVotingNativeStaked'
import { signingCosmWasmClientAtom } from '../../atoms'
import { refreshWalletBalancesIdAtom } from '../../atoms/refresh'
import { cosmWasmClientForChainSelector } from '../chain'

type QueryClientParams = WithChainId<{
  contractAddress: string
}>

export const queryClient = selectorFamily<
  DaoVotingNativeStakedQueryClient,
  QueryClientParams
>({
  key: 'daoVotingNativeStakedQueryClient',
  get:
    ({ contractAddress, chainId }) =>
    ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      return new DaoVotingNativeStakedQueryClient(client, contractAddress)
    },
})

export type ExecuteClientParams = {
  contractAddress: string
  sender: string
}

export const executeClient = selectorFamily<
  DaoVotingNativeStakedClient | undefined,
  ExecuteClientParams
>({
  key: 'daoVotingNativeStakedExecuteClient',
  get:
    ({ contractAddress, sender }) =>
    ({ get }) => {
      const client = get(signingCosmWasmClientAtom)
      if (!client) return
      return new DaoVotingNativeStakedClient(client, sender, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export const daoSelector = selectorFamily<
  DaoResponse,
  QueryClientParams & {
    params: Parameters<DaoVotingNativeStakedQueryClient['dao']>
  }
>({
  key: 'daoVotingNativeStakedDao',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.dao(...params)
    },
})
export const getConfigSelector = selectorFamily<
  GetConfigResponse,
  QueryClientParams & {
    params: Parameters<DaoVotingNativeStakedQueryClient['getConfig']>
  }
>({
  key: 'daoVotingNativeStakedGetConfig',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.getConfig(...params)
    },
})
export const claimsSelector = selectorFamily<
  ClaimsResponse,
  QueryClientParams & {
    params: Parameters<DaoVotingNativeStakedQueryClient['claims']>
  }
>({
  key: 'daoVotingNativeStakedClaims',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.claims(...params)
    },
})
export const listStakersSelector = selectorFamily<
  ListStakersResponse,
  QueryClientParams & {
    params: Parameters<DaoVotingNativeStakedQueryClient['listStakers']>
  }
>({
  key: 'daoVotingNativeStakedListStakers',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.listStakers(...params)
    },
})
export const votingPowerAtHeightSelector = selectorFamily<
  VotingPowerAtHeightResponse,
  QueryClientParams & {
    params: Parameters<DaoVotingNativeStakedQueryClient['votingPowerAtHeight']>
  }
>({
  key: 'daoVotingNativeStakedVotingPowerAtHeight',
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
    params: Parameters<DaoVotingNativeStakedQueryClient['totalPowerAtHeight']>
  }
>({
  key: 'daoVotingNativeStakedTotalPowerAtHeight',
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
    params: Parameters<DaoVotingNativeStakedQueryClient['info']>
  }
>({
  key: 'daoVotingNativeStakedInfo',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.info(...params)
    },
})
