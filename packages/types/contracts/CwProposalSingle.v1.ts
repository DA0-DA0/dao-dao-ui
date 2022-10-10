import {
  Addr,
  ContractVersionInfo,
  CosmosMsgFor_Empty,
  Duration,
  Expiration,
  Timestamp,
  Uint128,
} from './common'
import { Status, Threshold, VoteInfo, Votes } from './CwProposalSingle.common'

export interface ConfigResponse {
  allow_revoting: boolean
  dao: Addr
  deposit_info?: CheckedDepositInfo | null
  max_voting_period: Duration
  only_members_execute: boolean
  threshold: Threshold
  [k: string]: unknown
}
export interface CheckedDepositInfo {
  deposit: Uint128
  refund_failed_proposals: boolean
  token: Addr
  [k: string]: unknown
}
export type GovernanceModulesResponse = Addr[]
export interface InfoResponse {
  info: ContractVersionInfo
  [k: string]: unknown
}
export type DepositToken =
  | {
      token: {
        address: string
        [k: string]: unknown
      }
    }
  | {
      voting_module_token: {
        [k: string]: unknown
      }
    }
export interface InstantiateMsg {
  allow_revoting: boolean
  deposit_info?: DepositInfo | null
  max_voting_period: Duration
  only_members_execute: boolean
  threshold: Threshold
  [k: string]: unknown
}
export interface DepositInfo {
  deposit: Uint128
  refund_failed_proposals: boolean
  token: DepositToken
  [k: string]: unknown
}
export interface ListProposalsResponse {
  proposals: ProposalResponse[]
  [k: string]: unknown
}
export interface ProposalResponse {
  id: number
  proposal: Proposal
  [k: string]: unknown
}
export interface Proposal {
  allow_revoting: boolean
  deposit_info?: CheckedDepositInfo | null
  description: string
  expiration: Expiration
  msgs: CosmosMsgFor_Empty[]
  proposer: Addr
  start_height: number
  status: Status
  threshold: Threshold
  title: string
  total_power: Uint128
  votes: Votes
  // V2
  created?: Timestamp
  last_updated?: Timestamp
  [k: string]: unknown
}
export interface ListVotesResponse {
  votes: VoteInfo[]
  [k: string]: unknown
}
export type ProposalCountResponse = number
export interface ProposalHooksResponse {
  hooks: string[]
  [k: string]: unknown
}
export interface ReverseProposalsResponse {
  proposals: ProposalResponse[]
  [k: string]: unknown
}
export interface VoteHooksResponse {
  hooks: string[]
  [k: string]: unknown
}
export interface VoteResponse {
  vote?: VoteInfo | null
  [k: string]: unknown
}
