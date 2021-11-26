/* tslint:disable */
import { Expiration } from './shared-types'

export interface ApprovedForAllResponse {
  operators: Approval[]
  [k: string]: unknown
}
export interface Approval {
  /**
   * When the Approval expires (maybe Expiration::never)
   */
  expires: Expiration
  /**
   * Account that can transfer/send the token
   */
  spender: string
  [k: string]: unknown
}
