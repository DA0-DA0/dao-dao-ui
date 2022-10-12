import {
  ActionKeyAndData,
  DurationWithUnits,
  ProcessedTQ,
} from '@dao-dao/tstypes'
import {
  CosmosMsgFor_Empty,
  DepositRefundPolicy,
} from '@dao-dao/tstypes/contracts/common'
import { TokenInfoResponse } from '@dao-dao/tstypes/contracts/cw20-base'

export interface NewProposalForm {
  title: string
  description: string
  actionData: ActionKeyAndData[]
}

// Converted data from actions into Cosmos messages.
export interface NewProposalData extends Omit<NewProposalForm, 'actionData'> {
  msgs: CosmosMsgFor_Empty[]
}

export interface ThresholdValue {
  majority: boolean
  // Will be used when `majority` is false.
  value: number
}

export interface DaoCreationConfig {
  threshold: ThresholdValue
  quorumEnabled: boolean
  quorum: ThresholdValue
  votingDuration: DurationWithUnits
  proposalDeposit: {
    enabled: boolean
    amount: number
    type: 'native' | 'cw20' | 'voting_module_token'
    cw20Address: string
    cw20TokenInfo?: TokenInfoResponse
    refundPolicy: DepositRefundPolicy
  }
  allowRevoting: boolean
}

export interface VotesInfo {
  threshold: ProcessedTQ
  quorum?: ProcessedTQ
  // Raw info
  yesVotes: number
  noVotes: number
  abstainVotes: number
  totalVotingPower: number
  turnoutTotal: number
  // Turnout percents
  turnoutPercent: number
  turnoutYesPercent: number
  turnoutNoPercent: number
  turnoutAbstainPercent: number
  // Total percents
  totalYesPercent: number
  totalNoPercent: number
  totalAbstainPercent: number
  // Meta
  thresholdReached: boolean
  quorumReached: boolean
}
