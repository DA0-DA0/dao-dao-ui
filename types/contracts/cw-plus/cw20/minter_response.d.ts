/* tslint:disable */
import { Uint128 } from './shared-types'

export interface MinterResponse {
  /**
   * cap is a hard cap on total supply that can be achieved by minting. Note that this refers to total_supply. If None, there is unlimited cap.
   */
  cap?: Uint128 | null
  minter: string
  [k: string]: unknown
}
