import { selectorFamily } from 'recoil'

import { cosmWasmClientForChainSelector } from '@dao-dao/state'
import { Addr, Binary, WithChainId } from '@dao-dao/types'
import {
  Config,
  DepositInfoResponse,
  HooksResponse,
} from '@dao-dao/types/contracts/DaoPreProposeApprovalSingle'

import { DaoPreProposeApprovalSingleQueryClient } from './DaoPreProposeApprovalSingle.client'

type QueryClientParams = WithChainId<{
  contractAddress: string
}>

export const queryClient = selectorFamily<
  DaoPreProposeApprovalSingleQueryClient,
  QueryClientParams
>({
  key: 'daoPreProposeApprovalSingleQueryClient',
  get:
    ({ contractAddress, chainId }) =>
    ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      return new DaoPreProposeApprovalSingleQueryClient(client, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export const proposalModuleSelector = selectorFamily<
  Addr,
  QueryClientParams & {
    params: Parameters<DaoPreProposeApprovalSingleQueryClient['proposalModule']>
  }
>({
  key: 'daoPreProposeApprovalSingleProposalModule',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.proposalModule(...params)
    },
})
export const daoSelector = selectorFamily<
  Addr,
  QueryClientParams & {
    params: Parameters<DaoPreProposeApprovalSingleQueryClient['dao']>
  }
>({
  key: 'daoPreProposeApprovalSingleDao',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.dao(...params)
    },
})
export const configSelector = selectorFamily<
  Config,
  QueryClientParams & {
    params: Parameters<DaoPreProposeApprovalSingleQueryClient['config']>
  }
>({
  key: 'daoPreProposeApprovalSingleConfig',
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
    params: Parameters<DaoPreProposeApprovalSingleQueryClient['depositInfo']>
  }
>({
  key: 'daoPreProposeApprovalSingleDepositInfo',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.depositInfo(...params)
    },
})
export const proposalSubmittedHooksSelector = selectorFamily<
  HooksResponse,
  QueryClientParams & {
    params: Parameters<
      DaoPreProposeApprovalSingleQueryClient['proposalSubmittedHooks']
    >
  }
>({
  key: 'daoPreProposeApprovalSingleProposalSubmittedHooks',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.proposalSubmittedHooks(...params)
    },
})
export const queryExtensionSelector = selectorFamily<
  Binary,
  QueryClientParams & {
    params: Parameters<DaoPreProposeApprovalSingleQueryClient['queryExtension']>
  }
>({
  key: 'daoPreProposeApprovalSingleQueryExtension',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.queryExtension(...params)
    },
})
