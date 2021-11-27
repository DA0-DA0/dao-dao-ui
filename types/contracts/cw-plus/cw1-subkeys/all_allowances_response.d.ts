import { Expiration, NativeBalance } from './shared-types'

export interface AllAllowancesResponse {
  allowances: AllowanceInfo[]
  [k: string]: unknown
}
export interface AllowanceInfo {
  balance: NativeBalance
  expires: Expiration
  spender: string
  [k: string]: unknown
}
