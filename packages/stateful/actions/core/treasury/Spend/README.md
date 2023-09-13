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
  "fromChainId": "<CHAIN ID>",
  "toChainId": "<CHAIN ID>",
  "to": "<RECIPIENT ADDRESS>",
  "amount": "<AMOUNT>",
  "denom": "<DENOM>"
}
```

If used in a DAO, `fromChainId` determines which account has the tokens being
sent, which can be the native chain or any supported Polytone chain. `toChainId`
is unrelated, and it determines if the tokens are sent to another address on the
same chain or to an account on another chain via IBC.
