import {
  Addr,
  Binary,
  ContractVersionInfo,
  CosmosMsgFor_Empty,
  Duration,
  Expiration,
  ModuleInstantiateInfo,
  ProposalStatus,
  Uint128,
} from './common'
import { Threshold, Vote, Votes } from './DaoProposalSingle.common'

export interface ConfigResponse {
  allow_revoting: boolean
  close_proposal_on_execution_failure: boolean
  dao: Addr
  max_voting_period: Duration
  min_voting_period?: Duration | null
  only_members_execute: boolean
  threshold: Threshold
  veto?: VetoConfig | null
}
export type DaoResponse = string
export type ExecuteMsg =
  | {
      propose: {
        description: string
        msgs: CosmosMsgFor_Empty[]
        proposer?: string | null
        title: string
      }
    }
  | {
      vote: {
        proposal_id: number
        vote: Vote
      }
    }
  | {
      execute: {
        proposal_id: number
      }
    }
  | {
      veto: {
        proposal_id: number
      }
    }
  | {
      close: {
        proposal_id: number
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
        veto?: VetoConfig | null
      }
    }
  | {
      update_pre_propose_info: {
        info: PreProposeInfo
      }
    }
  | {
      add_proposal_hook: {
        address: string
      }
    }
  | {
      remove_proposal_hook: {
        address: string
      }
    }
  | {
      add_vote_hook: {
        address: string
      }
    }
  | {
      remove_vote_hook: {
        address: string
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
}
export interface InstantiateMsg {
  allow_revoting: boolean
  close_proposal_on_execution_failure: boolean
  max_voting_period: Duration
  min_voting_period?: Duration | null
  only_members_execute: boolean
  pre_propose_info: PreProposeInfo
  threshold: Threshold
  veto?: VetoConfig | null
}
export interface VetoConfig {
  early_execute: boolean
  timelock_duration: Duration
  veto_before_passed: boolean
  vetoer: string
}
export interface ListProposalsResponse {
  proposals: ProposalResponse[]
}
export interface ProposalResponse {
  id: number
  proposal: SingleChoiceProposal
  // Indexer may return these.
  hideFromSearch?: boolean
  dao?: string
  daoProposalId?: string
  createdAt?: string
  completedAt?: string
  executedAt?: string
  closedAt?: string
}
export interface SingleChoiceProposal {
  allow_revoting: boolean
  description: string
  expiration: Expiration
  min_voting_period?: Expiration | null
  msgs: CosmosMsgFor_Empty[]
  proposer: Addr
  start_height: number
  status: ProposalStatus
  threshold: Threshold
  title: string
  total_power: Uint128
  veto?: VetoConfig | null
  votes: Votes
}
export type MigrateMsg =
  | {
      from_v1: {
        close_proposal_on_execution_failure: boolean
        pre_propose_info: PreProposeInfo
        veto?: VetoConfig | null
      }
    }
  | {
      from_compatible: {}
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
}
export type QueryMsg =
  | {
      config: {}
    }
  | {
      proposal: {
        proposal_id: number
      }
    }
  | {
      list_proposals: {
        limit?: number | null
        start_after?: number | null
      }
    }
  | {
      reverse_proposals: {
        limit?: number | null
        start_before?: number | null
      }
    }
  | {
      proposal_count: {}
    }
  | {
      get_vote: {
        proposal_id: number
        voter: string
      }
    }
  | {
      list_votes: {
        limit?: number | null
        proposal_id: number
        start_after?: string | null
      }
    }
  | {
      proposal_creation_policy: {}
    }
  | {
      proposal_hooks: {}
    }
  | {
      vote_hooks: {}
    }
  | {
      dao: {}
    }
  | {
      info: {}
    }
export interface ReverseProposalsResponse {
  proposals: ProposalResponse[]
}
export interface VoteHooksResponse {
  hooks: string[]
}
