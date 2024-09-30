# CreateRewardDistribution

Create a new channel for reward distribution.

## Bulk import format

This is relevant when bulk importing actions, as described in [this
guide](https://github.com/DA0-DA0/dao-dao-ui/wiki/Bulk-importing-actions).

### Key

`createRewardDistribution`

### Data format

```json
{
  "type": "<native | cw20>",
  "denomOrAddress": "<DENOM OR ADDRESS>",
  "immediate": <true | false>,
  "rate": {
    "amount": <AMOUNT>,
    "unit": "<seconds | minutes | hours | days | weeks | months | years | blocks>"
  },
  "initialFunds": "<AMOUNT>",
  "openFunding": <true | false>
}
```
