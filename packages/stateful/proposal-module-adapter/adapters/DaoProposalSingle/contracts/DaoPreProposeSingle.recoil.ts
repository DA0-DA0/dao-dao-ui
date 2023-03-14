import { selectorFamily } from 'recoil'

import {
  cosmWasmClientForChainSelector,
  queryContractIndexerSelector,
  signingCosmWasmClientAtom,
} from '@dao-dao/state'
import { WithChainId } from '@dao-dao/types'
import {
  ConfigResponse,
  DaoResponse,
  DepositInfoResponse,
  ProposalModuleResponse,
} from '@dao-dao/types/contracts/DaoPreProposeSingle'

import {
  CwPreProposeSingleClient,
  CwPreProposeSingleQueryClient,
} from './DaoPreProposeSingle.client'

type QueryClientParams = WithChainId<{
  contractAddress: string
}>

export const queryClient = selectorFamily<
  CwPreProposeSingleQueryClient,
  QueryClientParams
>({
  key: 'cwPreProposeSingleQueryClient',
  get:
    ({ contractAddress, chainId }) =>
    ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      return new CwPreProposeSingleQueryClient(client, contractAddress)
    },
  dangerouslyAllowMutability: true,
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
      const proposalModule = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formula: 'daoPreProposeSingle/proposalModule',
        })
      )
      if (proposalModule) {
        return proposalModule
      }

      // If indexer query fails, fallback to contract query.
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
      const dao = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formula: 'daoPreProposeSingle/dao',
        })
      )
      if (dao) {
        return dao
      }

      // If indexer query fails, fallback to contract query.
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
      const config = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formula: 'daoPreProposeSingle/config',
        })
      )
      if (config) {
        return config
      }

      // If indexer query fails, fallback to contract query.
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
      const depositInfo = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formula: 'daoPreProposeSingle/depositInfo',
          args: params[0],
        })
      )
      if (depositInfo) {
        return depositInfo
      }

      // If indexer query fails, fallback to contract query.
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
