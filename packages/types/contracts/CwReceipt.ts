import { Addr, Binary, Expiration, Timestamp, Uint128 } from './common'

export interface InstantiateMsg {
  output: string
  owner?: string | null
}
export type ExecuteMsg =
  | {
      receive: Cw20ReceiveMsg
    }
  | {
      pay: {
        id: string
      }
    }
  | {
      update_output: {
        output: string
      }
    }
  | {
      update_ownership: Action
    }
export type Action =
  | {
      transfer_ownership: {
        expiry?: Expiration | null
        new_owner: string
      }
    }
  | 'accept_ownership'
  | 'renounce_ownership'
export interface Cw20ReceiveMsg {
  amount: Uint128
  msg: Binary
  sender: string
}
export type QueryMsg =
  | {
      output: {}
    }
  | {
      list_payments_to_id: {
        id: string
        limit?: number | null
        start_after?: number | null
      }
    }
  | {
      list_totals_paid_to_id: {
        id: string
        limit?: number | null
        start_after?: CheckedDenom | null
      }
    }
  | {
      list_ids_for_payer: {
        limit?: number | null
        payer: string
        start_after?: string | null
      }
    }
  | {
      list_totals_paid_by_payer: {
        limit?: number | null
        payer: string
        start_after?: CheckedDenom | null
      }
    }
  | {
      ownership: {}
    }
export type CheckedDenom =
  | {
      native: string
    }
  | {
      cw20: Addr
    }
export interface ListIdsForPayerResponse {
  ids: string[]
}
export interface ListPaymentsToIdResponse {
  payments: PaymentWithId[]
}
export interface PaymentWithId {
  id: number
  payment: Payment
}
export interface Payment {
  amount: Uint128
  block: BlockInfo
  denom: CheckedDenom
}
export interface BlockInfo {
  chain_id: string
  height: number
  time: Timestamp
}
export interface ListTotalsPaidByPayerResponse {
  totals: Total[]
}
export interface Total {
  amount: Uint128
  denom: CheckedDenom
}
export interface ListTotalsPaidToIdResponse {
  totals: Total[]
}
export interface OutputResponse {
  output: Addr
}
export interface OwnershipForString {
  owner?: string | null
  pending_expiry?: Expiration | null
  pending_owner?: string | null
}
