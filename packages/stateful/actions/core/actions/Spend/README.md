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
  "from": "<FROM ADDRESS>",
  "to": "<RECIPIENT ADDRESS>",
  "amount": "<AMOUNT>",
  "denom": "<DENOM>",
  "cw20": "<true | false>",
  "ibcTimeout": {
    "value": <SECONDS>,
    "units": "seconds"
  }
}
```

If used in a DAO, `fromChainId` and `from` determine which account has the
tokens being sent, which can be the native chain or any supported Polytone or
ICA chain. `toChainId` is unrelated, and it determines if the tokens are sent to
another address on the same chain or to an account on another chain via IBC.

The `ibcTimeout` is used when sending tokens from one chain to a different chain
via IBC. It must be longer than the max proposal voting duration, or else it may
timeout before it gets executed. A good timeout is a week after the voting
period ends. The action takes into account the voting period automatically, so
this field is relative to end of the voting period. However, if the DAO's voting
period is specified in blocks (uncommon), then the timeout will not take into
account the voting period and will be relative to the proposal creation time.
