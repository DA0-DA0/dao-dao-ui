import { Addr, Binary, Uint128 } from './common'

export type TokenInfo =
  | {
      native: {
        amount: Uint128
        denom: string
      }
    }
  | {
      cw20: {
        amount: Uint128
        contract_addr: string
      }
    }
export interface InstantiateMsg {
  counterparty_one: Counterparty
  counterparty_two: Counterparty
}
export interface Counterparty {
  address: string
  promise: TokenInfo
}
export type ExecuteMsg =
  | {
      receive: Cw20ReceiveMsg
    }
  | {
      fund: {}
    }
  | {
      withdraw: {}
    }
export interface Cw20ReceiveMsg {
  amount: Uint128
  msg: Binary
  sender: string
}
export type QueryMsg = {
  status: {}
}
export interface MigrateMsg {}
export type CheckedTokenInfo =
  | {
      native: {
        amount: Uint128
        denom: string
      }
    }
  | {
      cw20: {
        amount: Uint128
        contract_addr: Addr
      }
    }
export interface StatusResponse {
  counterparty_one: CheckedCounterparty
  counterparty_two: CheckedCounterparty
}
export interface CheckedCounterparty {
  address: Addr
  promise: CheckedTokenInfo
  provided: boolean
}
