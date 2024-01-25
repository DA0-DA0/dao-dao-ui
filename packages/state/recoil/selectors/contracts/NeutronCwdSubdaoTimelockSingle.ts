import { selectorFamily } from 'recoil'

import { WithChainId } from '@dao-dao/types'
import {
  Config,
  NullableString,
  ProposalListResponse,
  SingleChoiceProposal,
} from '@dao-dao/types/contracts/NeutronCwdSubdaoTimelockSingle'

import { NeutronCwdSubdaoTimelockSingleQueryClient } from '../../../contracts/NeutronCwdSubdaoTimelockSingle'
import { cosmWasmClientForChainSelector } from '../chain'

type QueryClientParams = WithChainId<{
  contractAddress: string
}>

export const queryClient = selectorFamily<
  NeutronCwdSubdaoTimelockSingleQueryClient,
  QueryClientParams
>({
  key: 'neutronCwdSubdaoTimelockSingleQueryClient',
  get:
    ({ contractAddress, chainId }) =>
    ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      return new NeutronCwdSubdaoTimelockSingleQueryClient(
        client,
        contractAddress
      )
    },
  dangerouslyAllowMutability: true,
})

export const configSelector = selectorFamily<
  Config,
  QueryClientParams & {
    params: Parameters<NeutronCwdSubdaoTimelockSingleQueryClient['config']>
  }
>({
  key: 'neutronCwdSubdaoTimelockSingleConfig',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.config(...params)
    },
})
export const proposalSelector = selectorFamily<
  SingleChoiceProposal,
  QueryClientParams & {
    params: Parameters<NeutronCwdSubdaoTimelockSingleQueryClient['proposal']>
  }
>({
  key: 'neutronCwdSubdaoTimelockSingleProposal',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.proposal(...params)
    },
})
export const listProposalsSelector = selectorFamily<
  ProposalListResponse,
  QueryClientParams & {
    params: Parameters<
      NeutronCwdSubdaoTimelockSingleQueryClient['listProposals']
    >
  }
>({
  key: 'neutronCwdSubdaoTimelockSingleListProposals',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.listProposals(...params)
    },
})
export const proposalExecutionErrorSelector = selectorFamily<
  NullableString,
  QueryClientParams & {
    params: Parameters<
      NeutronCwdSubdaoTimelockSingleQueryClient['proposalExecutionError']
    >
  }
>({
  key: 'neutronCwdSubdaoTimelockSingleProposalExecutionError',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.proposalExecutionError(...params)
    },
})
