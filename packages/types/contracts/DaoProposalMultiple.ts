import {
  Addr,
  CosmosMsgForEmpty,
  Decimal,
  Duration,
  Expiration,
  ModuleInstantiateInfo,
  ProposalStatus,
  Uint128,
} from './common'

export type PreProposeInfo =
  | {
      anyone_may_propose: {}
    }
  | {
      module_may_propose: {
        info: ModuleInstantiateInfo
      }
    }
export type Admin =
  | {
      address: {
        addr: string
      }
    }
  | {
      core_module: {}
    }
export type VotingStrategy = {
  single_choice: {
    quorum: PercentageThreshold
  }
}
export type PercentageThreshold =
  | {
      majority: {}
    }
  | {
      percent: Decimal
    }
export interface InstantiateMsg {
  allow_revoting: boolean
  close_proposal_on_execution_failure: boolean
  max_voting_period: Duration
  min_voting_period?: Duration | null
  only_members_execute: boolean
  pre_propose_info: PreProposeInfo
  voting_strategy: VotingStrategy
}
export type ExecuteMsg =
  | {
      propose: {
        choices: MultipleChoiceOptions
        description: string
        proposer?: string | null
        title: string
      }
    }
  | {
      vote: {
        proposal_id: number
        vote: MultipleChoiceVote
      }
    }
  | {
      execute: {
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
        voting_strategy: VotingStrategy
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
export interface MultipleChoiceOptions {
  options: MultipleChoiceOption[]
}
export interface MultipleChoiceOption {
  description: string
  msgs: CosmosMsgForEmpty[]
  title: string
}
export interface MultipleChoiceVote {
  option_id: number
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
export type MigrateMsg =
  | {
      from_v1: {
        close_proposal_on_execution_failure: boolean
        pre_propose_info: PreProposeInfo
      }
    }
  | {
      from_compatible: {}
    }
export interface Config {
  allow_revoting: boolean
  close_proposal_on_execution_failure: boolean
  dao: Addr
  max_voting_period: Duration
  min_voting_period?: Duration | null
  only_members_execute: boolean
  voting_strategy: VotingStrategy
}
export interface VoteResponse {
  vote?: VoteInfo | null
}
export interface VoteInfo {
  power: Uint128
  vote: MultipleChoiceVote
  voter: Addr
  rationale?: string | null
  votedAt?: string
}
export enum MultipleChoiceOptionType {
  Standard = 'standard',
  None = 'none',
}
export interface ProposalListResponse {
  proposals: ProposalResponse[]
}
export interface ProposalResponse {
  id: number
  proposal: MultipleChoiceProposal
  // Indexer may return these.
  createdAt?: string
  completedAt?: string
  executedAt?: string
  closedAt?: string
}
export interface MultipleChoiceProposal {
  allow_revoting: boolean
  choices: CheckedMultipleChoiceOption[]
  description: string
  expiration: Expiration
  min_voting_period?: Expiration | null
  proposer: Addr
  start_height: number
  status: ProposalStatus
  title: string
  total_power: Uint128
  votes: MultipleChoiceVotes
  voting_strategy: VotingStrategy
}
export interface CheckedMultipleChoiceOption {
  description: string
  index: number
  msgs: CosmosMsgForEmpty[]
  option_type: MultipleChoiceOptionType
  title: string
  vote_count: Uint128
}
export interface MultipleChoiceVotes {
  vote_weights: Uint128[]
}
export interface VoteListResponse {
  votes: VoteInfo[]
}
export type ProposalCreationPolicyResponse =
  | {
      Anyone: {}
    }
  | {
      Module: {
        addr: Addr
      }
    }
export interface HooksResponse {
  hooks: string[]
}
