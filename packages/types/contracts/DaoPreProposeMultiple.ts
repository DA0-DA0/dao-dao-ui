import {
  Addr,
  CosmosMsgForEmpty,
  Empty,
  ProposalStatus,
  Uint128,
} from './common'

export interface ConfigResponse {
  deposit_info?: CheckedDepositInfo | null
  open_proposal_submission: boolean
}
export type ProposalModuleResponse = string
export type DaoResponse = string
export type DepositToken =
  | {
      token: {
        denom: UncheckedDenom
      }
    }
  | {
      voting_module_token: {
        token_type: VotingModuleTokenType
      }
    }
export type VotingModuleTokenType = 'native' | 'cw20'
export type UncheckedDenom =
  | {
      native: string
    }
  | {
      cw20: string
    }
export enum DepositRefundPolicy {
  Always = 'always',
  OnlyPassed = 'only_passed',
  Never = 'never',
}
export interface InstantiateMsg {
  deposit_info?: UncheckedDepositInfo | null
  extension: Empty
  open_proposal_submission: boolean
}
export interface UncheckedDepositInfo {
  amount: Uint128
  denom: DepositToken
  refund_policy: DepositRefundPolicy
}
export type ExecuteMsg =
  | {
      propose: {
        msg: ProposeMessage
      }
    }
  | {
      update_config: {
        deposit_info?: UncheckedDepositInfo | null
        open_proposal_submission: boolean
      }
    }
  | {
      withdraw: {
        denom?: UncheckedDenom | null
      }
    }
  | {
      extension: {
        msg: Empty
      }
    }
  | {
      proposal_created_hook: {
        proposal_id: number
        proposer: string
      }
    }
  | {
      proposal_completed_hook: {
        new_status: ProposalStatus
        proposal_id: number
      }
    }
export type ProposeMessage = {
  propose: {
    choices: MultipleChoiceOptions
    description: string
    title: string
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
export type QueryMsg =
  | {
      proposal_module: {}
    }
  | {
      dao: {}
    }
  | {
      config: {}
    }
  | {
      deposit_info: {
        proposal_id: number
      }
    }
  | {
      query_extension: {
        msg: Empty
      }
    }
export type CheckedDenom =
  | {
      native: string
    }
  | {
      cw20: Addr
    }
export interface Config {
  deposit_info?: CheckedDepositInfo | null
  open_proposal_submission: boolean
}
export interface CheckedDepositInfo {
  amount: Uint128
  denom: CheckedDenom
  refund_policy: DepositRefundPolicy
}
export interface DepositInfoResponse {
  deposit_info?: CheckedDepositInfo | null
  proposer: Addr
}
