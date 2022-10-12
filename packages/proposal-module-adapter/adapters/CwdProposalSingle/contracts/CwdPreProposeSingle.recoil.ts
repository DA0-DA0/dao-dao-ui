import { selectorFamily } from 'recoil'

import {
  cosmWasmClientSelector,
  signingCosmWasmClientAtom,
} from '@dao-dao/state'
import {
  ConfigResponse,
  DaoResponse,
  DepositInfoResponse,
  ProposalModuleResponse,
} from '@dao-dao/tstypes/contracts/CwdPreProposeSingle'

import {
  CwPreProposeSingleClient,
  CwPreProposeSingleQueryClient,
} from './CwdPreProposeSingle.client'

type QueryClientParams = {
  contractAddress: string
}

export const queryClient = selectorFamily<
  CwPreProposeSingleQueryClient,
  QueryClientParams
>({
  key: 'cwPreProposeSingleQueryClient',
  get:
    ({ contractAddress }) =>
    ({ get }) => {
      const client = get(cosmWasmClientSelector)
      return new CwPreProposeSingleQueryClient(client, contractAddress)
    },
})

export type ExecuteClientParams = {
  contractAddress: string
  sender: string
}

export const executeClient = selectorFamily<
  CwPreProposeSingleClient | undefined,
  ExecuteClientParams
>({
  key: 'cwPreProposeSingleExecuteClient',
  get:
    ({ contractAddress, sender }) =>
    ({ get }) => {
      const client = get(signingCosmWasmClientAtom)
      if (!client) return

      return new CwPreProposeSingleClient(client, sender, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export const proposalModuleSelector = selectorFamily<
  ProposalModuleResponse,
  QueryClientParams & {
    params: Parameters<CwPreProposeSingleQueryClient['proposalModule']>
  }
>({
  key: 'cwPreProposeSingleProposalModule',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.proposalModule(...params)
    },
})
export const daoSelector = selectorFamily<
  DaoResponse,
  QueryClientParams & {
    params: Parameters<CwPreProposeSingleQueryClient['dao']>
  }
>({
  key: 'cwPreProposeSingleDao',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.dao(...params)
    },
})
export const configSelector = selectorFamily<
  ConfigResponse,
  QueryClientParams & {
    params: Parameters<CwPreProposeSingleQueryClient['config']>
  }
>({
  key: 'cwPreProposeSingleConfig',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.config(...params)
    },
})
export const depositInfoSelector = selectorFamily<
  DepositInfoResponse,
  QueryClientParams & {
    params: Parameters<CwPreProposeSingleQueryClient['depositInfo']>
  }
>({
  key: 'cwPreProposeSingleDepositInfo',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.depositInfo(...params)
    },
})
// export const extensionSelector = selectorFamily<
//   ExtensionResponse,
//   QueryClientParams & {
//     params: Parameters<CwPreProposeSingleQueryClient['queryExtension']>
//   }
// >({
//   key: 'cwPreProposeSingleExtension',
//   get:
//     ({ params, ...queryClientParams }) =>
//     async ({ get }) => {
//       const client = get(queryClient(queryClientParams))
//       return await client.queryExtension(...params)
//     },
// })
