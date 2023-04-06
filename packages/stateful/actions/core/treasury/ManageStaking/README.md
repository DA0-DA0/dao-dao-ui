# ManageStaking

Manage native token staking.

## Bulk import format

This is relevant when bulk importing actions, as described in [this
guide](https://github.com/DA0-DA0/dao-dao-ui/wiki/Bulk-importing-actions).

### Key

`manageStaking`

### Data format

```json
{
  "stakeType": "<STAKE TYPE>",
  "validator": "<VALIDATOR ADDRESS>",
  // Only used when redelegating.
  "toValidator": "<REDELEATE TO VALIDATOR ADDRESS>",
  "amount": <AMOUNT>
}
```

`stakeType` can be one of the following:

- `delegate`
- `undelegate`
- `redelegate`
- `withdraw_delegator_reward`

`toValidator` is only required when `stakeType` is `redelegate`. Otherwise, it
is ignored and can be omitted.
