import {
  ProposalResponse,
  ProposalTallyResponse,
  VoteInfo,
} from '@dao-dao/types/contracts/cw3-dao'
import {
  proposalMapAtom,
  proposalsRequestIdAtom,
} from 'atoms/proposals'
import { atomFamily, selectorFamily } from 'recoil'
import { ProposalMap } from 'types/proposals'
import { cosmWasmClient } from './cosm'
import {
  EmptyProposalResponse,
  EmptyThresholdResponse,
} from 'models/proposal/proposal'
import {
  ProposalMapItem,
  ProposalKey,
  ProposalMessageKey,
} from 'types/proposals'
import { MessageMapEntry } from 'models/proposal/messageMap'

export type ProposalIdInput = string | number

export type ProposalIdParamType = {
  proposal_id: number
}

export type ProposalSelectorParams = {
  contractAddress: string
  proposalId: ProposalIdInput
}

export type ProposalExecuteParams = {
  contractAddress: string
  proposalId: string | number
  walletAddress: string
}

function parsedProposalId(proposalId: ProposalIdInput): number {
  if (typeof proposalId === 'string') {
    proposalId = parseInt(proposalId)
  }
  return proposalId
}

function proposalIdParam(proposalId: ProposalIdInput): ProposalIdParamType {
  return { proposal_id: parsedProposalId(proposalId) }
}

function proposalParam(key: string, proposalId: ProposalIdInput) {
  return { [key]: proposalIdParam(proposalId) }
}

export const onChainProposalsSelector = selectorFamily<
  ProposalResponse[],
  {
    contractAddress: string
    startBefore: number
    limit: number
  }
>({
  key: 'onChainProposals',
  get:
    ({ contractAddress, startBefore, limit }) =>
    async ({ get }) => {
      // While this looks like a no-op, it forces a dependency on
      // the proposalRequestId, which can be incremented to force
      // a re-fetch after creating a new propossal.
      get(proposalsRequestIdAtom)

      const client = get(cosmWasmClient)
      const { proposals } = await client.queryContractSmart(contractAddress, {
        reverse_proposals: {
          ...(startBefore && { start_before: startBefore }),
          limit,
        },
      })
      return proposals
    },
})

// Indicates how many times a given proposal has been updated via the
// UI. For example, voting on a proposal ought to increment the update
// count for the proposal.
//
// This is used by proposal selectors so that they might update when a
// UI action triggers the database to change.
export const proposalUpdateCountAtom = atomFamily<
  number,
  { contractAddress: string; proposalId: number }
>({
  key: 'proposalUpdateCountAtom',
  default: 0,
})

export const proposalSelector = selectorFamily<
  ProposalResponse,
  { contractAddress: string; proposalId: number }
>({
  key: 'proposalSelector',
  get:
    ({
      contractAddress,
      proposalId,
    }: {
      contractAddress: string
      proposalId: number
    }) =>
    async ({ get }) => {
      const draftProposal = get(
        draftProposalSelector({ contractAddress, proposalId })
      )
      if (draftProposal?.proposal) {
        return draftProposal?.proposal
      }
      get(proposalUpdateCountAtom({ contractAddress, proposalId }))

      const client = get(cosmWasmClient)
      const proposal = await client.queryContractSmart(contractAddress, {
        proposal: { proposal_id: proposalId },
      })
      return proposal
    },
})

export const proposalVotesSelector = selectorFamily<
  VoteInfo[],
  { contractAddress: string; proposalId: number }
>({
  key: 'proposalVotesSelector',
  get:
    ({
      contractAddress,
      proposalId,
    }: {
      contractAddress: string
      proposalId: number
    }) =>
    async ({ get }) => {
      get(proposalUpdateCountAtom({ contractAddress, proposalId }))

      const client = get(cosmWasmClient)
      const votes = await client.queryContractSmart(contractAddress, {
        list_votes: { proposal_id: proposalId },
      })
      return votes.votes
    },
})

export const proposalTallySelector = selectorFamily<
  ProposalTallyResponse,
  { contractAddress: string; proposalId: number }
>({
  key: 'proposalTallySelector',
  get:
    ({
      contractAddress,
      proposalId,
    }: {
      contractAddress: string
      proposalId: number
    }) =>
    async ({ get }) => {
      get(proposalUpdateCountAtom({ contractAddress, proposalId }))

      const client = get(cosmWasmClient)
      const tally = await client.queryContractSmart(contractAddress, {
        tally: { proposal_id: proposalId },
      })
      return tally
    },
})

export const draftProposalsSelector = selectorFamily<ProposalMap, string>({
  key: 'draftProposals',
  get:
    (contractAddress) =>
    ({ get }) => {
      return get(proposalMapAtom(contractAddress))
    },
})

export const proposalsSelector = selectorFamily<
  ProposalResponse[],
  {
    contractAddress: string
    startBefore: number
    limit: number
  }
>({
  key: 'proposals',
  get:
    ({ contractAddress, startBefore, limit }) =>
    async ({ get }) => {
      const onChainProposalList = get(
        onChainProposalsSelector({ contractAddress, startBefore, limit })
      )
      let draftProposalItems: ProposalResponse[] = []
      // Add in draft proposals:
      const draftProposals = get(draftProposalsSelector(contractAddress))
      if (draftProposals) {
        draftProposalItems = Object.values(draftProposals).map((draft) => {
          const proposalResponse: ProposalResponse = {
            ...EmptyProposalResponse,
            ...draft.proposal,
            status: 'draft' as any,
            id: draft.id,
            threshold: { ...EmptyThresholdResponse },
            total_weight: 0,
          }
          return proposalResponse
        })
      }

      return (draftProposalItems ?? []).concat(onChainProposalList)
    },
})

export const draftProposalSelector = selectorFamily<
  ProposalMapItem | undefined,
  ProposalKey
>({
  key: 'draftProposal',
  get:
    ({ contractAddress, proposalId }) =>
    ({ get }) => {
      const draftProposals = get(proposalMapAtom(contractAddress))
      return draftProposals ? draftProposals[proposalId] : undefined
    },
  set: ({ contractAddress, proposalId }) => ({set, get}, newValue) => {
    const draftProposals = get(proposalMapAtom(contractAddress))
    const updatedDraftProposals = {
      ...draftProposals,
      [proposalId]: newValue
    }
    set(proposalMapAtom(contractAddress), updatedDraftProposals)
  }
})

export const draftProposalMessageSelector = selectorFamily<
  MessageMapEntry | undefined,
  ProposalMessageKey
>({
  key: 'draftProposalMessage',
  get:
    ({ contractAddress, proposalId, messageId }) =>
    ({ get }) => {
      const draftProposal = get(
        draftProposalSelector({ contractAddress, proposalId })
      )
      return draftProposal?.messages
        ? draftProposal.messages[messageId]
        : undefined
    },
})
