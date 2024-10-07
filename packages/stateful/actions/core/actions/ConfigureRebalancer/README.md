# ConfigureRebalancer

Configure the rebalancer.

## Bulk import format

This is relevant when bulk importing actions, as described in [this
guide](https://github.com/DA0-DA0/dao-dao-ui/wiki/Bulk-importing-actions).

### Key

`configureRebalancer`

### Data format

```json
{
  "chainId": "<CHAIN ID>",
  "trustee": "<TRUSTEE ADDRESS>",
  "baseDenom": "<BASE DENOM>",
  "tokens": [
    {
      "denom": "<DENOM>",
      "percent": <PERCENT>
    },
    ...
  ],
  "pid": {
    "kp": <KP>,
    "ki": <KI>,
    "kd": <KD>
  },
  "maxLimit": <MAX LIMIT>,
  "minBalance": {
    "denom": "<DENOM>",
    "amount": "<AMOUNT>"
  } | undefined,
  "targetOverrideStrategy": "<proportional | priority>"
}
```

If used in a DAO, `chainId` determines which account the rebalancer is operating
on, which can be the native chain or any supported Polytone chain.
