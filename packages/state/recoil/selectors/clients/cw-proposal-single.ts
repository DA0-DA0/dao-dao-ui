import { selectorFamily } from 'recoil'

import {
  Client as ExecuteClient,
  ConfigResponse,
  InfoResponse,
  ListProposalsResponse,
  ListVotesResponse,
  ProposalCountResponse,
  ProposalHooksResponse,
  ProposalResponse,
  QueryClient,
  ReverseProposalsResponse,
  VoteHooksResponse,
  VoteResponse,
} from '../../../clients/cw-proposal-single'
import { cosmWasmClientSelector, signingCosmWasmClientSelector } from '../chain'

type QueryClientParams = {
  contractAddress: string
}

const queryClient = selectorFamily<QueryClient | undefined, QueryClientParams>({
  key: 'cwProposalSingleQueryClient',
  get:
    ({ contractAddress }) =>
    ({ get }) => {
      const client = get(cosmWasmClientSelector)
      if (!client) return

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
  key: 'cwProposalSingleExecuteClient',
  get:
    ({ contractAddress, sender }) =>
    ({ get }) => {
      const client = get(signingCosmWasmClientSelector)
      if (!client) return

      return new ExecuteClient(client, sender, contractAddress)
    },
})

export const configSelector = selectorFamily<
  ConfigResponse | undefined,
  QueryClientParams
>({
  key: 'cwProposalSingleConfig',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      if (!client) return

      return await client.config()
    },
})

export const proposalSelector = selectorFamily<
  ProposalResponse | undefined,
  QueryClientParams & { params: Parameters<QueryClient['proposal']> }
>({
  key: 'cwProposalSingleProposal',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      if (!client) return

      return await client.proposal(...params)
    },
})

export const listProposalsSelector = selectorFamily<
  ListProposalsResponse | undefined,
  QueryClientParams & { params: Parameters<QueryClient['listProposals']> }
>({
  key: 'cwProposalSingleListProposals',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      if (!client) return

      return await client.listProposals(...params)
    },
})

export const reverseProposalsSelector = selectorFamily<
  ReverseProposalsResponse | undefined,
  QueryClientParams & { params: Parameters<QueryClient['reverseProposals']> }
>({
  key: 'cwProposalSingleReverseProposals',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      if (!client) return

      return await client.reverseProposals(...params)
    },
})

export const proposalCountSelector = selectorFamily<
  ProposalCountResponse | undefined,
  QueryClientParams
>({
  key: 'cwProposalSingleProposalCount',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      if (!client) return

      return await client.proposalCount()
    },
})

export const getVoteSelector = selectorFamily<
  VoteResponse | undefined,
  QueryClientParams & { params: Parameters<QueryClient['getVote']> }
>({
  key: 'cwProposalSingleGetVote',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      if (!client) return

      return await client.getVote(...params)
    },
})

export const listVotesSelector = selectorFamily<
  ListVotesResponse | undefined,
  QueryClientParams & { params: Parameters<QueryClient['listVotes']> }
>({
  key: 'cwProposalSingleListVotes',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      if (!client) return

      return await client.listVotes(...params)
    },
})

export const proposalHooksSelector = selectorFamily<
  ProposalHooksResponse | undefined,
  QueryClientParams
>({
  key: 'cwProposalSingleProposalHooks',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      if (!client) return

      return await client.proposalHooks()
    },
})

export const voteHooksSelector = selectorFamily<
  VoteHooksResponse | undefined,
  QueryClientParams
>({
  key: 'cwProposalSingleVoteHooks',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      if (!client) return

      return await client.voteHooks()
    },
})

export const infoSelector = selectorFamily<
  InfoResponse | undefined,
  QueryClientParams
>({
  key: 'cwProposalSingleInfo',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      if (!client) return

      return await client.info()
    },
})
