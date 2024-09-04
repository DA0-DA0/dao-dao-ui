# Instantiate

Instantiate a smart contract.

## Bulk import format

This is relevant when bulk importing actions, as described in [this
guide](https://github.com/DA0-DA0/dao-dao-ui/wiki/Bulk-importing-actions).

### Key

`instantiate`

### Data format

```json
{
  "chainId": "<CHAIN ID>",
  "sender": "<INSTANTIATOR ADDRESS>",
  // Optional. If empty, the smart contract will have no admin and thus can
  // never be upgraded.
  "admin": "<ADMIN ADDRESS>",
  "codeId": <SMART CONTRACT CODE ID>,
  "label": "<SMART CONTRACT LABEL>",
  "message": "<SMART CONTRACT INSTANTIATION MESSAGE>",
  "funds": [
    // Optional. If not provided, no funds will be sent.
    {
      "denom": "<DENOM>",
      "amount": "<AMOUNT>",
      "decimals": "<DECIMALS>"
    }
  ]
}
```

You must set `decimals` correctly for the specified `amount` of funds. The final
message gets generated with `amount * 10^(decimals)` microunits of the specified
`denom`. For example: `amount = 5`, `decimals = 6`, and `denom = "untrn"` =>
`5000000untrn` or `5 * 10^6 untrn`, where `untrn` is the microdenom/true
denomination of `NTRN`.
