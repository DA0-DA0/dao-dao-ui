import { Expiration, Uint128 } from './common'

export interface Claim {
  amount: Uint128
  release_at: Expiration
}
