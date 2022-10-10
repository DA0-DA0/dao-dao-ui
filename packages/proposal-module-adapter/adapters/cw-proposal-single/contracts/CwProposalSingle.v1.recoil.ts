import { selectorFamily } from 'recoil'

import {
  cosmWasmClientSelector,
  refreshProposalIdAtom,
  refreshProposalsIdAtom,
  signingCosmWasmClientAtom,
} from '@dao-dao/state'
import {
  ConfigResponse,
  InfoResponse,
  ListProposalsResponse,
  ListVotesResponse,
  ProposalCountResponse,
  ProposalHooksResponse,
  ProposalResponse,
  ReverseProposalsResponse,
  VoteHooksResponse,
  VoteResponse,
} from '@dao-dao/tstypes/contracts/CwProposalSingle.v1'

import {
  CwProposalSingleClient,
  CwProposalSingleQueryClient,
} from './CwProposalSingle.v1.client'

type QueryClientParams = {
  contractAddress: string
}

const queryClient = selectorFamily<
  CwProposalSingleQueryClient,
  QueryClientParams
>({
  key: 'cwProposalSingleV1QueryClient',
  get:
    ({ contractAddress }) =>
    ({ get }) => {
      const client = get(cosmWasmClientSelector)
      return new CwProposalSingleQueryClient(client, contractAddress)
    },
})

export type ExecuteClientParams = {
  contractAddress: string
  sender: string
}

export const executeClient = selectorFamily<
  CwProposalSingleClient | undefined,
  ExecuteClientParams
>({
  key: 'cwProposalSingleV1ExecuteClient',
  get:
    ({ contractAddress, sender }) =>
    ({ get }) => {
      const client = get(signingCosmWasmClientAtom)
      if (!client) return

      return new CwProposalSingleClient(client, sender, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export const configSelector = selectorFamily<ConfigResponse, QueryClientParams>(
  {
    key: 'cwProposalSingleV1Config',
    get:
      (queryClientParams) =>
      async ({ get }) => {
        const client = get(queryClient(queryClientParams))

        return await client.config()
      },
  }
)

export const proposalSelector = selectorFamily<
  ProposalResponse,
  QueryClientParams & { params: Parameters<CwProposalSingleClient['proposal']> }
>({
  key: 'cwProposalSingleV1Proposal',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))

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
  ListProposalsResponse,
  QueryClientParams & {
    params: Parameters<CwProposalSingleClient['listProposals']>
  }
>({
  key: 'cwProposalSingleV1ListProposals',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))

      get(refreshProposalsIdAtom)

      return await client.listProposals(...params)
    },
})

export const listAllProposalsSelector = selectorFamily<
  ListProposalsResponse,
  QueryClientParams & {
    params: Parameters<CwProposalSingleClient['listProposals']>
  }
>({
  key: 'cwProposalSingleV1ListAllProposals',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      get(refreshProposalsIdAtom)

      const allProposals: ListProposalsResponse['proposals'] = []
      const limit = params[0].limit ?? 30
      let { startAfter } = params[0]

      while (true) {
        const { proposals } = get(
          listProposalsSelector({
            ...queryClientParams,
            params: [{ startAfter, limit }],
          })
        )

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
  ReverseProposalsResponse,
  QueryClientParams & {
    params: Parameters<CwProposalSingleClient['reverseProposals']>
  }
>({
  key: 'cwProposalSingleV1ReverseProposals',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))

      get(refreshProposalsIdAtom)

      return await client.reverseProposals(...params)
    },
})

export const proposalCountSelector = selectorFamily<
  ProposalCountResponse,
  QueryClientParams
>({
  key: 'cwProposalSingleV1ProposalCount',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))

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
  VoteResponse,
  QueryClientParams & {
    params: Parameters<CwProposalSingleClient['getVote']>
  }
>({
  key: 'cwProposalSingleV1GetVote',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))

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
  ListVotesResponse,
  QueryClientParams & {
    params: Parameters<CwProposalSingleClient['listVotes']>
  }
>({
  key: 'cwProposalSingleV1ListVotes',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))

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
  ProposalHooksResponse,
  QueryClientParams
>({
  key: 'cwProposalSingleV1ProposalHooks',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))

      return await client.proposalHooks()
    },
})

export const voteHooksSelector = selectorFamily<
  VoteHooksResponse,
  QueryClientParams
>({
  key: 'cwProposalSingleV1VoteHooks',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))

      return await client.voteHooks()
    },
})

export const infoSelector = selectorFamily<InfoResponse, QueryClientParams>({
  key: 'cwProposalSingleV1Info',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))

      return await client.info()
    },
})
