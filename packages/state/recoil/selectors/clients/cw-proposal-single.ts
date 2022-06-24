import { selectorFamily } from 'recoil'

import {
  ConfigResponse,
  CwProposalSingleClient as ExecuteClient,
  InfoResponse,
  ListProposalsResponse,
  ListVotesResponse,
  ProposalCountResponse,
  ProposalHooksResponse,
  ProposalResponse,
  CwProposalSingleQueryClient as QueryClient,
  ReverseProposalsResponse,
  VoteHooksResponse,
  VoteResponse,
} from '../../../clients/cw-proposal-single'
import {
  refreshProposalIdAtom,
  refreshProposalsIdAtom,
} from '../../atoms/refresh'
import { cosmWasmClientSelector, signingCosmWasmClientAtom } from '../chain'

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
      const client = get(signingCosmWasmClientAtom)
      if (!client) return

      return new ExecuteClient(client, sender, contractAddress)
    },
  dangerouslyAllowMutability: true,
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

      get(
        refreshProposalIdAtom({
          address: queryClientParams.contractAddress,
          proposalId: params[0].proposalId,
        })
      )

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

      get(refreshProposalsIdAtom)

      return await client.listProposals(...params)
    },
})

export const listAllProposalsSelector = selectorFamily<
  ListProposalsResponse | undefined,
  QueryClientParams & { params: Parameters<QueryClient['listProposals']> }
>({
  key: 'cwProposalSingleListAllProposals',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      if (!client) return

      get(refreshProposalsIdAtom)

      const allProposals: ListProposalsResponse['proposals'] = []
      const limit = params[0].limit ?? 30
      let { startAfter } = params[0]

      while (true) {
        const proposals =
          get(
            listProposalsSelector({
              ...queryClientParams,
              params: [{ startAfter, limit }],
            })
          )?.proposals ?? []

        allProposals.push(...proposals)

        // If we did not get all proposals we asked for, we're at the end.
        if (proposals.length < limit) break
        // Start after last proposal we got.
        startAfter = proposals[proposals.length - 1].id
      }

      return { proposals: allProposals }
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

      get(refreshProposalsIdAtom)

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

      get(refreshProposalsIdAtom)

      try {
        return await client.proposalCount()
      } catch {
        // Contract throws error if no proposals have been made, so return
        // 0 for now until the contract is fixed.
        return 0
      }
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

      get(
        refreshProposalIdAtom({
          address: queryClientParams.contractAddress,
          proposalId: params[0].proposalId,
        })
      )

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

      get(
        refreshProposalIdAtom({
          address: queryClientParams.contractAddress,
          proposalId: params[0].proposalId,
        })
      )

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
