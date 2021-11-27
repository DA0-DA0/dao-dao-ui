import { ChannelInfo, Uint128 } from "./shared-types";

export type Amount = ({
native: Coin
} | {
cw20: Cw20Coin
})

export interface ChannelResponse {
/**
 * How many tokens we currently have pending over this channel
 */
balances: Amount[]
/**
 * Information on the channel's connection
 */
info: ChannelInfo
/**
 * The total number of tokens that have been sent over this channel (even if many have been returned, so balance is low)
 */
total_sent: Amount[]
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
