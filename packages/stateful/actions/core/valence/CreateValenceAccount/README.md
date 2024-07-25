# CreateValenceAccount

Create a Valence account.

## Bulk import format

This is relevant when bulk importing actions, as described in [this
guide](https://github.com/DA0-DA0/dao-dao-ui/wiki/Bulk-importing-actions).

### Key

`createValenceAccount`

### Data format

```json
{
  "chainId": "<CHAIN ID>",
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
