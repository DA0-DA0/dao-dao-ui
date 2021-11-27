import { Decimal, Uint128 } from "./shared-types";

export interface InvestmentResponse {
/**
 * this is how much the owner takes as a cut when someone unbonds
 */
exit_tax: Decimal
/**
 * This is the minimum amount we will pull out to reinvest, as well as a minimum that can be unbonded (to avoid needless staking tx)
 */
min_withdrawal: Uint128
nominal_value: Decimal
/**
 * owner created the contract and takes a cut
 */
owner: string
staked_tokens: Coin
token_supply: Uint128
/**
 * All tokens are bonded to this validator
 */
validator: string
[k: string]: unknown
}
export interface Coin {
amount: Uint128
denom: string
[k: string]: unknown
}
