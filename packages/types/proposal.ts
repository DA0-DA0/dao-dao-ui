import { ReactNode } from 'react'

import { PolytoneConnection } from './chain'
import { ProposalCardProps } from './components/ProposalCard'
import { CosmosMsgFor_Empty, ProposalStatus } from './contracts'
import { ProposalStatusKey as PreProposeApprovalProposalStatus } from './contracts/DaoPreProposeApprovalSingle'
import { ProposalResponse } from './contracts/DaoProposalSingle.v2'
import { DurationWithUnits } from './units'

export type ProposalCreatedCardProps = Omit<
  ProposalCardProps,
  'className' | 'onMouseOver' | 'onMouseLeave' | 'LinkWrapper'
>

export type ProposalPolytoneState = {
  /**
   * Whether or not there are any polytone messages.
   */
  hasPolytoneMessages: boolean
  /**
   * The initiator msgs that relayed successfully.
   */
  relayedMsgs: string[]
  /**
   * The initiator msgs that are unrelayed.
   */
  unrelayedMsgs: string[]
  /**
   * The initiator msgs that timed out.
   */
  timedOutMsgs: string[]
  /**
   * Whether or not there are polytone messages that need to be self-relayed.
   * Most chains have relayers set up, so no need to self-relay on those chains.
   * After a few minutes if there are still messages that need to be relayed,
   * they can be self-relayed. This will be true when unrelayed messages exist
   * on a chain with no relayers or when there are still unrelayed messages
   * after a few minutes.
   */
  needsSelfRelay: boolean
  /**
   * Opens the execute and self-relay modal.
   */
  openPolytoneRelay: () => void
}

export type DecodedPolytoneMsgMatch = {
  match: true
  chainId: string
  polytoneConnection: PolytoneConnection
  // The first message, or empty object if none.
  msg: Record<string, any>
  // The first message, or undefined if none.
  cosmosMsg: CosmosMsgFor_Empty | undefined
  // All messages.
  msgs: Record<string, any>[]
  cosmosMsgs: CosmosMsgFor_Empty[]
  initiatorMsg: string
}

export type DecodedPolytoneMsgNoMatch = {
  match: false
}

export type DecodedPolytoneMsg =
  | DecodedPolytoneMsgNoMatch
  | DecodedPolytoneMsgMatch

export type DecodedIcaMsgMatch = {
  match: true
  chainId: string
  // The first message, or undefined if none.
  msgWithSender:
    | {
        sender: string
        msg: Record<string, any>
      }
    | undefined
  // The first message, or undefined if none.
  cosmosMsgWithSender:
    | {
        sender: string
        msg: CosmosMsgFor_Empty
      }
    | undefined
  // All messages.
  msgsWithSenders: {
    sender: string
    msg: Record<string, any>
  }[]
  cosmosMsgsWithSenders: {
    sender: string
    msg: CosmosMsgFor_Empty
  }[]
}

export type DecodedIcaMsgNoMatch = {
  match: false
}

export type DecodedIcaMsg = DecodedIcaMsgNoMatch | DecodedIcaMsgMatch

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
      status: PreProposeApprovalProposalStatus
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
  proposal: ProposalResponse
}

export type ProposalTimestampInfo = {
  display?: {
    label: string
    tooltip?: string
    content: ReactNode
  }
  expirationDate: Date
}
