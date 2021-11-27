import { CreateMsg, Uint128 } from "./shared-types";

export type ExecuteMsg = ({
create: CreateMsg
} | {
top_up: {
id: string
[k: string]: unknown
}
} | {
approve: {
/**
 * id is a human-readable name for the escrow from create
 */
id: string
[k: string]: unknown
}
} | {
refund: {
/**
 * id is a human-readable name for the escrow from create
 */
id: string
[k: string]: unknown
}
} | {
receive: Cw20ReceiveMsg
})
/**
 * Binary is a wrapper around Vec<u8> to add base64 de/serialization with serde. It also adds some helper methods to help encode inline.
 * 
 * This is only needed as serde-json-{core,wasm} has a horrible encoding for Vec<u8>
 */
export type Binary = string

/**
 * Cw20ReceiveMsg should be de/serialized under `Receive()` variant in a ExecuteMsg
 */
export interface Cw20ReceiveMsg {
amount: Uint128
msg: Binary
sender: string
[k: string]: unknown
}
