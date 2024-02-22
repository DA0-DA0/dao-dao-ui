# UpdateStakingConfig

Update token staking configuration.

## Bulk import format

This is relevant when bulk importing actions, as described in [this
guide](https://github.com/DA0-DA0/dao-dao-ui/wiki/Bulk-importing-actions).

### Key

`updateStakingConfig`

### Data format

```json
{
  "unstakingDurationEnabled": <true | false>,
  "unstakingDuration": {
    "value": "<NUMBER>",
    "units": "<seconds | minutes | hours | days | weeks | months | years>"
  }
}
```
