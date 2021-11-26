/* tslint:disable */
import { Binary, Uint128 } from './shared-types'

/**
 * Cw20ReceiveMsg should be de/serialized under `Receive()` variant in a ExecuteMsg
 */
export interface Cw20ReceiveMsg {
  amount: Uint128
  msg: Binary
  sender: string
  [k: string]: unknown
}
