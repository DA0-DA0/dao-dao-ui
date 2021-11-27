import { Denom, Uint128 } from './shared-types'
/**
 * Duration is a delta of time. You can add it to a BlockInfo or Expiration to move that further in the future. Note that an height-based Duration and a time-based Expiration cannot be combined
 */
export type Duration =
  | {
      height: number
    }
  | {
      time: number
    }

export interface InstantiateMsg {
  admin?: string | null
  /**
   * denom of the token to stake
   */
  denom: Denom
  min_bond: Uint128
  tokens_per_weight: Uint128
  unbonding_period: Duration
  [k: string]: unknown
}
