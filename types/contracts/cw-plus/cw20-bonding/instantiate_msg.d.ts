import { Uint128 } from "./shared-types";

export type CurveType = ({
constant: {
scale: number
value: Uint128
[k: string]: unknown
}
} | {
linear: {
scale: number
slope: Uint128
[k: string]: unknown
}
} | {
square_root: {
scale: number
slope: Uint128
[k: string]: unknown
}
})

export interface InstantiateMsg {
/**
 * enum to store the curve parameters used for this contract if you want to add a custom Curve, you should make a new contract that imports this one. write a custom `instantiate`, and then dispatch `your::execute` -> `cw20_bonding::do_execute` with your custom curve as a parameter (and same with `query` -> `do_query`)
 */
curve_type: CurveType
/**
 * number of decimal places of the supply token, needed for proper curve math. If it is eg. BTC, where a balance of 10^8 means 1 BTC, then use 8 here.
 */
decimals: number
/**
 * name of the supply token
 */
name: string
/**
 * number of decimal places for the reserve token, needed for proper curve math. Same format as decimals above, eg. if it is uatom, where 1 unit is 10^-6 ATOM, use 6 here
 */
reserve_decimals: number
/**
 * this is the reserve token denom (only support native for now)
 */
reserve_denom: string
/**
 * symbol / ticker of the supply token
 */
symbol: string
[k: string]: unknown
}
