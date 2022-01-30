import { Proposal, ProposalResponse } from '@dao-dao/types/contracts/cw3-dao'
import {
  contractProposalMapAtom,
  nextDraftProposalIdAtom,
} from 'atoms/proposals'
import {
  EmptyProposalResponse,
  EmptyThresholdResponse,
} from 'models/proposal/proposal'
import { TransactionInterface_UNSTABLE } from 'recoil'
import { draftProposalsSelector } from 'selectors/proposals'
import {
  ContractProposalMap,
  ExtendedProposalResponse,
  ProposalMap,
  ProposalMapItem,
} from 'types/proposals'

// Prefix used in IDs for draft proposals
const DRAFT_PROPOSAL_PREFFIX = 'draft:'

export function isProposal(
  proposal: Proposal | ProposalResponse | ProposalMapItem | undefined
): proposal is Proposal {
  if (!proposal) {
    return false
  }
  if ((proposal as ProposalMapItem)?.draft === false) {
    return false
  }
  return (proposal as Proposal).proposer !== undefined
}

export function draftProposalKey(proposalId: number): string {
  return `${DRAFT_PROPOSAL_PREFFIX}${proposalId}`
}

// Convenience function to create a draft proposal entry
export function draftProposalItem(
  proposal: Proposal,
  id: string
): ProposalMapItem {
  return {
    proposal,
    id,
    draft: true,
  }
}

export function isDraftProposalKey(proposalKey: string): boolean {
  return proposalKey.startsWith(DRAFT_PROPOSAL_PREFFIX)
}

export function draftProposalKeyNumber(proposalKey: string): number {
  if (isDraftProposalKey(proposalKey)) {
    const str = proposalKey.substring(
      proposalKey.indexOf(DRAFT_PROPOSAL_PREFFIX)
    )
    try {
      const num = parseInt(str)
      return num
    } catch (e) {
      console.error(e)
    }
  }
  return -1
}

export const createDraftProposalTransaction =
  (contractAddress: string, draftProposals: ProposalMap) =>
  ({ get, set }: TransactionInterface_UNSTABLE) => {
    const contractProposalMap = get(contractProposalMapAtom)
    const setContractProposalMap = (
      contractProposalMap: ContractProposalMap
    ) => {
      set(contractProposalMapAtom, contractProposalMap)
    }
    const nextDraftProposalId = get(nextDraftProposalIdAtom)
    const incrementDraftProposalId = () =>
      set(nextDraftProposalIdAtom, nextDraftProposalId + 1)

    return ({ draftProposal }: { draftProposal: Proposal }) => {
      const proposalKey = draftProposalKey(nextDraftProposalId)
      setContractProposalMap({
        ...contractProposalMap,
        [contractAddress]: {
          ...draftProposals,
          [proposalKey]: draftProposalItem(draftProposal, proposalKey),
        },
      })
      incrementDraftProposalId()
    }
  }

export const deleteDraftProposal = (
  draftProposals: ProposalMap,
  proposalId: string
) => {
  const updatedProposals = { ...draftProposals }
  delete updatedProposals[proposalId + '']
  return updatedProposals
}

export const deleteDraftProposalTransaction =
  ({
    contractAddress,
    proposalId,
  }: {
    contractAddress: string
    proposalId: string
  }) =>
  ({ get, set }: TransactionInterface_UNSTABLE) => {
    const draftProposals = get(draftProposalsSelector(contractAddress))

    return () => {
      const updatedProposals = { ...draftProposals }
      delete updatedProposals[proposalId + '']
      set(draftProposalsSelector(contractAddress), updatedProposals)
    }
  }

export const draftProposalToExtendedResponse = (draft: ProposalMapItem) => {
  const proposalResponse: ExtendedProposalResponse = {
    ...EmptyProposalResponse,
    ...draft.proposal,
    status: 'draft' as any,
    draftId: draft.id,
    threshold: { ...EmptyThresholdResponse },
    total_weight: 0,
  }
  return proposalResponse
}

export const draftProposalsToExtendedResponses = (
  draftProposals: ProposalMap
) => {
  return draftProposals
    ? Object.values(draftProposals).map((draft) =>
        draftProposalToExtendedResponse(draft)
      )
    : []
}
