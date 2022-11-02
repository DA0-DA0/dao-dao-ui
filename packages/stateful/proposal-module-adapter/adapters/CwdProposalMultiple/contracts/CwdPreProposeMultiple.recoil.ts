import { selectorFamily } from 'recoil'

import {
  cosmWasmClientForChainSelector,
  queryContractIndexerSelector,
  signingCosmWasmClientAtom,
} from '@dao-dao/state'
import { WithChainId } from '@dao-dao/types'
import {
  Config,
  DaoResponse,
  DepositInfoResponse,
  ProposalModuleResponse,
} from '@dao-dao/types/contracts/CwdPreProposeMultiple'

import {
  CwdPreProposeMultipleClient,
  CwdPreProposeMultipleQueryClient,
} from './CwdPreProposeMultiple.client'

type QueryClientParams = WithChainId<{
  contractAddress: string
}>

export const queryClient = selectorFamily<
  CwdPreProposeMultipleQueryClient,
  QueryClientParams
>({
  key: 'CwdPreProposeMultipleQueryClient',
  get:
    ({ contractAddress, chainId }) =>
    ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      return new CwdPreProposeMultipleQueryClient(client, contractAddress)
    },
})

export type ExecuteClientParams = {
  contractAddress: string
  sender: string
}

export const executeClient = selectorFamily<
  CwdPreProposeMultipleClient | undefined,
  ExecuteClientParams
>({
  key: 'cwPreProposeMultipleExecuteClient',
  get:
    ({ contractAddress, sender }) =>
    ({ get }) => {
      const client = get(signingCosmWasmClientAtom)
      if (!client) return

      return new CwdPreProposeMultipleClient(client, sender, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export const proposalModuleSelector = selectorFamily<
  ProposalModuleResponse,
  QueryClientParams & {
    params: Parameters<CwdPreProposeMultipleQueryClient['proposalModule']>
  }
>({
  key: 'cwPreProposeMultipleProposalModule',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const proposalModule = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'daoPreProposeMultiple/proposalModule',
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
    params: Parameters<CwdPreProposeMultipleQueryClient['dao']>
  }
>({
  key: 'cwPreProposeMultipleDao',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const dao = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'daoPreProposeMultiple/dao',
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
  Config,
  QueryClientParams & {
    params: Parameters<CwdPreProposeMultipleQueryClient['config']>
  }
>({
  key: 'cwdPreProposeMultipleConfig',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const dao = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'daoPreProposeMultiple/dao',
        })
      )
      if (dao) {
        return dao
      }
      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.config(...params)
    },
})
export const depositInfoSelector = selectorFamily<
  DepositInfoResponse,
  QueryClientParams & {
    params: Parameters<CwdPreProposeMultipleQueryClient['depositInfo']>
  }
>({
  key: 'cwPreProposeMultipleDepositInfo',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const dao = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'daoPreProposeMultiple/dao',
        })
      )
      if (dao) {
        return dao
      }
      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.depositInfo(...params)
    },
})

// export const extensionSelector = selectorFamily<
//   ExtensionResponse,
//   QueryClientParams & {
//     params: Parameters<CwdPreProposeMultipleQueryClient['queryExtension']>
//   }
// >({
//   key: 'cwPreProposeMultipleExtension',
//   get:
//     ({ params, ...queryClientParams }) =>
//     async ({ get }) => {
//       const client = get(queryClient(queryClientParams))
//       return await client.queryExtension(...params)
//     },
// })
