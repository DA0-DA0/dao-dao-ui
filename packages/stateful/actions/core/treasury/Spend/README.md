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
