import { Binary, Uint128 } from "./shared-types";

/**
 * Cw1155ReceiveMsg should be de/serialized under `Receive()` variant in a ExecuteMsg
 */
export interface Cw1155ReceiveMsg {
amount: Uint128
/**
 * The account that the token transfered from
 */
from?: (string | null)
msg: Binary
/**
 * The account that executed the send message
 */
operator: string
token_id: string
[k: string]: unknown
}
