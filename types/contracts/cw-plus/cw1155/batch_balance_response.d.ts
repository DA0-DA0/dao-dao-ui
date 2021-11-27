import { Uint128 } from "./shared-types";

export interface BatchBalanceResponse {
balances: Uint128[]
[k: string]: unknown
}
