import { selectorFamily } from 'recoil'

import { WithChainId } from '@dao-dao/types'
import {
  Addr,
  Config,
  DepositInfoResponse,
} from '@dao-dao/types/contracts/NeutronCwdPreProposeSingleOverrule'

import { NeutronCwdPreProposeSingleOverruleQueryClient } from '../../../contracts/NeutronCwdPreProposeSingleOverrule'
import { cosmWasmClientForChainSelector } from '../chain'

type QueryClientParams = WithChainId<{
  contractAddress: string
}>

export const queryClient = selectorFamily<
  NeutronCwdPreProposeSingleOverruleQueryClient,
  QueryClientParams
>({
  key: 'neutronCwdPreProposeSingleOverruleQueryClient',
  get:
    ({ contractAddress, chainId }) =>
    ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      return new NeutronCwdPreProposeSingleOverruleQueryClient(
        client,
        contractAddress
      )
    },
  dangerouslyAllowMutability: true,
})

export const proposalModuleSelector = selectorFamily<
  Addr,
  QueryClientParams & {
    params: Parameters<
      NeutronCwdPreProposeSingleOverruleQueryClient['proposalModule']
    >
  }
>({
  key: 'neutronCwdPreProposeSingleOverruleProposalModule',
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
    params: Parameters<NeutronCwdPreProposeSingleOverruleQueryClient['dao']>
  }
>({
  key: 'neutronCwdPreProposeSingleOverruleDao',
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
    params: Parameters<NeutronCwdPreProposeSingleOverruleQueryClient['config']>
  }
>({
  key: 'neutronCwdPreProposeSingleOverruleConfig',
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
    params: Parameters<
      NeutronCwdPreProposeSingleOverruleQueryClient['depositInfo']
    >
  }
>({
  key: 'neutronCwdPreProposeSingleOverruleDepositInfo',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.depositInfo(...params)
    },
})
export const queryExtensionSelector = selectorFamily<
  string | number,
  QueryClientParams & {
    params: Parameters<
      NeutronCwdPreProposeSingleOverruleQueryClient['queryExtension']
    >
  }
>({
  key: 'neutronCwdPreProposeSingleOverruleQueryExtension',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.queryExtension(...params)
    },
})
