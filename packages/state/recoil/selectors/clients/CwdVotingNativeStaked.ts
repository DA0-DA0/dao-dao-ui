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
} from '@dao-dao/types/contracts/CwdVotingNativeStaked'

import {
  CwdVotingNativeStakedClient,
  CwdVotingNativeStakedQueryClient,
} from '../../../clients/CwdVotingNativeStaked'
import { signingCosmWasmClientAtom } from '../../atoms'
import { refreshWalletBalancesIdAtom } from '../../atoms/refresh'
import { cosmWasmClientForChainSelector } from '../chain'

type QueryClientParams = WithChainId<{
  contractAddress: string
}>

export const queryClient = selectorFamily<
  CwdVotingNativeStakedQueryClient,
  QueryClientParams
>({
  key: 'cwdVotingNativeStakedQueryClient',
  get:
    ({ contractAddress, chainId }) =>
    ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      return new CwdVotingNativeStakedQueryClient(client, contractAddress)
    },
})

export type ExecuteClientParams = {
  contractAddress: string
  sender: string
}

export const executeClient = selectorFamily<
  CwdVotingNativeStakedClient | undefined,
  ExecuteClientParams
>({
  key: 'cwdVotingNativeStakedExecuteClient',
  get:
    ({ contractAddress, sender }) =>
    ({ get }) => {
      const client = get(signingCosmWasmClientAtom)
      if (!client) return
      return new CwdVotingNativeStakedClient(client, sender, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export const daoSelector = selectorFamily<
  DaoResponse,
  QueryClientParams & {
    params: Parameters<CwdVotingNativeStakedQueryClient['dao']>
  }
>({
  key: 'cwdVotingNativeStakedDao',
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
    params: Parameters<CwdVotingNativeStakedQueryClient['getConfig']>
  }
>({
  key: 'cwdVotingNativeStakedGetConfig',
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
    params: Parameters<CwdVotingNativeStakedQueryClient['claims']>
  }
>({
  key: 'cwdVotingNativeStakedClaims',
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
    params: Parameters<CwdVotingNativeStakedQueryClient['listStakers']>
  }
>({
  key: 'cwdVotingNativeStakedListStakers',
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
    params: Parameters<CwdVotingNativeStakedQueryClient['votingPowerAtHeight']>
  }
>({
  key: 'cwdVotingNativeStakedVotingPowerAtHeight',
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
    params: Parameters<CwdVotingNativeStakedQueryClient['totalPowerAtHeight']>
  }
>({
  key: 'cwdVotingNativeStakedTotalPowerAtHeight',
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
    params: Parameters<CwdVotingNativeStakedQueryClient['info']>
  }
>({
  key: 'cwdVotingNativeStakedInfo',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.info(...params)
    },
})
