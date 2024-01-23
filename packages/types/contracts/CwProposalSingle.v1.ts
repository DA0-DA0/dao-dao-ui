import {
  Addr,
  ContractVersionInfo,
  CosmosMsgFor_Empty,
  Duration,
  Expiration,
  ProposalStatus,
  Uint128,
} from './common'
import { Threshold, Votes } from './DaoProposalSingle.common'

export interface ConfigResponse {
  allow_revoting: boolean
  dao: Addr
  deposit_info?: CheckedDepositInfo | null
  max_voting_period: Duration
  only_members_execute: boolean
  threshold: Threshold
}
export interface CheckedDepositInfo {
  deposit: Uint128
  refund_failed_proposals: boolean
  token: Addr
}
export type GovernanceModulesResponse = Addr[]
export interface InfoResponse {
  info: ContractVersionInfo
}
export type DepositToken =
  | {
      token: {
        address: string
      }
    }
  | {
      voting_module_token: {}
    }
export interface InstantiateMsg {
  allow_revoting: boolean
  deposit_info?: DepositInfo | null
  max_voting_period: Duration
  only_members_execute: boolean
  threshold: Threshold
}
export interface DepositInfo {
  deposit: Uint128
  refund_failed_proposals: boolean
  token: DepositToken
}
export interface ListProposalsResponse {
  proposals: ProposalResponse[]
}
export interface ProposalResponse {
  id: number
  proposal: Proposal
  // Indexer may return these.
  createdAt?: string
  completedAt?: string
  executedAt?: string
  closedAt?: string
}
export interface Proposal {
  allow_revoting: boolean
  deposit_info?: CheckedDepositInfo | null
  description: string
  expiration: Expiration
  msgs: CosmosMsgFor_Empty[]
  proposer: Addr
  start_height: number
  status: ProposalStatus
  threshold: Threshold
  title: string
  total_power: Uint128
  votes: Votes
}
export type ProposalCountResponse = number
export interface ProposalHooksResponse {
  hooks: string[]
}
export interface ReverseProposalsResponse {
  proposals: ProposalResponse[]
}
export interface VoteHooksResponse {
  hooks: string[]
}
