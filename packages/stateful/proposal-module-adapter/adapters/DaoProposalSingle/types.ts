import {
  CategorizedActionAndData,
  DepositInfoSelector,
  IProposalModuleAdapterCommonOptions,
  PartialCategorizedActionKeyAndData,
  PercentOrMajorityValue,
  ProcessedTQ,
  ProposalTimestampInfo,
} from '@dao-dao/types'
import { CosmosMsgFor_Empty } from '@dao-dao/types/contracts/common'
import { Proposal } from '@dao-dao/types/contracts/CwProposalSingle.v1'
import { SingleChoiceProposal } from '@dao-dao/types/contracts/DaoProposalSingle.v2'

export interface NewProposalForm {
  title: string
  description: string
  actionData: PartialCategorizedActionKeyAndData[]
}

// Converted data from actions into Cosmos messages.
export interface NewProposalData extends Omit<NewProposalForm, 'actionData'> {
  msgs: CosmosMsgFor_Empty[]
}

export type DaoCreationExtraVotingConfig = {
  threshold: PercentOrMajorityValue
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

export type ProposalWithMetadata = (Proposal | SingleChoiceProposal) & {
  timestampInfo: ProposalTimestampInfo | undefined
  votingOpen: boolean
  executedAt?: Date
}

export type MessagesWithActionData = {
  decodedMessages: any[]
  actionData: CategorizedActionAndData[]
}
