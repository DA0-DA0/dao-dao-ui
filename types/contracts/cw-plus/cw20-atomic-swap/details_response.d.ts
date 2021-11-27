import { Expiration, Uint128 } from "./shared-types";

export type BalanceHuman = ({
Native: Coin[]
} | {
Cw20: Cw20Coin
})

export interface DetailsResponse {
/**
 * Balance in native tokens or cw20 token, with human-readable address
 */
balance: BalanceHuman
/**
 * Once a swap is expired, it can be returned to the original source (via "refund").
 */
expires: Expiration
/**
 * This is hex-encoded sha-256 hash of the preimage (must be 32*2 = 64 chars)
 */
hash: string
/**
 * Id of this swap
 */
id: string
/**
 * If released, funds go to the recipient
 */
recipient: string
/**
 * If refunded, funds go to the source
 */
source: string
[k: string]: unknown
}
export interface Coin {
amount: Uint128
denom: string
[k: string]: unknown
}
export interface Cw20Coin {
address: string
amount: Uint128
[k: string]: unknown
}
