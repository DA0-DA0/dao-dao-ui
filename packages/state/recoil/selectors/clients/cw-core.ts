import { selectorFamily } from 'recoil'

import {
  CwCoreClient as ExecuteClient,
  ConfigResponse,
  Cw20BalancesResponse,
  Cw20TokenListResponse,
  Cw721TokenListResponse,
  DumpStateResponse,
  GetItemResponse,
  ProposalModulesResponse,
  InfoResponse,
  ListItemsResponse,
  CwCoreQueryClient as QueryClient,
  TotalPowerAtHeightResponse,
  VotingModuleResponse,
  PauseInfoResponse,
  VotingPowerAtHeightResponse,
  AdminResponse,
} from '../../../clients/cw-core'
import { refreshWalletBalancesIdAtom } from '../../atoms/refresh'
import { cosmWasmClientSelector, signingCosmWasmClientSelector } from '../chain'

type QueryClientParams = {
  contractAddress: string
}

const queryClient = selectorFamily<QueryClient | undefined, QueryClientParams>({
  key: 'cwCoreQueryClient',
  get:
    ({ contractAddress }) =>
    ({ get }) => {
      const client = get(cosmWasmClientSelector)
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
  key: 'cwCoreExecuteClient',
  get:
    ({ contractAddress, sender }) =>
    ({ get }) => {
      const client = get(signingCosmWasmClientSelector)
      if (!client) return

      return new ExecuteClient(client, sender, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export const adminSelector = selectorFamily<
  AdminResponse | undefined,
  QueryClientParams
>({
  key: 'cwCoreAdmin',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      if (!client) return

      return await client.admin()
    },
})

export const configSelector = selectorFamily<
  ConfigResponse | undefined,
  QueryClientParams
>({
  key: 'cwCoreConfig',
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
  key: 'cwCoreVotingModule',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      if (!client) return

      return await client.votingModule()
    },
})

export const pauseInfoSelector = selectorFamily<
  PauseInfoResponse | undefined,
  QueryClientParams
>({
  key: 'cwCorePauseInfo',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      if (!client) return

      return await client.pauseInfo()
    },
})

export const proposalModulesSelector = selectorFamily<
  ProposalModulesResponse | undefined,
  QueryClientParams & { params: Parameters<QueryClient['proposalModules']> }
>({
  key: 'cwCoreGovernanceModules',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      if (!client) return

      return await client.proposalModules(...params)
    },
})

export const dumpStateSelector = selectorFamily<
  DumpStateResponse | undefined,
  QueryClientParams
>({
  key: 'cwCoreDumpState',
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
  key: 'cwCoreGetItem',
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
  key: 'cwCoreListItems',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      if (!client) return

      return await client.listItems(...params)
    },
})

export const cw20TokenListSelector = selectorFamily<
  Cw20TokenListResponse | undefined,
  QueryClientParams & { params: Parameters<QueryClient['cw20TokenList']> }
>({
  key: 'cwCoreCw20TokenList',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      if (!client) return

      return await client.cw20TokenList(...params)
    },
})

export const cw721TokenListSelector = selectorFamily<
  Cw721TokenListResponse | undefined,
  QueryClientParams & { params: Parameters<QueryClient['cw721TokenList']> }
>({
  key: 'cwCoreCw721TokenList',
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
  key: 'cwCoreCw20Balances',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      if (!client) return

      get(refreshWalletBalancesIdAtom(queryClientParams.contractAddress))

      return await client.cw20Balances(...params)
    },
})

const CW20_BALANCES_LIMIT = 10
export const allCw20BalancesSelector = selectorFamily<
  Cw20BalancesResponse | undefined,
  QueryClientParams
>({
  key: 'cwCoreAllCw20Balances',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      let startAt: string | undefined

      const balances: Cw20BalancesResponse = []
      while (true) {
        const response = await get(
          cw20BalancesSelector({
            ...queryClientParams,
            params: [{ startAt, limit: CW20_BALANCES_LIMIT }],
          })
        )

        balances.push(...(response ?? []))

        // If we have less than the limit of items, we've exhausted them.
        if (!response || response.length < CW20_BALANCES_LIMIT) break
      }

      return balances
    },
})

export const votingPowerAtHeightSelector = selectorFamily<
  VotingPowerAtHeightResponse | undefined,
  QueryClientParams & { params: Parameters<QueryClient['votingPowerAtHeight']> }
>({
  key: 'cwCoreVotingPowerAtHeight',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      if (!client) return

      get(refreshWalletBalancesIdAtom(params[0].address))

      return await client.votingPowerAtHeight(...params)
    },
})

export const totalPowerAtHeightSelector = selectorFamily<
  TotalPowerAtHeightResponse | undefined,
  QueryClientParams & { params: Parameters<QueryClient['totalPowerAtHeight']> }
>({
  key: 'cwCoreTotalPowerAtHeight',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      if (!client) return

      get(refreshWalletBalancesIdAtom(undefined))

      return await client.totalPowerAtHeight(...params)
    },
})

export const infoSelector = selectorFamily<
  InfoResponse | undefined,
  QueryClientParams
>({
  key: 'cwCoreInfo',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      if (!client) return

      return await client.info()
    },
})
