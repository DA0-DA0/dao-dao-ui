import { selectorFamily } from 'recoil'

import {
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
} from '../../clients/cw-governance'
import { cosmWasmClient } from './chain'

const queryClient = selectorFamily<QueryClient | undefined, string>({
  key: 'cwGovernanceQueryClient',
  get:
    (contractAddress) =>
    ({ get }) => {
      const client = get(cosmWasmClient)
      if (!client) return

      return new QueryClient(client, contractAddress)
    },
})

export const configSelector = selectorFamily<
  ConfigResponse | undefined,
  string
>({
  key: 'cwGovernanceConfig',
  get:
    (contractAddress) =>
    async ({ get }) => {
      const client = get(queryClient(contractAddress))
      if (!client) return

      return await client.config()
    },
})

export const votingModuleSelector = selectorFamily<
  VotingModuleResponse | undefined,
  string
>({
  key: 'cwGovernanceVotingModule',
  get:
    (contractAddress) =>
    async ({ get }) => {
      const client = get(queryClient(contractAddress))
      if (!client) return

      return await client.votingModule()
    },
})

export const governanceModulesSelector = selectorFamily<
  GovernanceModulesResponse | undefined,
  Parameters<QueryClient['governanceModules']>[0] & { contractAddress: string }
>({
  key: 'cwGovernanceGovernanceModules',
  get:
    ({ contractAddress, ...params }) =>
    async ({ get }) => {
      const client = get(queryClient(contractAddress))
      if (!client) return

      return await client.governanceModules(params)
    },
})

export const dumpStateSelector = selectorFamily<
  DumpStateResponse | undefined,
  string
>({
  key: 'cwGovernanceDumpState',
  get:
    (contractAddress) =>
    async ({ get }) => {
      const client = get(queryClient(contractAddress))
      if (!client) return

      return await client.dumpState()
    },
})

export const getItemSelector = selectorFamily<
  GetItemResponse | undefined,
  Parameters<QueryClient['getItem']>[0] & { contractAddress: string }
>({
  key: 'cwGovernanceGetItem',
  get:
    ({ contractAddress, ...params }) =>
    async ({ get }) => {
      const client = get(queryClient(contractAddress))
      if (!client) return

      return await client.getItem(params)
    },
})

export const listItemsSelector = selectorFamily<
  ListItemsResponse | undefined,
  Parameters<QueryClient['listItems']>[0] & { contractAddress: string }
>({
  key: 'cwGovernanceListItems',
  get:
    ({ contractAddress, ...params }) =>
    async ({ get }) => {
      const client = get(queryClient(contractAddress))
      if (!client) return

      return await client.listItems(params)
    },
})

export const cw721TokenListSelector = selectorFamily<
  Cw721TokenListResponse | undefined,
  Parameters<QueryClient['cw721TokenList']>[0] & { contractAddress: string }
>({
  key: 'cwGovernanceCw721TokenList',
  get:
    ({ contractAddress, ...params }) =>
    async ({ get }) => {
      const client = get(queryClient(contractAddress))
      if (!client) return

      return await client.cw721TokenList(params)
    },
})

export const cw20BalancesSelector = selectorFamily<
  Cw20BalancesResponse | undefined,
  Parameters<QueryClient['cw20Balances']>[0] & { contractAddress: string }
>({
  key: 'cwGovernanceCw20Balances',
  get:
    ({ contractAddress, ...params }) =>
    async ({ get }) => {
      const client = get(queryClient(contractAddress))
      if (!client) return

      return await client.cw20Balances(params)
    },
})

export const votingPowerAtHeightSelector = selectorFamily<
  VotingPowerAtHeightResponse | undefined,
  Parameters<QueryClient['votingPowerAtHeight']>[0] & {
    contractAddress: string
  }
>({
  key: 'cwGovernanceVotingPowerAtHeight',
  get:
    ({ contractAddress, ...params }) =>
    async ({ get }) => {
      const client = get(queryClient(contractAddress))
      if (!client) return

      return await client.votingPowerAtHeight(params)
    },
})

export const totalPowerAtHeightSelector = selectorFamily<
  TotalPowerAtHeightResponse | undefined,
  Parameters<QueryClient['totalPowerAtHeight']>[0] & {
    contractAddress: string
  }
>({
  key: 'cwGovernanceTotalPowerAtHeight',
  get:
    ({ contractAddress, ...params }) =>
    async ({ get }) => {
      const client = get(queryClient(contractAddress))
      if (!client) return

      return await client.totalPowerAtHeight(params)
    },
})

export const infoSelector = selectorFamily<InfoResponse | undefined, string>({
  key: 'cwGovernanceInfo',
  get:
    (contractAddress) =>
    async ({ get }) => {
      const client = get(queryClient(contractAddress))
      if (!client) return

      return await client.info()
    },
})
