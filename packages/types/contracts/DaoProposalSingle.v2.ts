import {
  Addr,
  Binary,
  ContractVersionInfo,
  CosmosMsgFor_Empty,
  Duration,
  Expiration,
  ModuleInstantiateInfo,
  Timestamp,
  Uint128,
} from './common'
import { Status, Threshold, Vote, Votes } from './DaoProposalSingle.common'

export interface ConfigResponse {
  allow_revoting: boolean
  close_proposal_on_execution_failure: boolean
  dao: Addr
  max_voting_period: Duration
  min_voting_period?: Duration | null
  only_members_execute: boolean
  threshold: Threshold
  [k: string]: unknown
}
export type DaoResponse = string
export type ExecuteMsg =
  | {
      propose: {
        description: string
        msgs: CosmosMsgFor_Empty[]
        proposer?: string | null
        title: string
        [k: string]: unknown
      }
    }
  | {
      vote: {
        proposal_id: number
        vote: Vote
        [k: string]: unknown
      }
    }
  | {
      execute: {
        proposal_id: number
        [k: string]: unknown
      }
    }
  | {
      close: {
        proposal_id: number
        [k: string]: unknown
      }
    }
  | {
      update_config: {
        allow_revoting: boolean
        close_proposal_on_execution_failure: boolean
        dao: string
        max_voting_period: Duration
        min_voting_period?: Duration | null
        only_members_execute: boolean
        threshold: Threshold
        [k: string]: unknown
      }
    }
  | {
      update_pre_propose_info: {
        info: PreProposeInfo
        [k: string]: unknown
      }
    }
  | {
      add_proposal_hook: {
        address: string
        [k: string]: unknown
      }
    }
  | {
      remove_proposal_hook: {
        address: string
        [k: string]: unknown
      }
    }
  | {
      add_vote_hook: {
        address: string
        [k: string]: unknown
      }
    }
  | {
      remove_vote_hook: {
        address: string
        [k: string]: unknown
      }
    }
export type PreProposeInfo =
  | {
      anyone_may_propose: {}
    }
  | {
      module_may_propose: {
        info: ModuleInstantiateInfo
      }
    }
export type GovernanceModulesResponse = Addr[]
export type ExtensionResponse = Binary
export interface InfoResponse {
  info: ContractVersionInfo
  [k: string]: unknown
}
export interface InstantiateMsg {
  allow_revoting: boolean
  close_proposal_on_execution_failure: boolean
  max_voting_period: Duration
  min_voting_period?: Duration | null
  only_members_execute: boolean
  pre_propose_info: PreProposeInfo
  threshold: Threshold
  [k: string]: unknown
}
export interface ListProposalsResponse {
  proposals: ProposalResponse[]
  [k: string]: unknown
}
export interface ProposalResponse {
  id: number
  proposal: SingleChoiceProposal
  [k: string]: unknown
}
export interface SingleChoiceProposal {
  allow_revoting: boolean
  created: Timestamp
  description: string
  expiration: Expiration
  last_updated: Timestamp
  min_voting_period?: Expiration | null
  msgs: CosmosMsgFor_Empty[]
  proposer: Addr
  start_height: number
  status: Status
  threshold: Threshold
  title: string
  total_power: Uint128
  votes: Votes
  [k: string]: unknown
}
export type MigrateMsg =
  | {
      from_v1: {
        close_proposal_on_execution_failure: boolean
        pre_propose_info: PreProposeInfo
        [k: string]: unknown
      }
    }
  | {
      from_compatible: {
        [k: string]: unknown
      }
    }
export type ProposalCountResponse = number
// v2 changed case.
export type ProposalCreationPolicyResponse =
  | {
      Anyone: {}
    }
  | {
      anyone: {}
    }
  | {
      Module: {
        addr: Addr
      }
    }
  | {
      module: {
        addr: Addr
      }
    }
export interface ProposalHooksResponse {
  hooks: string[]
  [k: string]: unknown
}
export type QueryMsg =
  | {
      config: {
        [k: string]: unknown
      }
    }
  | {
      proposal: {
        proposal_id: number
        [k: string]: unknown
      }
    }
  | {
      list_proposals: {
        limit?: number | null
        start_after?: number | null
        [k: string]: unknown
      }
    }
  | {
      reverse_proposals: {
        limit?: number | null
        start_before?: number | null
        [k: string]: unknown
      }
    }
  | {
      proposal_count: {
        [k: string]: unknown
      }
    }
  | {
      get_vote: {
        proposal_id: number
        voter: string
        [k: string]: unknown
      }
    }
  | {
      list_votes: {
        limit?: number | null
        proposal_id: number
        start_after?: string | null
        [k: string]: unknown
      }
    }
  | {
      proposal_creation_policy: {
        [k: string]: unknown
      }
    }
  | {
      proposal_hooks: {
        [k: string]: unknown
      }
    }
  | {
      vote_hooks: {
        [k: string]: unknown
      }
    }
  | {
      dao: {
        [k: string]: unknown
      }
    }
  | {
      info: {
        [k: string]: unknown
      }
    }
export interface ReverseProposalsResponse {
  proposals: ProposalResponse[]
  [k: string]: unknown
}
export interface VoteHooksResponse {
  hooks: string[]
  [k: string]: unknown
}
