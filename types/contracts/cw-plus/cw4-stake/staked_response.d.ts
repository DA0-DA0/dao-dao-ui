import { Denom, Uint128 } from "./shared-types";

export interface StakedResponse {
denom: Denom
stake: Uint128
[k: string]: unknown
}
