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
  "chainId": "<CHAIN ID>",
  "type": "<TYPE>",
  "validator": "<VALIDATOR ADDRESS>",
  // Only used when redelegating.
  "toValidator": "<REDELEGATE TO VALIDATOR ADDRESS>",
  // Only used when setting withdraw address.
  "withdrawAddress": "<WITHDRAWER ADDRESS>",
  "amount": "<AMOUNT>"
}
```

`type` can be one of the following:

- `delegate`
- `undelegate`
- `redelegate`
- `withdraw_delegator_reward`
- `set_withdraw_address`

`toValidator` is only required when `type` is `redelegate`. Otherwise, it is
ignored and can be omitted.

`withdrawAddress` is only required when `type` is `set_withdraw_address`.
Otherwise, it is ignored and can be omitted.
