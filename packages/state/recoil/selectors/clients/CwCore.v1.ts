import { selectorFamily } from 'recoil'

import { WithChainId } from '@dao-dao/types'
import {
  AdminResponse,
  ConfigResponse,
  Cw20BalancesResponse,
  Cw20TokenListResponse,
  Cw721TokenListResponse,
  DumpStateResponse,
  GetItemResponse,
  InfoResponse,
  ListItemsResponse,
  PauseInfoResponse,
  ProposalModulesResponse,
  TotalPowerAtHeightResponse,
  VotingModuleResponse,
  VotingPowerAtHeightResponse,
} from '@dao-dao/types/contracts/CwCore.v1'

import {
  CwCoreV1Client as ExecuteClient,
  CwCoreV1QueryClient as QueryClient,
} from '../../../clients/CwCore.v1'
import {
  refreshDaoVotingPowerAtom,
  refreshWalletBalancesIdAtom,
  signingCosmWasmClientAtom,
} from '../../atoms'
import { cosmWasmClientForChainSelector } from '../chain'

type QueryClientParams = WithChainId<{
  contractAddress: string
}>

const queryClient = selectorFamily<QueryClient, QueryClientParams>({
  key: 'cwCoreV0_1_0QueryClient',
  get:
    ({ contractAddress, chainId }) =>
    ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
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
  key: 'cwCoreV0_1_0ExecuteClient',
  get:
    ({ contractAddress, sender }) =>
    ({ get }) => {
      const client = get(signingCosmWasmClientAtom)
      if (!client) return

      return new ExecuteClient(client, sender, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export const adminSelector = selectorFamily<AdminResponse, QueryClientParams>({
  key: 'cwCoreV0_1_0Admin',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))

      return await client.admin()
    },
})

export const configSelector = selectorFamily<ConfigResponse, QueryClientParams>(
  {
    key: 'cwCoreV0_1_0Config',
    get:
      (queryClientParams) =>
      async ({ get }) => {
        const client = get(queryClient(queryClientParams))

        return await client.config()
      },
  }
)

export const votingModuleSelector = selectorFamily<
  VotingModuleResponse,
  QueryClientParams
>({
  key: 'cwCoreV0_1_0VotingModule',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))

      return await client.votingModule()
    },
})

export const pauseInfoSelector = selectorFamily<
  PauseInfoResponse,
  QueryClientParams
>({
  key: 'cwCoreV0_1_0PauseInfo',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))

      return await client.pauseInfo()
    },
})

export const proposalModulesSelector = selectorFamily<
  ProposalModulesResponse,
  QueryClientParams & { params: Parameters<QueryClient['proposalModules']> }
>({
  key: 'cwCoreV0_1_0ProposalModules',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))

      return await client.proposalModules(...params)
    },
})

export const dumpStateSelector = selectorFamily<
  DumpStateResponse,
  QueryClientParams
>({
  key: 'cwCoreV0_1_0DumpState',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))

      return await client.dumpState()
    },
})

export const getItemSelector = selectorFamily<
  GetItemResponse,
  QueryClientParams & { params: Parameters<QueryClient['getItem']> }
>({
  key: 'cwCoreV0_1_0GetItem',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))

      return await client.getItem(...params)
    },
})

export const listItemsSelector = selectorFamily<
  ListItemsResponse,
  QueryClientParams & { params: Parameters<QueryClient['listItems']> }
>({
  key: 'cwCoreV0_1_0ListItems',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))

      return await client.listItems(...params)
    },
})

export const cw20TokenListSelector = selectorFamily<
  Cw20TokenListResponse,
  QueryClientParams & { params: Parameters<QueryClient['cw20TokenList']> }
>({
  key: 'cwCoreV0_1_0Cw20TokenList',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))

      return await client.cw20TokenList(...params)
    },
})

export const cw721TokenListSelector = selectorFamily<
  Cw721TokenListResponse,
  QueryClientParams & { params: Parameters<QueryClient['cw721TokenList']> }
>({
  key: 'cwCoreV0_1_0Cw721TokenList',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))

      return await client.cw721TokenList(...params)
    },
})

export const cw20BalancesSelector = selectorFamily<
  Cw20BalancesResponse,
  QueryClientParams & { params: Parameters<QueryClient['cw20Balances']> }
>({
  key: 'cwCoreV0_1_0Cw20Balances',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))

      get(refreshWalletBalancesIdAtom(undefined))

      return await client.cw20Balances(...params)
    },
})

export const votingPowerAtHeightSelector = selectorFamily<
  VotingPowerAtHeightResponse,
  QueryClientParams & { params: Parameters<QueryClient['votingPowerAtHeight']> }
>({
  key: 'cwCoreV0_1_0VotingPowerAtHeight',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))

      get(refreshDaoVotingPowerAtom(queryClientParams.contractAddress))
      get(refreshWalletBalancesIdAtom(params[0].address))

      return await client.votingPowerAtHeight(...params)
    },
})

export const totalPowerAtHeightSelector = selectorFamily<
  TotalPowerAtHeightResponse,
  QueryClientParams & { params: Parameters<QueryClient['totalPowerAtHeight']> }
>({
  key: 'cwCoreV0_1_0TotalPowerAtHeight',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))

      get(refreshDaoVotingPowerAtom(queryClientParams.contractAddress))
      get(refreshWalletBalancesIdAtom(undefined))

      return await client.totalPowerAtHeight(...params)
    },
})

export const infoSelector = selectorFamily<InfoResponse, QueryClientParams>({
  key: 'cwCoreV0_1_0Info',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))

      return await client.info()
    },
})
