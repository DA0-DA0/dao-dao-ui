import { ReactNode } from 'react'

import {
  DepositInfoSelector,
  DurationWithUnits,
  IProposalModuleAdapterCommonOptions,
  ProcessedTQ,
} from '@dao-dao/types'
import { DepositRefundPolicy } from '@dao-dao/types/contracts/common'
import { TokenInfoResponse } from '@dao-dao/types/contracts/Cw20Base'
import {
  CosmosMsgForEmpty,
  MultipleChoiceOptionType,
  MultipleChoiceOptions,
  MultipleChoiceProposal,
  Uint128,
} from '@dao-dao/types/contracts/DaoProposalMultiple'

import { MultipleChoiceOptionData } from './components/ui/MultipleChoiceOption'

export interface NewProposalForm {
  title: string
  description: string
  choices: MultipleChoiceOptionData[]
}

export interface NewProposalData {
  choices: MultipleChoiceOptions
  description: string
  title: string
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

// Has vote percentages as well as choice info.
export type ProcessedMultipleChoiceOption = {
  description: string
  index: number
  msgs: CosmosMsgForEmpty[]
  option_type: MultipleChoiceOptionType
  title: string
  vote_count: Uint128
  turnoutVotePercentage: number
  color: string
}

export interface VotesInfo {
  quorum?: ProcessedTQ
  isTie: boolean
  processedChoices: ProcessedMultipleChoiceOption[]
  totalVotingPower: number
  turnoutTotal: number
  turnoutPercent: number
  quorumReached: boolean
}

export interface PublishProposalOptions {
  // If set, a failed simulation will make future attempts to publish a
  // proposal bypass the simulation check for the specified duration. This
  // allows the user to confirm they want to publish a proposal even if the
  // simulation fails, in case the actions will be valid at the some point in
  // the future but are not yet.
  failedSimulationBypassSeconds?: number
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
  simulationBypassExpiration: Date | undefined
}

export interface TimestampInfo {
  display?: {
    label: string
    content: ReactNode
  }
  expirationDate: Date
}

export type ProposalWithMetadata = MultipleChoiceProposal & {
  timestampInfo: TimestampInfo | undefined
  votingOpen: boolean
}
