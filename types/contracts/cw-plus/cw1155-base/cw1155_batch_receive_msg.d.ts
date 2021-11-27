import { Binary, Uint128 } from './shared-types'

/**
 * Cw1155BatchReceiveMsg should be de/serialized under `BatchReceive()` variant in a ExecuteMsg
 */
export interface Cw1155BatchReceiveMsg {
  batch: [string, Uint128][]
  from?: string | null
  msg: Binary
  operator: string
  [k: string]: unknown
}
