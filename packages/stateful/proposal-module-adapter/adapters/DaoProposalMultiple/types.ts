import { ReactNode } from 'react'

import {
  CategorizedActionAndData,
  CosmosMsgForEmpty,
  DepositInfoSelector,
  IProposalModuleAdapterCommonOptions,
  PartialCategorizedActionKeyAndData,
  ProcessedTQ,
  ProposalVoteOption,
} from '@dao-dao/types'
import {
  CheckedMultipleChoiceOption,
  MultipleChoiceOptionType,
  MultipleChoiceOptions,
  MultipleChoiceProposal,
  MultipleChoiceVote,
} from '@dao-dao/types/contracts/DaoProposalMultiple'

export interface MultipleChoiceOptionFormData {
  title: string
  description: string
  actionData: PartialCategorizedActionKeyAndData[]
}

export interface NewProposalForm {
  title: string
  description: string
  choices: MultipleChoiceOptionFormData[]
}

export interface NewProposalData {
  choices: MultipleChoiceOptions
  description: string
  title: string
}

export interface PercentOrMajorityValue {
  majority: boolean
  // Will be used when `majority` is false.
  value: number
}

// Has vote percentages as well as choice info.
export type ProcessedMultipleChoiceOption = {
  description: string
  index: number
  msgs: CosmosMsgForEmpty[]
  optionType: MultipleChoiceOptionType
  title: string
  turnoutVotePercentage: number
  color?: string
}

export interface VotesInfo {
  quorum: ProcessedTQ
  isTie: boolean
  processedChoices: ProcessedMultipleChoiceOption[]
  // Undefined if a tie, including when no votes have been cast.
  winningChoice: ProcessedMultipleChoiceOption | undefined
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
  anyoneCanPropose: boolean
  depositUnsatisfied: boolean
  simulationBypassExpiration: Date | undefined
}

export interface TimestampInfo {
  display?: {
    label: string
    tooltip?: string
    content: ReactNode
  }
  expirationDate: Date
}

export type ProposalWithMetadata = MultipleChoiceProposal & {
  timestampInfo: TimestampInfo | undefined
  votingOpen: boolean
}

export type MultipleChoiceOptionData = {
  choice: CheckedMultipleChoiceOption
  actionData: CategorizedActionAndData[]
  decodedMessages: {
    [key: string]: any
  }[]
  voteOption: ProposalVoteOption<MultipleChoiceVote>
}
