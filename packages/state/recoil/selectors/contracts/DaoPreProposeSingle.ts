import { selectorFamily } from 'recoil'

import { WithChainId } from '@dao-dao/types'
import {
  ConfigResponse,
  DepositInfoResponse,
} from '@dao-dao/types/contracts/DaoPreProposeSingle'

import {
  DaoPreProposeSingleClient,
  DaoPreProposeSingleQueryClient,
} from '../../../contracts/DaoPreProposeSingle'
import { signingCosmWasmClientAtom } from '../../atoms'
import { cosmWasmClientForChainSelector } from '../chain'
import { queryContractIndexerSelector } from '../indexer'

type QueryClientParams = WithChainId<{
  contractAddress: string
}>

export const queryClient = selectorFamily<
  DaoPreProposeSingleQueryClient,
  QueryClientParams
>({
  key: 'daoPreProposeSingleQueryClient',
  get:
    ({ contractAddress, chainId }) =>
    ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      return new DaoPreProposeSingleQueryClient(client, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export type ExecuteClientParams = WithChainId<{
  contractAddress: string
  sender: string
}>

export const executeClient = selectorFamily<
  DaoPreProposeSingleClient | undefined,
  ExecuteClientParams
>({
  key: 'daoPreProposeSingleExecuteClient',
  get:
    ({ chainId, contractAddress, sender }) =>
    ({ get }) => {
      const client = get(signingCosmWasmClientAtom({ chainId }))
      if (!client) return

      return new DaoPreProposeSingleClient(client, sender, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export const proposalModuleSelector = selectorFamily<
  string,
  QueryClientParams & {
    params: Parameters<DaoPreProposeSingleQueryClient['proposalModule']>
  }
>({
  key: 'daoPreProposeSingleProposalModule',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const proposalModule = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formula: 'daoPreProposeSingle/proposalModule',
        })
      )
      if (proposalModule && typeof proposalModule === 'string') {
        return proposalModule
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.proposalModule(...params)
    },
})
export const daoSelector = selectorFamily<
  string,
  QueryClientParams & {
    params: Parameters<DaoPreProposeSingleQueryClient['dao']>
  }
>({
  key: 'daoPreProposeSingleDao',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const dao = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formula: 'daoPreProposeSingle/dao',
        })
      )
      if (dao && typeof dao === 'string') {
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
    params: Parameters<DaoPreProposeSingleQueryClient['config']>
  }
>({
  key: 'daoPreProposeSingleConfig',
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
    params: Parameters<DaoPreProposeSingleQueryClient['depositInfo']>
  }
>({
  key: 'daoPreProposeSingleDepositInfo',
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
//     params: Parameters<DaoPreProposeSingleQueryClient['queryExtension']>
//   }
// >({
//   key: 'daoPreProposeSingleExtension',
//   get:
//     ({ params, ...queryClientParams }) =>
//     async ({ get }) => {
//       const client = get(queryClient(queryClientParams))
//       return await client.queryExtension(...params)
//     },
// })
