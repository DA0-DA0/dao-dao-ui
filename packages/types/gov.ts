import { ReactNode } from 'react'

import { CommunityPoolSpendProposal } from '@dao-dao/protobuf/codegen/cosmos/distribution/v1beta1/distribution'
import {
  Params as GovParamsV1,
  Proposal as ProposalV1,
  WeightedVoteOption,
} from '@dao-dao/protobuf/codegen/cosmos/gov/v1/gov'
import {
  Proposal as ProposalV1Beta1,
  TextProposal,
} from '@dao-dao/protobuf/codegen/cosmos/gov/v1beta1/gov'
import { ParameterChangeProposal } from '@dao-dao/protobuf/codegen/cosmos/params/v1beta1/params'
import {
  CancelSoftwareUpgradeProposal,
  SoftwareUpgradeProposal,
} from '@dao-dao/protobuf/codegen/cosmos/upgrade/v1beta1/upgrade'

import { NestedActionsEditorFormData } from './actions'
import { Coin, CosmosMsgFor_Empty } from './contracts'
import { LoadingData } from './stateless'
import { ProcessedTQ } from './utils'

export { ProposalV1Beta1, ProposalV1 }

export enum GovProposalVersion {
  // Legacy with specific proposal types.
  V1_BETA_1 = 'v1beta1',
  // Arbitrary message execution.
  V1 = 'v1',
}

export type GovProposalV1Beta1 = {
  version: GovProposalVersion.V1_BETA_1
  id: bigint
  proposal: ProposalV1Beta1
}

export type GovProposalV1Beta1DecodedContent = ProposalV1Beta1['content']
export type GovProposalV1Beta1WithDecodedContent = GovProposalV1Beta1 & {
  title: string
  description: string
  decodedContent: GovProposalV1Beta1DecodedContent
}

export type GovProposalV1 = {
  version: GovProposalVersion.V1
  id: bigint
  proposal: ProposalV1
}

export type GovProposalV1DecodedMessages = CosmosMsgFor_Empty[]
export type GovProposalV1WithDecodedMessages = GovProposalV1 & {
  title: string
  description: string
  decodedMessages: GovProposalV1DecodedMessages
  legacyContent: GovProposalV1Beta1DecodedContent[]
}

export type GovProposalDecodedContent =
  | {
      version: GovProposalVersion.V1_BETA_1
      title: string
      description: string
      decodedContent: GovProposalV1Beta1DecodedContent
    }
  | {
      version: GovProposalVersion.V1
      title: string
      description: string
      decodedMessages: GovProposalV1DecodedMessages
      legacyContent: GovProposalV1Beta1DecodedContent[]
    }

export type GovProposal = GovProposalV1Beta1 | GovProposalV1
export type GovProposalWithDecodedContent =
  | GovProposalV1Beta1WithDecodedContent
  | GovProposalV1WithDecodedMessages

export type GovProposalWithMetadata = GovProposal & {
  timestampInfo: ProposalTimestampInfo
  votesInfo: GovProposalVotesInfo
  walletVoteInfo: LoadingData<GovProposalWalletVoteInfo>
  // Deposit needed to ender voting period.
  minDeposit: Coin[]
}

export type ProposalTimestampInfo = {
  display?: {
    label: string
    tooltip?: string
    content: ReactNode
  }
  expirationDate: Date
}

export type GovProposalVotesInfo = {
  threshold: ProcessedTQ
  quorum: ProcessedTQ
  vetoThreshold: ProcessedTQ
  // Raw info
  yesVotes: number
  noVotes: number
  abstainVotes: number
  noWithVetoVotes: number
  totalVotingPower: number
  turnoutTotal: number
  // Turnout percents
  turnoutPercent: number
  turnoutYesPercent: number
  turnoutNoPercent: number
  turnoutAbstainPercent: number
  turnoutNoWithVetoPercent: number
  // Total percents
  totalYesPercent: number
  totalNoPercent: number
  totalAbstainPercent: number
  totalNoWithVetoPercent: number
  // Meta
  thresholdReached: boolean
  quorumReached: boolean
  vetoReached: boolean
}

export type GovProposalWalletVoteInfo = {
  // Present if voted.
  vote: WeightedVoteOption[] | undefined
}

export type GovProposalActionDisplayProps = {
  content: GovProposalDecodedContent
  // Passed on to action renderer.
  hideCopyLink?: boolean
}

export type AllGovParams = Pick<
  GovParamsV1,
  'minDeposit' | 'maxDepositPeriod' | 'votingPeriod'
> & {
  quorum: number
  threshold: number
  vetoThreshold: number
  minInitialDepositRatio: number
}

export const GOVERNANCE_PROPOSAL_TYPES = [
  TextProposal,
  CommunityPoolSpendProposal,
  ParameterChangeProposal,
  SoftwareUpgradeProposal,
  CancelSoftwareUpgradeProposal,
]

export const GOVERNANCE_PROPOSAL_TYPE_CUSTOM = 'CUSTOM'

export type GovernanceProposalActionData = {
  // If true, will hide title, description, and deposit.
  _onlyShowActions?: boolean
  version: GovProposalVersion
  title: string
  description: string
  deposit: {
    amount: number
    denom: string
  }[]
  legacy: {
    typeUrl: string
    // CommunityPoolSpendProposal
    spends: {
      amount: number
      denom: string
    }[]
    spendRecipient: string
    // ParameterChangeProposal
    parameterChanges: string
    // SoftwareUpgradeProposal
    upgradePlan: string
    // CUSTOM
    custom: string
  }
  // One of the legacy proposal types encoded into its protobuf. Outside the
  // legacy object so we can listen for changes to it to update this field
  // without causing infinite loops.
  // GovProposalV1Beta1DecodedContent
  legacyContent: any
  // V1 proposals require a metadata.json file to be uploaded to IPFS.
  metadataCid: string
} & NestedActionsEditorFormData
