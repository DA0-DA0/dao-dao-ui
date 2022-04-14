import {
  constSelector,
  TransactionInterface_UNSTABLE,
  useRecoilValue,
} from 'recoil'

import { Proposal, ProposalResponse } from '@dao-dao/types/contracts/cw3-dao'

import {
  contractProposalMapAtom,
  nextDraftProposalIdAtom,
} from 'atoms/proposals'
import {
  EmptyProposalResponse,
  EmptyThresholdResponse,
} from 'models/proposal/proposal'
import { listMembers, MultisigMemberInfo } from 'selectors/multisigs'
import {
  draftProposalsSelector,
  proposalSelector,
  proposalTallySelector,
} from 'selectors/proposals'
import {
  ContractProposalMap,
  ExtendedProposalResponse,
  ProposalMap,
  ProposalMapItem,
} from 'types/proposals'

import {
  Config,
  contractConfigSelector,
  ContractConfigWrapper,
} from './contractConfigWrapper'
import { convertMicroDenomToDenomWithDecimals } from './conversion'

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

export const useThresholdQuorum = (
  contractAddress: string,
  proposalId: number,
  multisig: boolean
): {
  threshold?: {
    absolute?: number
    percent: number
    display: string
  }
  quorum?: {
    percent: number
    display: string
  }
} => {
  const config = useRecoilValue(
    contractConfigSelector({ contractAddress, multisig })
  )
  const proposalTally = useRecoilValue(
    proposalTallySelector({ contractAddress, proposalId })
  )

  const thresholdConfig = proposalTally?.threshold

  const configWrapper = new ContractConfigWrapper(config)
  const tokenDecimals = configWrapper.gov_token_decimals

  if (!config || !thresholdConfig || !proposalTally) {
    return {}
  }

  if ('absolute_count' in thresholdConfig) {
    const count = Number(thresholdConfig.absolute_count.weight)
    const threshold = multisig
      ? count
      : convertMicroDenomToDenomWithDecimals(count, tokenDecimals)

    return {
      threshold: {
        absolute: threshold,
        percent: (threshold / Number(proposalTally.total_weight)) * 100,
        display: `${threshold} vote${count != 1 ? 's' : ''}`,
      },
    }
  } else if ('absolute_percentage' in thresholdConfig) {
    const threshold =
      Number(thresholdConfig.absolute_percentage.percentage) * 100

    return {
      threshold: { percent: threshold, display: `${threshold}%` },
    }
  } else if ('threshold_quorum' in thresholdConfig) {
    const quorum = Number(thresholdConfig.threshold_quorum.quorum) * 100
    const threshold = Number(thresholdConfig.threshold_quorum.threshold) * 100

    return {
      threshold: { percent: threshold, display: `${threshold}%` },
      quorum: { percent: quorum, display: `${quorum}%` },
    }
  }

  return {}
}
