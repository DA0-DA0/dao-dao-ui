import { Proposal, ProposalResponse } from '@dao-dao/types/contracts/cw3-dao'
import { MessageMap } from 'models/proposal/messageMap'

export type ProposalKey = {
  contractAddress: string
  proposalId: number
}

export type ProposalMessageKey = {
  contractAddress: string
  proposalId: number
  messageId: string
}

export interface ProposalMapItem {
  proposal: Proposal
  id: number
  activeMessageIndex?: number
  draft: boolean,
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
