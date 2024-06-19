import { selectorFamily } from 'recoil'

import { WithChainId } from '@dao-dao/types'
import {
  Config,
  DepositInfoResponse,
} from '@dao-dao/types/contracts/DaoPreProposeMultiple'

import {
  DaoPreProposeMultipleClient,
  DaoPreProposeMultipleQueryClient,
} from '../../../contracts/DaoPreProposeMultiple'
import { signingCosmWasmClientAtom } from '../../atoms'
import { cosmWasmClientForChainSelector } from '../chain'
import { queryContractIndexerSelector } from '../indexer'

type QueryClientParams = WithChainId<{
  contractAddress: string
}>

export const queryClient = selectorFamily<
  DaoPreProposeMultipleQueryClient,
  QueryClientParams
>({
  key: 'daoPreProposeMultipleQueryClient',
  get:
    ({ contractAddress, chainId }) =>
    ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      return new DaoPreProposeMultipleQueryClient(client, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export type ExecuteClientParams = WithChainId<{
  contractAddress: string
  sender: string
}>

export const executeClient = selectorFamily<
  DaoPreProposeMultipleClient | undefined,
  ExecuteClientParams
>({
  key: 'daoPreProposeMultipleExecuteClient',
  get:
    ({ chainId, contractAddress, sender }) =>
    ({ get }) => {
      const client = get(signingCosmWasmClientAtom({ chainId }))
      if (!client) return

      return new DaoPreProposeMultipleClient(client, sender, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export const proposalModuleSelector = selectorFamily<
  string,
  QueryClientParams & {
    params: Parameters<DaoPreProposeMultipleQueryClient['proposalModule']>
  }
>({
  key: 'daoPreProposeMultipleProposalModule',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const proposalModule = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formula: 'daoPreProposeMultiple/proposalModule',
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
    params: Parameters<DaoPreProposeMultipleQueryClient['dao']>
  }
>({
  key: 'daoPreProposeMultipleDao',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const dao = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formula: 'daoPreProposeMultiple/dao',
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
  Config,
  QueryClientParams & {
    params: Parameters<DaoPreProposeMultipleQueryClient['config']>
  }
>({
  key: 'daodPreProposeMultipleConfig',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const config = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formula: 'daoPreProposeMultiple/config',
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
    params: Parameters<DaoPreProposeMultipleQueryClient['depositInfo']>
  }
>({
  key: 'daoPreProposeMultipleDepositInfo',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const depositInfo = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formula: 'daoPreProposeMultiple/depositInfo',
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
//     params: Parameters<DaoPreProposeMultipleQueryClient['queryExtension']>
//   }
// >({
//   key: 'daoPreProposeMultipleExtension',
//   get:
//     ({ params, ...queryClientParams }) =>
//     async ({ get }) => {
//       const client = get(queryClient(queryClientParams))
//       return await client.queryExtension(...params)
//     },
// })
