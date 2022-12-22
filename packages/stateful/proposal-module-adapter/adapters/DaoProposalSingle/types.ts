import { ReactNode } from 'react'

import {
  ActionKeyAndData,
  DepositInfoSelector,
  DurationWithUnits,
  IProposalModuleAdapterCommonOptions,
  ProcessedTQ,
} from '@dao-dao/types'
import {
  CosmosMsgFor_Empty,
  DepositRefundPolicy,
} from '@dao-dao/types/contracts/common'
import { TokenInfoResponse } from '@dao-dao/types/contracts/Cw20Base'
import { Proposal } from '@dao-dao/types/contracts/CwProposalSingle.v1'
import { SingleChoiceProposal } from '@dao-dao/types/contracts/DaoProposalSingle.v2'

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

export interface PublishProposalOptions {
  bypassSimulation?: boolean
}

export type PublishProposal = (
  newProposalData: NewProposalData,
  options?: PublishProposalOptions
) => Promise<{
  proposalNumber: number
  proposalId: string
}>

export interface MakeUsePublishProposalOptions {
  options: IProposalModuleAdapterCommonOptions
  depositInfoSelector: DepositInfoSelector
}

export type UsePublishProposal = () => {
  publishProposal: PublishProposal
  depositUnsatisfied: boolean
}

export interface TimestampInfo {
  display: {
    label: string
    content: ReactNode
  }
  expirationDate: Date
}

export type ProposalWithMetadata = (Proposal | SingleChoiceProposal) & {
  timestampInfo: TimestampInfo | undefined
  votingOpen: boolean
}
