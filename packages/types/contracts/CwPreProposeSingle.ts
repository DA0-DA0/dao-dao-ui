import {
  Addr,
  CheckedDepositInfo,
  CosmosMsgFor_Empty,
  DepositRefundPolicy,
  Empty,
  Uint128,
} from './common'

export interface ConfigResponse {
  deposit_info?: CheckedDepositInfo | null
  open_proposal_submission: boolean
  [k: string]: unknown
}
export type DaoResponse = string
export interface DepositInfoResponse {
  deposit_info?: CheckedDepositInfo | null
  proposer: Addr
  [k: string]: unknown
}
export type ExecuteMsg =
  | {
      propose: {
        msg: ProposeMessage
        [k: string]: unknown
      }
    }
  | {
      update_config: {
        deposit_info?: UncheckedDepositInfo | null
        open_proposal_submission: boolean
        [k: string]: unknown
      }
    }
  | {
      withdraw: {
        denom?: UncheckedDenom | null
        [k: string]: unknown
      }
    }
  | {
      extension: {
        msg: Empty
        [k: string]: unknown
      }
    }
  | {
      proposal_created_hook: {
        proposal_id: number
        proposer: string
        [k: string]: unknown
      }
    }
  | {
      proposal_completed_hook: {
        new_status: Status
        proposal_id: number
        [k: string]: unknown
      }
    }
export type ProposeMessage = {
  propose: {
    description: string
    msgs: CosmosMsgFor_Empty[]
    title: string
  }
}
export type DepositToken =
  | {
      token: {
        denom: UncheckedDenom
        [k: string]: unknown
      }
    }
  | {
      voting_module_token: {
        [k: string]: unknown
      }
    }
export type UncheckedDenom =
  | {
      native: string
    }
  | {
      cw20: string
    }
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
  [k: string]: unknown
}
export type ExtensionResponse = string
export interface InstantiateMsg {
  deposit_info?: UncheckedDepositInfo | null
  extension: Empty
  open_proposal_submission: boolean
  [k: string]: unknown
}
export type ProposalModuleResponse = string
export type QueryMsg =
  | {
      proposal_module: {
        [k: string]: unknown
      }
    }
  | {
      dao: {
        [k: string]: unknown
      }
    }
  | {
      config: {
        [k: string]: unknown
      }
    }
  | {
      deposit_info: {
        proposal_id: number
        [k: string]: unknown
      }
    }
  | {
      extension: {
        msg: Empty
        [k: string]: unknown
      }
    }
