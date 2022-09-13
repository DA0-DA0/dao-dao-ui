import { Addr, Uint128 } from './common'

export interface CheckedDepositInfo {
  deposit: Uint128
  refund_failed_proposals: boolean
  token: Addr
}
