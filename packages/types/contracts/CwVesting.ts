import { Addr, Binary, Expiration, Uint128 } from './common'

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
export interface InstantiateMsg {
  owner?: string | null
  params: UncheckedVestingParams
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
export type ExecuteMsg =
  | {
      receive: Cw20ReceiveMsg
    }
  | {
      distribute: {}
    }
  | {
      cancel: {}
    }
  | {
      delegate: {
        amount: Uint128
        validator: string
      }
    }
  | {
      redelegate: {
        amount: Uint128
        dst_validator: string
        src_validator: string
      }
    }
  | {
      undelegate: {
        amount: Uint128
        validator: string
      }
    }
  | {
      set_withdraw_address: {
        address: string
      }
    }
  | {
      withdraw_delegator_reward: {
        validator: string
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
      info: {}
    }
  | {
      ownership: {}
    }
  | {
      vested_amount: {}
    }
export type CheckedDenom =
  | {
      native: string
    }
  | {
      cw20: Addr
    }
export type VestingPaymentStatus =
  | 'active'
  | 'canceled'
  | 'canceled_and_unbonding'
  | 'fully_vested'
  | 'unfunded'
export interface VestingPayment {
  amount: Uint128
  canceled_at_time?: number | null
  claimed_amount: Uint128
  denom: CheckedDenom
  description?: string | null
  recipient: Addr
  staked_amount: Uint128
  status: VestingPaymentStatus
  title?: string | null
  vesting_schedule: Curve
}
export interface OwnershipForAddr {
  owner?: Addr | null
  pending_expiry?: Expiration | null
  pending_owner?: Addr | null
}
