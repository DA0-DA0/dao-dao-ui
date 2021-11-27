export type ExecuteMsg = ({
update_config: {
/**
 * NewOwner if non sent, contract gets locked. Recipients can receive airdrops but owner cannot register new stages.
 */
new_owner?: (string | null)
[k: string]: unknown
}
} | {
register_merkle_root: {
/**
 * MerkleRoot is hex-encoded merkle root.
 */
merkle_root: string
[k: string]: unknown
}
} | {
claim: {
amount: Uint128
/**
 * Proof is hex-encoded merkle proof.
 */
proof: string[]
stage: number
[k: string]: unknown
}
})
/**
 * A thin wrapper around u128 that is using strings for JSON encoding/decoding, such that the full u128 range can be used for clients that convert JSON numbers to floats, like JavaScript and jq.
 * 
 * # Examples
 * 
 * Use `from` to create instances of this and `u128` to get the value out:
 * 
 * ``` # use cosmwasm_std::Uint128; let a = Uint128::from(123u128); assert_eq!(a.u128(), 123);
 * 
 * let b = Uint128::from(42u64); assert_eq!(b.u128(), 42);
 * 
 * let c = Uint128::from(70u32); assert_eq!(c.u128(), 70); ```
 */
export type Uint128 = string
