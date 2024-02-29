import { selectorFamily } from 'recoil'

import { WithChainId } from '@dao-dao/types'
import {
  ProposalListResponseForEmpty,
  ProposalResponseForEmpty,
  ThresholdResponse,
  VoteListResponse,
  VoteResponse,
  VoterListResponse,
  VoterResponse,
} from '@dao-dao/types/contracts/Cw3FixedMultisig'

import { Cw3FixedMultisigQueryClient } from '../../../contracts/Cw3FixedMultisig'
import { cosmWasmClientForChainSelector } from '../chain'

type QueryClientParams = WithChainId<{
  contractAddress: string
}>

export const queryClient = selectorFamily<
  Cw3FixedMultisigQueryClient,
  QueryClientParams
>({
  key: 'cw3FixedMultisigQueryClient',
  get:
    ({ contractAddress, chainId }) =>
    ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      return new Cw3FixedMultisigQueryClient(client, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export const thresholdSelector = selectorFamily<
  ThresholdResponse,
  QueryClientParams & {
    params: Parameters<Cw3FixedMultisigQueryClient['threshold']>
  }
>({
  key: 'cw3FixedMultisigThreshold',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.threshold(...params)
    },
})
export const proposalSelector = selectorFamily<
  ProposalResponseForEmpty,
  QueryClientParams & {
    params: Parameters<Cw3FixedMultisigQueryClient['proposal']>
  }
>({
  key: 'cw3FixedMultisigProposal',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.proposal(...params)
    },
})
export const listProposalsSelector = selectorFamily<
  ProposalListResponseForEmpty,
  QueryClientParams & {
    params: Parameters<Cw3FixedMultisigQueryClient['listProposals']>
  }
>({
  key: 'cw3FixedMultisigListProposals',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.listProposals(...params)
    },
})
export const reverseProposalsSelector = selectorFamily<
  ProposalListResponseForEmpty,
  QueryClientParams & {
    params: Parameters<Cw3FixedMultisigQueryClient['reverseProposals']>
  }
>({
  key: 'cw3FixedMultisigReverseProposals',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.reverseProposals(...params)
    },
})
export const getVoteSelector = selectorFamily<
  VoteResponse,
  QueryClientParams & {
    params: Parameters<Cw3FixedMultisigQueryClient['getVote']>
  }
>({
  key: 'cw3FixedMultisigVote',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.getVote(...params)
    },
})
export const listVotesSelector = selectorFamily<
  VoteListResponse,
  QueryClientParams & {
    params: Parameters<Cw3FixedMultisigQueryClient['listVotes']>
  }
>({
  key: 'cw3FixedMultisigListVotes',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.listVotes(...params)
    },
})
export const voterSelector = selectorFamily<
  VoterResponse,
  QueryClientParams & {
    params: Parameters<Cw3FixedMultisigQueryClient['voter']>
  }
>({
  key: 'cw3FixedMultisigVoter',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.voter(...params)
    },
})
export const listVotersSelector = selectorFamily<
  VoterListResponse,
  QueryClientParams & {
    params: Parameters<Cw3FixedMultisigQueryClient['listVoters']>
  }
>({
  key: 'cw3FixedMultisigListVoters',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.listVoters(...params)
    },
})
