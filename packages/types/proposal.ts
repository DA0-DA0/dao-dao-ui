import { ReactNode } from 'react'

import { ProposalCardProps } from './components/ProposalCard'
import { ProposalStatus } from './contracts'
import { ProposalStatusKey as ApprovalProposalStatus } from './contracts/DaoPreProposeApprovalSingle'
import { ProposalResponse } from './contracts/DaoProposalSingle.v2'
import { SingleChoiceProposal as NeutronCwdSubdaoTimelockSingleProposal } from './contracts/NeutronCwdSubdaoTimelockSingle'
import { DurationWithUnits } from './units'

export type ProposalCreatedCardProps = Omit<
  ProposalCardProps,
  'className' | 'onMouseOver' | 'onMouseLeave' | 'LinkWrapper'
>

export enum ProcessedTQType {
  Majority,
  Absolute,
  Percent,
}

export type ProcessedTQ = { display: string } & (
  | { type: ProcessedTQType.Majority }
  | { type: ProcessedTQType.Absolute | ProcessedTQType.Percent; value: number }
)

export type ProcessedThresholdQuorum = {
  threshold: ProcessedTQ
  quorum?: ProcessedTQ
}

export type ProcessedQuorum = {
  quorum: ProcessedTQ
}

export enum ApprovalProposalContextType {
  Approval = 'approval',
  Approver = 'approver',
}

export type ApprovalProposalContext =
  | {
      type: ApprovalProposalContextType.Approval
      status: ApprovalProposalStatus
    }
  | {
      type: ApprovalProposalContextType.Approver
      status: ProposalStatus
    }

export type ProposalVetoConfig = {
  enabled: boolean
  addresses: {
    address: string
  }[]
  // If there are multiple addresses, this must be set to the cw1-whitelist
  // contract from the list of addresses. If there is only one address, then
  // this should be undefined.
  cw1WhitelistAddress: string | undefined
  timelockDuration: DurationWithUnits
  earlyExecute: boolean
  vetoBeforePassed: boolean
}

/**
 * Information about the timelock overrule that was created for a timelocked
 * proposal on Neutron.
 */
export type NeutronTimelockOverrule = {
  dao: string
  proposalModulePrefix: string
  overruleProposal: ProposalResponse
  timelockProposal: NeutronCwdSubdaoTimelockSingleProposal
}

export type ProposalTimestampInfo = {
  display?: {
    label: string
    tooltip?: string
    content: ReactNode
  }
  expirationDate?: Date
}

export type GaiaMetaprotocolsExtensionData = {
  protocolId: string
  protocolVersion: string
  data: string
}

/**
 * Metadata relevant to how to execute a proposal.
 */
export type ProposalExecutionMetadata = {
  /**
   * Only used during creation.
   */
  enabled?: boolean
  /**
   * Set automatically when encoding.
   */
  version?: number
  memo?: string
  gaiaMetaprotocolsExtensionData?: GaiaMetaprotocolsExtensionData[]
}

/**
 * Metadata used in proposal forms.
 */
export type ProposalExecutionMetadataEditorData = {
  metadata?: ProposalExecutionMetadata
}
