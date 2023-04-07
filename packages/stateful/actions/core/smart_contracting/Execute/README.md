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
  "address": "<SMART CONTRACT ADDRESS>",
  "message": "<SMART CONTRACT MESSAGE>",
  "funds": [
    // Optional. If not provided, no funds will be sent.
    {
      "denom": "<DENOM>",
      "amount": "<AMOUNT>"
    }
  ],
  "cw20": <true | false>
}
```

If `cw20` is true, then `funds` can only contain 1 entry, and `denom` should be
the address of a CW20 token.
