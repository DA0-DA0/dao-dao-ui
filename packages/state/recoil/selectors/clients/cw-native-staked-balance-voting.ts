import { selectorFamily } from 'recoil'

import {
  ClaimsResponse,
  CwNativeStakedBalanceVotingClient,
  CwNativeStakedBalanceVotingQueryClient,
  DaoResponse,
  GetConfigResponse,
  InfoResponse,
  TotalPowerAtHeightResponse,
  VotingPowerAtHeightResponse,
} from '../../../clients/cw-native-staked-balance-voting'
import { signingCosmWasmClientAtom } from '../../atoms'
import { refreshWalletBalancesIdAtom } from '../../atoms/refresh'
import { cosmWasmClientSelector } from '../chain'

type QueryClientParams = {
  contractAddress: string
}

export const queryClient = selectorFamily<
  CwNativeStakedBalanceVotingQueryClient,
  QueryClientParams
>({
  key: 'cwNativeStakedBalanceVotingQueryClient',
  get:
    ({ contractAddress }) =>
    ({ get }) => {
      const client = get(cosmWasmClientSelector)
      return new CwNativeStakedBalanceVotingQueryClient(client, contractAddress)
    },
})

export type ExecuteClientParams = {
  contractAddress: string
  sender: string
}

export const executeClient = selectorFamily<
  CwNativeStakedBalanceVotingClient | undefined,
  ExecuteClientParams
>({
  key: 'cwNativeStakedBalanceVotingExecuteClient',
  get:
    ({ contractAddress, sender }) =>
    ({ get }) => {
      const client = get(signingCosmWasmClientAtom)
      if (!client) return
      return new CwNativeStakedBalanceVotingClient(
        client,
        sender,
        contractAddress
      )
    },
  dangerouslyAllowMutability: true,
})

export const daoSelector = selectorFamily<
  DaoResponse,
  QueryClientParams & {
    params: Parameters<CwNativeStakedBalanceVotingQueryClient['dao']>
  }
>({
  key: 'cwNativeStakedBalanceVotingDao',
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
    params: Parameters<CwNativeStakedBalanceVotingQueryClient['getConfig']>
  }
>({
  key: 'cwNativeStakedBalanceVotingGetConfig',
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
    params: Parameters<CwNativeStakedBalanceVotingQueryClient['claims']>
  }
>({
  key: 'cwNativeStakedBalanceVotingClaims',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.claims(...params)
    },
})
export const votingPowerAtHeightSelector = selectorFamily<
  VotingPowerAtHeightResponse,
  QueryClientParams & {
    params: Parameters<
      CwNativeStakedBalanceVotingQueryClient['votingPowerAtHeight']
    >
  }
>({
  key: 'cwNativeStakedBalanceVotingVotingPowerAtHeight',
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
    params: Parameters<
      CwNativeStakedBalanceVotingQueryClient['totalPowerAtHeight']
    >
  }
>({
  key: 'cwNativeStakedBalanceVotingTotalPowerAtHeight',
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
    params: Parameters<CwNativeStakedBalanceVotingQueryClient['info']>
  }
>({
  key: 'cwNativeStakedBalanceVotingInfo',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.info(...params)
    },
})
