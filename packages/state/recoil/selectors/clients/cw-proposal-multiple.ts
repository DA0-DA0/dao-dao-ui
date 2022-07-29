import { selectorFamily } from 'recoil'

import {
  ConfigResponse,
  CwProposalMultipleClient,
  CwProposalMultipleQueryClient,
  GetVoteResponse,
  InfoResponse,
  ListProposalsResponse,
  ListVotesResponse,
  ProposalCountResponse,
  ProposalHooksResponse,
  ProposalResponse,
  ReverseProposalsResponse,
  VoteHooksResponse,
} from '../../../clients/cw-proposal-multiple'
import { signingCosmWasmClientAtom } from '../../atoms'
import {
  refreshProposalIdAtom,
  refreshProposalsIdAtom,
} from '../../atoms/refresh'
import { cosmWasmClientSelector } from '../chain'

type QueryClientParams = {
  contractAddress: string
}

const queryClient = selectorFamily<
  CwProposalMultipleQueryClient,
  QueryClientParams
>({
  key: 'cwProposalMultipleQueryClient',
  get:
    ({ contractAddress }) =>
    ({ get }) => {
      const client = get(cosmWasmClientSelector)
      return new CwProposalMultipleQueryClient(client, contractAddress)
    },
})

export type ExecuteClientParams = {
  contractAddress: string
  sender: string
}

export const executeClient = selectorFamily<
  CwProposalMultipleClient | undefined,
  ExecuteClientParams
>({
  key: 'cwProposalMultipleExecuteClient',
  get:
    ({ contractAddress, sender }) =>
    ({ get }) => {
      const client = get(signingCosmWasmClientAtom)
      if (!client) return

      return new CwProposalMultipleClient(client, sender, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export const configSelector = selectorFamily<
  ConfigResponse,
  QueryClientParams & {
    params: Parameters<CwProposalMultipleQueryClient['config']>
  }
>({
  key: 'cwProposalMultipleConfig',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.config(...params)
    },
})
export const proposalSelector = selectorFamily<
  ProposalResponse,
  QueryClientParams & {
    params: Parameters<CwProposalMultipleQueryClient['proposal']>
  }
>({
  key: 'cwProposalMultipleProposal',
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
    params: Parameters<CwProposalMultipleQueryClient['listProposals']>
  }
>({
  key: 'cwProposalMultipleListProposals',
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
    params: Parameters<CwProposalMultipleQueryClient['listProposals']>
  }
>({
  key: 'cwProposalMultipleListAllProposals',
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
    params: Parameters<CwProposalMultipleQueryClient['reverseProposals']>
  }
>({
  key: 'cwProposalMultipleReverseProposals',
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
  QueryClientParams & {
    params: Parameters<CwProposalMultipleQueryClient['proposalCount']>
  }
>({
  key: 'cwProposalMultipleProposalCount',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))

      get(refreshProposalsIdAtom)

      return await client.proposalCount(...params)
    },
})
export const getVoteSelector = selectorFamily<
  GetVoteResponse,
  QueryClientParams & {
    params: Parameters<CwProposalMultipleQueryClient['getVote']>
  }
>({
  key: 'cwProposalMultipleGetVote',
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
    params: Parameters<CwProposalMultipleQueryClient['listVotes']>
  }
>({
  key: 'cwProposalMultipleListVotes',
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
  QueryClientParams & {
    params: Parameters<CwProposalMultipleQueryClient['proposalHooks']>
  }
>({
  key: 'cwProposalMultipleProposalHooks',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.proposalHooks(...params)
    },
})
export const voteHooksSelector = selectorFamily<
  VoteHooksResponse,
  QueryClientParams & {
    params: Parameters<CwProposalMultipleQueryClient['voteHooks']>
  }
>({
  key: 'cwProposalMultipleVoteHooks',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.voteHooks(...params)
    },
})
export const infoSelector = selectorFamily<
  InfoResponse,
  QueryClientParams & {
    params: Parameters<CwProposalMultipleQueryClient['info']>
  }
>({
  key: 'cwProposalMultipleInfo',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.info(...params)
    },
})
