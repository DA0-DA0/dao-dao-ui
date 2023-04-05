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

`amount` and `denom` are in the base unit with no decimals. For example, if you
want to spend 1 $JUNO, since JUNO has 6 decimals, then `amount` should be
`1000000` and `denom` should be `ujuno`. If this is confusing, please ask for
help!
