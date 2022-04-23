import { Proposal, ProposalResponse } from '@dao-dao/types/contracts/cw3-dao'

import { MessageMap } from 'models/proposal/messageMap'

export type ProposalKey = {
  contractAddress: string
  proposalId: string
}

export type ProposalMessageKey = {
  contractAddress: string
  proposalId: string
  messageId: string
}

export interface ProposalMapItem {
  proposal: Proposal
  id: string
  activeMessageIndex?: number
  draft: boolean
  messages?: MessageMap
}

// Maps from a proposal id (a stringified number)
// to a ProposalMapItem
export type ProposalMap = {
  [key: string]: ProposalMapItem
}

// Maps from a contract address to a map of its draft
// proposals
export type ContractProposalMap = {
  [key: string]: ProposalMap
}

export interface ExtendedProposalResponse extends ProposalResponse {
  draftId?: string
}

export enum ProposalStatus {
  Open = 'Open',
  Passed = 'Passed',
  Approved = 'Approved',
  Rejected = 'Rejected',
}

export enum ProposalVote {
  Undecided,
  Yes,
  No,
  Abstain,
}
