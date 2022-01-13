import { Proposal, ProposalResponse } from '@dao-dao/types/contracts/cw3-dao'

export type ProposalKey = {
  contractAddress: string
  proposalId: number
}

export interface ProposalMapItem {
  proposal: Proposal | ProposalResponse
  id: number
  activeMessageIndex?: number
  draft: boolean
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

