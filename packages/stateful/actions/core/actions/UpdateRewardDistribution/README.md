# UpdateRewardDistribution

Update a reward distribution.

## Bulk import format

This is relevant when bulk importing actions, as described in [this
guide](https://github.com/DA0-DA0/dao-dao-ui/wiki/Bulk-importing-actions).

### Key

`updateRewardDistribution`

### Data format

```json
{
  "address": "<ADDRESS>",
  "id": <ID>,
  "immediate": <true | false>,
  "rate": {
    "amount": "<AMOUNT>",
    "unit": "<seconds | minutes | hours | days | weeks | months | years | blocks>"
  },
  "openFunding": <true | false>
}
```
