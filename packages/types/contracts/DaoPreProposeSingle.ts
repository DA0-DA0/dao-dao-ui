import {
  Addr,
  CheckedDepositInfo,
  CosmosMsgFor_Empty,
  DepositRefundPolicy,
  Empty,
  SecretAnyContractInfo,
  Uint128,
} from './common'

export interface ConfigResponse {
  deposit_info?: CheckedDepositInfo | null
  open_proposal_submission: boolean
}
export type DaoResponse = string | SecretAnyContractInfo
export interface DepositInfoResponse {
  deposit_info?: CheckedDepositInfo | null
  proposer: Addr
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
        new_status: Status
        proposal_id: number
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
export type ExtensionResponse = string
export interface InstantiateMsg {
  deposit_info?: UncheckedDepositInfo | null
  extension: Empty
  open_proposal_submission: boolean
}
export type ProposalModuleResponse = string | SecretAnyContractInfo
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
      extension: {
        msg: Empty
      }
    }
