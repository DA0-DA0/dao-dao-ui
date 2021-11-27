import { Decimal, Uint128 } from "./shared-types";
/**
 * Duration is a delta of time. You can add it to a BlockInfo or Expiration to move that further in the future. Note that an height-based Duration and a time-based Expiration cannot be combined
 */
export type Duration = ({
height: number
} | {
time: number
})

export interface InstantiateMsg {
/**
 * decimal places of the derivative token (for UI)
 */
decimals: number
/**
 * this is how much the owner takes as a cut when someone unbonds
 */
exit_tax: Decimal
/**
 * This is the minimum amount we will pull out to reinvest, as well as a minimum that can be unbonded (to avoid needless staking tx)
 */
min_withdrawal: Uint128
/**
 * name of the derivative token
 */
name: string
/**
 * symbol / ticker of the derivative token
 */
symbol: string
/**
 * This is the unbonding period of the native staking module We need this to only allow claims to be redeemed after the money has arrived
 */
unbonding_period: Duration
/**
 * This is the validator that all tokens will be bonded to
 */
validator: string
[k: string]: unknown
}
