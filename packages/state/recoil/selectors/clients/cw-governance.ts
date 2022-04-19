import { selectorFamily } from 'recoil'

import {
  Client as ExecuteClient,
  ConfigResponse,
  Cw20BalancesResponse,
  Cw721TokenListResponse,
  DumpStateResponse,
  GetItemResponse,
  GovernanceModulesResponse,
  InfoResponse,
  ListItemsResponse,
  QueryClient,
  TotalPowerAtHeightResponse,
  VotingModuleResponse,
  VotingPowerAtHeightResponse,
} from '../../../clients/cw-governance'
import { cosmWasmClient, signingCosmWasmClient } from '../chain'

type QueryClientParams = {
  contractAddress: string
}

const queryClient = selectorFamily<QueryClient | undefined, QueryClientParams>({
  key: 'cwGovernanceQueryClient',
  get:
    ({ contractAddress }) =>
    ({ get }) => {
      const client = get(cosmWasmClient)
      if (!client) return

      return new QueryClient(client, contractAddress)
    },
})

export type ExecuteClientParams = {
  contractAddress: string
  sender: string
}

export const executeClient = selectorFamily<
  ExecuteClient | undefined,
  ExecuteClientParams
>({
  key: 'cwGovernanceExecuteClient',
  get:
    ({ contractAddress, sender }) =>
    ({ get }) => {
      const client = get(signingCosmWasmClient)
      if (!client) return

      return new ExecuteClient(client, sender, contractAddress)
    },
})

export const configSelector = selectorFamily<
  ConfigResponse | undefined,
  QueryClientParams
>({
  key: 'cwGovernanceConfig',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      if (!client) return

      return await client.config()
    },
})

export const votingModuleSelector = selectorFamily<
  VotingModuleResponse | undefined,
  QueryClientParams
>({
  key: 'cwGovernanceVotingModule',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      if (!client) return

      return await client.votingModule()
    },
})

export const governanceModulesSelector = selectorFamily<
  GovernanceModulesResponse | undefined,
  QueryClientParams & { params: Parameters<QueryClient['governanceModules']> }
>({
  key: 'cwGovernanceGovernanceModules',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      if (!client) return

      return await client.governanceModules(...params)
    },
})

export const dumpStateSelector = selectorFamily<
  DumpStateResponse | undefined,
  QueryClientParams
>({
  key: 'cwGovernanceDumpState',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      if (!client) return

      return await client.dumpState()
    },
})

export const getItemSelector = selectorFamily<
  GetItemResponse | undefined,
  QueryClientParams & { params: Parameters<QueryClient['getItem']> }
>({
  key: 'cwGovernanceGetItem',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      if (!client) return

      return await client.getItem(...params)
    },
})

export const listItemsSelector = selectorFamily<
  ListItemsResponse | undefined,
  QueryClientParams & { params: Parameters<QueryClient['listItems']> }
>({
  key: 'cwGovernanceListItems',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      if (!client) return

      return await client.listItems(...params)
    },
})

export const cw721TokenListSelector = selectorFamily<
  Cw721TokenListResponse | undefined,
  QueryClientParams & { params: Parameters<QueryClient['cw721TokenList']> }
>({
  key: 'cwGovernanceCw721TokenList',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      if (!client) return

      return await client.cw721TokenList(...params)
    },
})

export const cw20BalancesSelector = selectorFamily<
  Cw20BalancesResponse | undefined,
  QueryClientParams & { params: Parameters<QueryClient['cw20Balances']> }
>({
  key: 'cwGovernanceCw20Balances',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      if (!client) return

      return await client.cw20Balances(...params)
    },
})

export const votingPowerAtHeightSelector = selectorFamily<
  VotingPowerAtHeightResponse | undefined,
  QueryClientParams & { params: Parameters<QueryClient['votingPowerAtHeight']> }
>({
  key: 'cwGovernanceVotingPowerAtHeight',
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
  key: 'cwGovernanceTotalPowerAtHeight',
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
  key: 'cwGovernanceInfo',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      if (!client) return

      return await client.info()
    },
})
