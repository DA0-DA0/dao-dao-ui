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
export interface CreateMsg {
  [k: string]: unknown
  /**
   * arbiter can decide to approve or refund the escrow
   */
  arbiter: string
  /**
   * Besides any possible tokens sent with the CreateMsg, this is a list of all cw20 token addresses that are accepted by the escrow during a top-up. This is required to avoid a DoS attack by topping-up with an invalid cw20 contract. See https://github.com/CosmWasm/cosmwasm-plus/issues/19
   */
  cw20_whitelist?: string[] | null
  /**
   * When end height set and block height exceeds this value, the escrow is expired. Once an escrow is expired, it can be returned to the original funder (via "refund").
   */
  end_height?: number | null
  /**
   * When end time (in seconds since epoch 00:00:00 UTC on 1 January 1970) is set and block time exceeds this value, the escrow is expired. Once an escrow is expired, it can be returned to the original funder (via "refund").
   */
  end_time?: number | null
  /**
   * id is a human-readable name for the escrow to use later 3-20 bytes of utf-8 text
   */
  id: string
  /**
   * if approved, funds go to the recipient
   */
  recipient: string
}
