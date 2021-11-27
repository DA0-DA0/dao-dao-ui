import { Expiration, NativeBalance } from './shared-types'

export interface Allowance {
  balance: NativeBalance
  expires: Expiration
  [k: string]: unknown
}
