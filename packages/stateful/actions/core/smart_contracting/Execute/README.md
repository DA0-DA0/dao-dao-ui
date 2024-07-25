# Execute

Execute a message on a smart contract.

## Bulk import format

This is relevant when bulk importing actions, as described in [this
guide](https://github.com/DA0-DA0/dao-dao-ui/wiki/Bulk-importing-actions).

### Key

`execute`

### Data format

```json
{
  "chainId": "<CHAIN ID>",
  "sender": "<EXECUTOR ADDRESS>",
  "address": "<SMART CONTRACT ADDRESS>",
  "message": "<SMART CONTRACT MESSAGE>",
  "funds": [
    // Optional. If not provided, no funds will be sent.
    {
      "denom": "<DENOM>",
      "amount": "<AMOUNT>",
      "decimals": "<DECIMALS>"
    }
  ],
  "cw20": <true | false>
}
```

If `cw20` is true, then `funds` can only contain 1 entry, and `denom` should be
the address of a CW20 token.

You must set `decimals` correctly for the specified `amount` of funds. The final
message gets generated with `amount * 10^(decimals)` microunits of the specified
`denom`. For example: `amount = 5`, `decimals = 6`, and `denom = "untrn"` =>
`5000000untrn` or `5 * 10^6 untrn`, where `untrn` is the microdenom/true
denomination of `NTRN`.
