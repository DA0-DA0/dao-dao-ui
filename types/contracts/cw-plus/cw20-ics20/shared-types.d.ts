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
export type Uint128 = string;
export interface ChannelInfo {
    [k: string]: unknown;
    /**
     * the connection this exists on (you can use to query client/consensus info)
     */
    connection_id: string;
    /**
     * the remote channel/port we connect to
     */
    counterparty_endpoint: IbcEndpoint;
    /**
     * id of this channel
     */
    id: string;
}
export interface IbcEndpoint {
    [k: string]: unknown;
    channel_id: string;
    port_id: string;
}
/**
 * This is the message we accept via Receive
 */
export interface TransferMsg {
    [k: string]: unknown;
    /**
     * The local channel to send the packets on
     */
    channel: string;
    /**
     * The remote address to send to. Don't use HumanAddress as this will likely have a different Bech32 prefix than we use and cannot be validated locally
     */
    remote_address: string;
    /**
     * How long the packet lives in seconds. If not specified, use default_timeout
     */
    timeout?: (number | null);
}
