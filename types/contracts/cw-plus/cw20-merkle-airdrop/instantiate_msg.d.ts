export interface InstantiateMsg {
cw20_token_address: string
/**
 * Owner if none set to info.sender.
 */
owner?: (string | null)
[k: string]: unknown
}
