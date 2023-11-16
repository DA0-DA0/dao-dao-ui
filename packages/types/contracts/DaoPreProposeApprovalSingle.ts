import { Addr, CosmosMsgForEmpty, Uint128 } from './common'

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
export interface InstantiateMsg {
  deposit_info?: UncheckedDepositInfo | null
  extension: InstantiateExt
  open_proposal_submission: boolean
}
export interface UncheckedDepositInfo {
  amount: Uint128
  denom: DepositToken
  refund_policy: DepositRefundPolicy
}
export interface InstantiateExt {
  approver: string
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
        msg: ExecuteExt
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
export type ProposeMessage = {
  propose: {
    description: string
    msgs: CosmosMsgForEmpty[]
    title: string
  }
}
export type ExecuteExt =
  | {
      approve: {
        id: number
      }
    }
  | {
      reject: {
        id: number
      }
    }
  | {
      update_approver: {
        address: string
      }
    }
export type Status =
  | 'open'
  | 'rejected'
  | 'passed'
  | 'executed'
  | 'closed'
  | 'execution_failed'
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
      approver: {}
    }
  | {
      is_pending: {
        id: number
      }
    }
  | {
      proposal: {
        id: number
      }
    }
  | {
      pending_proposal: {
        id: number
      }
    }
  | {
      pending_proposals: {
        limit?: number | null
        start_after?: number | null
      }
    }
  | {
      reverse_pending_proposals: {
        limit?: number | null
        start_before?: number | null
      }
    }
  | {
      completed_proposal: {
        id: number
      }
    }
  | {
      completed_proposals: {
        limit?: number | null
        start_after?: number | null
      }
    }
  | {
      reverse_completed_proposals: {
        limit?: number | null
        start_before?: number | null
      }
    }
  | {
      completed_proposal_id_for_created_proposal_id: {
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
export type ProposalStatus =
  | {
      pending: {}
    }
  | {
      approved: {
        created_proposal_id: number
      }
    }
  | {
      rejected: {}
    }
export type ProposalStatusKey = 'pending' | 'approved' | 'rejected'
export type ProposeMsg = {
  title: string
  description: string
  msgs: CosmosMsgForEmpty[]
  proposer: string | null
}
export type Proposal = {
  status: ProposalStatus
  approval_id: number
  proposer: string
  msg: ProposeMsg
  deposit: CheckedDepositInfo
  // Extra from indexer.
  createdAt?: string
  completedAt?: string
}
