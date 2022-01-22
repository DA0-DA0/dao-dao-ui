import {
  ProposalResponse,
  ProposalTallyResponse,
  VoteInfo,
} from '@dao-dao/types/contracts/cw3-dao'
import {
  contractProposalMapAtom,
  proposalsRequestIdAtom,
  proposalUpdateCountAtom,
} from 'atoms/proposals'
import { MessageMap, MessageMapEntry } from 'models/proposal/messageMap'
import {
  EmptyProposalResponse,
  EmptyProposalTallyResponse,
  EmptyThresholdResponse,
} from 'models/proposal/proposal'
import { selectorFamily } from 'recoil'
import {
  ContractProposalMap,
  ExtendedProposalResponse,
  ProposalKey,
  ProposalMap,
  ProposalMapItem,
  ProposalMessageKey,
} from 'types/proposals'
import { cosmWasmClient } from './cosm'

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

export const proposalSelector = selectorFamily<
  ProposalResponse | undefined,
  { contractAddress: string; proposalId: string | number }
>({
  key: 'proposalSelector',
  get:
    ({
      contractAddress,
      proposalId,
    }: {
      contractAddress: string
      proposalId: string | number
    }) =>
    async ({ get }) => {
      if (typeof proposalId === 'string') {
        const draftProposal = get(
          draftProposalSelector({ contractAddress, proposalId })
        )
        if (draftProposal?.proposal) {
          return draftProposal?.proposal
        }
      }
      if (typeof proposalId === 'number') {
        get(proposalUpdateCountAtom({ contractAddress, proposalId }))
      }

      const client = get(cosmWasmClient)
      try {
        const proposal = await client.queryContractSmart(contractAddress, {
          proposal: { proposal_id: proposalId },
        })
        return proposal
      } catch (e) {
        console.error(e)
        return undefined
      }
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
      try {
        const client = get(cosmWasmClient)
        const votes = await client.queryContractSmart(contractAddress, {
          list_votes: { proposal_id: proposalId },
        })
        return votes.votes
      } catch (e) {
        console.error(e)
        return []
      }
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
      try {
        const client = get(cosmWasmClient)
        const tally = await client.queryContractSmart(contractAddress, {
          tally: { proposal_id: proposalId },
        })
        return tally
      } catch (e) {
        console.error(e)
        return {
          ...EmptyProposalTallyResponse,
        }
      }
    },
})

export const draftProposalsSelector = selectorFamily<ProposalMap, string>({
  key: 'draftProposals',
  get:
    (contractAddress) =>
    ({ get }) => {
      return get(proposalMapSelector(contractAddress))
    },
  set:
    (contractAddress) =>
    ({ set }, newValue) => {
      set(proposalMapSelector(contractAddress), newValue)
    },
})

export const proposalsSelector = selectorFamily<
  ExtendedProposalResponse[],
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
      let draftProposalItems: ExtendedProposalResponse[] = []
      // Add in draft proposals:
      const draftProposals = get(draftProposalsSelector(contractAddress))
      if (draftProposals) {
        draftProposalItems = Object.values(draftProposals).map((draft) => {
          const proposalResponse: ExtendedProposalResponse = {
            ...EmptyProposalResponse,
            ...draft.proposal,
            status: 'draft' as any,
            draftId: draft.id,
            threshold: { ...EmptyThresholdResponse },
            total_weight: 0,
          }
          return proposalResponse
        })
      }

      return (draftProposalItems ?? []).concat(onChainProposalList)
    },
})

export const proposalMapSelector = selectorFamily<ProposalMap, string>({
  key: 'proposalMap',
  get:
    (contractAddress) =>
    ({ get }) => {
      const contractProposalMap = get(contractProposalMapAtom)
      return contractProposalMap[contractAddress]
    },
  set:
    (contractAddress) =>
    ({ get, set }, newValue) => {
      const contractProposalMap = get(contractProposalMapAtom)
      const updatedMap: ContractProposalMap = {
        ...contractProposalMap,
        [contractAddress]: newValue,
      } as any // TODO(gavin.doughtie): Wrong type?
      set(contractProposalMapAtom, updatedMap)
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
      const draftProposals = get(proposalMapSelector(contractAddress))
      return draftProposals ? draftProposals[proposalId] : undefined
    },
  set:
    ({ contractAddress, proposalId }) =>
    ({ set, get }, newValue) => {
      if (newValue) {
        const draftProposals = get(proposalMapSelector(contractAddress))
        const updatedDraftProposals: ProposalMap = {
          ...draftProposals,
          [proposalId]: newValue as any,
        }
        set(proposalMapSelector(contractAddress), updatedDraftProposals)
      }
    },
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
  set:
    ({ contractAddress, proposalId, messageId }) =>
    ({ set, get }, newValue) => {
      if (!newValue) {
        return
      }
      const draftProposal = get(
        draftProposalSelector({ contractAddress, proposalId })
      )
      if (draftProposal) {
        const messages: MessageMap = {
          ...draftProposal?.messages,
          [messageId]: newValue,
        } as any
        const updatedProposal: ProposalMapItem = {
          ...draftProposal,
          messages,
        }
        set(
          draftProposalSelector({ contractAddress, proposalId }),
          updatedProposal
        )
      }
    },
})
