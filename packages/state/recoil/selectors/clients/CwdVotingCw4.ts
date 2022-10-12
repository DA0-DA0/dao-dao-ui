import { selectorFamily } from 'recoil'

import {
  DaoResponse,
  GroupContractResponse,
  InfoResponse,
  TotalPowerAtHeightResponse,
  VotingPowerAtHeightResponse,
} from '@dao-dao/tstypes/contracts/CwdVotingCw4'

import {
  CwdVotingCw4Client,
  CwdVotingCw4QueryClient,
} from '../../../clients/CwdVotingCw4'
import { signingCosmWasmClientAtom } from '../../atoms'
import { cosmWasmClientSelector } from '../chain'

type QueryClientParams = {
  contractAddress: string
}

export const queryClient = selectorFamily<
  CwdVotingCw4QueryClient,
  QueryClientParams
>({
  key: 'cwdVotingCw4QueryClient',
  get:
    ({ contractAddress }) =>
    ({ get }) => {
      const client = get(cosmWasmClientSelector)
      return new CwdVotingCw4QueryClient(client, contractAddress)
    },
})

export type ExecuteClientParams = {
  contractAddress: string
  sender: string
}

export const executeClient = selectorFamily<
  CwdVotingCw4Client | undefined,
  ExecuteClientParams
>({
  key: 'cwdVotingCw4ExecuteClient',
  get:
    ({ contractAddress, sender }) =>
    ({ get }) => {
      const client = get(signingCosmWasmClientAtom)
      if (!client) return
      return new CwdVotingCw4Client(client, sender, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export const groupContractSelector = selectorFamily<
  GroupContractResponse,
  QueryClientParams & {
    params: Parameters<CwdVotingCw4QueryClient['groupContract']>
  }
>({
  key: 'cwdVotingCw4GroupContract',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.groupContract(...params)
    },
})
export const daoSelector = selectorFamily<
  DaoResponse,
  QueryClientParams & {
    params: Parameters<CwdVotingCw4QueryClient['dao']>
  }
>({
  key: 'cwdVotingCw4Dao',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.dao(...params)
    },
})
export const votingPowerAtHeightSelector = selectorFamily<
  VotingPowerAtHeightResponse,
  QueryClientParams & {
    params: Parameters<CwdVotingCw4QueryClient['votingPowerAtHeight']>
  }
>({
  key: 'cwdVotingCw4VotingPowerAtHeight',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.votingPowerAtHeight(...params)
    },
})
export const totalPowerAtHeightSelector = selectorFamily<
  TotalPowerAtHeightResponse,
  QueryClientParams & {
    params: Parameters<CwdVotingCw4QueryClient['totalPowerAtHeight']>
  }
>({
  key: 'cwdVotingCw4TotalPowerAtHeight',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.totalPowerAtHeight(...params)
    },
})
export const infoSelector = selectorFamily<
  InfoResponse,
  QueryClientParams & {
    params: Parameters<CwdVotingCw4QueryClient['info']>
  }
>({
  key: 'cwdVotingCw4Info',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.info(...params)
    },
})
