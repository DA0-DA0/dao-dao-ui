# Spend

Spend native or CW20 tokens from the current account.

## Bulk import format

This is relevant when bulk importing actions, as described in [this
guide](https://github.com/DA0-DA0/dao-dao-ui/wiki/Bulk-importing-actions).

### Key

`spend`

### Data format

```json
{
  "to": "<RECIPIENT ADDRESS>",
  "amount": "<AMOUNT>",
  "denom": "<DENOM>"
}
```

`amount` and `denom` are in the base unit with no decimals. For example, if you
want to spend 1 $JUNO, since JUNO has 6 decimals, then `amount` should be
`1000000` and `denom` should be `ujuno`. If this is confusing, please ask for
help!
