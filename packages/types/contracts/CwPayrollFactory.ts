import { Addr, Binary, Timestamp, Uint128 } from './common'

export interface InstantiateMsg {
  owner?: string | null
  params: UncheckedVestingParams
}
export type ExecuteMsg =
  | {
      receive: Cw20ReceiveMsg
    }
  | {
      instantiate_native_payroll_contract: {
        instantiate_msg: InstantiateMsg
        label: string
      }
    }
  | {
      update_code_id: {
        vesting_code_id: number
      }
    }
  | {
      update_ownership: Action
    }
export type UncheckedDenom =
  | {
      native: string
    }
  | {
      cw20: string
    }
export type Curve =
  | {
      constant: {
        y: Uint128
      }
    }
  | {
      saturating_linear: SaturatingLinear
    }
  | {
      piecewise_linear: PiecewiseLinear
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
export type Expiration =
  | {
      at_height: number
    }
  | {
      at_time: Timestamp
    }
  | {
      never: {}
    }
export interface Cw20ReceiveMsg {
  amount: Uint128
  msg: Binary
  sender: string
}
export interface UncheckedVestingParams {
  amount: Uint128
  denom: UncheckedDenom
  description?: string | null
  recipient: string
  title?: string | null
  vesting_schedule: Curve
}
export interface SaturatingLinear {
  max_x: number
  max_y: Uint128
  min_x: number
  min_y: Uint128
}
export interface PiecewiseLinear {
  steps: [number, Uint128][]
}
export type QueryMsg =
  | {
      list_vesting_contracts: {
        limit?: number | null
        start_after?: string | null
      }
    }
  | {
      list_vesting_contracts_reverse: {
        limit?: number | null
        start_before?: string | null
      }
    }
  | {
      list_vesting_contracts_by_instantiator: {
        instantiator: string
        limit?: number | null
        start_after?: string | null
      }
    }
  | {
      list_vesting_contracts_by_instantiator_reverse: {
        instantiator: string
        limit?: number | null
        start_before?: string | null
      }
    }
  | {
      list_vesting_contracts_by_recipient: {
        limit?: number | null
        recipient: string
        start_after?: string | null
      }
    }
  | {
      list_vesting_contracts_by_recipient_reverse: {
        limit?: number | null
        recipient: string
        start_before?: string | null
      }
    }
  | {
      ownership: {}
    }
  | {
      code_id: {}
    }
export type ArrayOfVestingContract = VestingContract[]
export interface VestingContract {
  contract: string
  instantiator: string
  recipient: string
}
export interface OwnershipForAddr {
  owner?: Addr | null
  pending_expiry?: Expiration | null
  pending_owner?: Addr | null
}
