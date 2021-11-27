import { Expiration, Uint128 } from "./shared-types";

export type ExecuteMsg = ({
create: CreateMsg
} | {
release: {
id: string
/**
 * This is the preimage, must be exactly 32 bytes in hex (64 chars) to release: sha256(from_hex(preimage)) == from_hex(hash)
 */
preimage: string
[k: string]: unknown
}
} | {
refund: {
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

export interface CreateMsg {
/**
 * You can set expiration at time or at block height the contract is valid at. After the contract is expired, it can be returned to the original funder.
 */
expires: Expiration
/**
 * This is hex-encoded sha-256 hash of the preimage (must be 32*2 = 64 chars)
 */
hash: string
/**
 * id is a human-readable name for the swap to use later. 3-20 bytes of utf-8 text
 */
id: string
/**
 * If approved, funds go to the recipient
 */
recipient: string
[k: string]: unknown
}
/**
 * Cw20ReceiveMsg should be de/serialized under `Receive()` variant in a ExecuteMsg
 */
export interface Cw20ReceiveMsg {
amount: Uint128
msg: Binary
sender: string
[k: string]: unknown
}
