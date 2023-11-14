import { Addr, Empty, Uint128 } from './common'

export interface InstantiateMsg {
  pre_propose_approval_contract: string
}
export type ExecuteMsg =
  | {
      propose: {
        msg: ApproverProposeMessage
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
      add_proposal_submitted_hook: {
        address: string
      }
    }
  | {
      remove_proposal_submitted_hook: {
        address: string
      }
    }
  | {
      proposal_completed_hook: {
        new_status: Status
        proposal_id: number
      }
    }
export type ApproverProposeMessage = {
  propose: {
    approval_id: number
    description: string
    title: string
  }
}
export type DepositToken =
  | {
      token: {
        denom: UncheckedDenom
      }
    }
  | {
      voting_module_token: {}
    }
export type UncheckedDenom =
  | {
      native: string
    }
  | {
      cw20: string
    }
export type DepositRefundPolicy = 'always' | 'only_passed' | 'never'
export type Status =
  | 'open'
  | 'rejected'
  | 'passed'
  | 'executed'
  | 'closed'
  | 'execution_failed'
export interface UncheckedDepositInfo {
  amount: Uint128
  denom: DepositToken
  refund_policy: DepositRefundPolicy
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
      proposal_submitted_hooks: {}
    }
  | {
      query_extension: {
        msg: QueryExt
      }
    }
export type QueryExt =
  | {
      pre_propose_approval_contract: {}
    }
  | {
      pending_proposal_id_for_approval_proposal_id: {
        id: number
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
export interface HooksResponse {
  hooks: string[]
}
