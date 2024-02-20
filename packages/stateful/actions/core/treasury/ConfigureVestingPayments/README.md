# ConfigureVestingPayments

Enable or configure vesting payments.

## Bulk import format

This is relevant when bulk importing actions, as described in [this
guide](https://github.com/DA0-DA0/dao-dao-ui/wiki/Bulk-importing-actions).

### Key

`configureVestingPayments`

### Data format

```json
{
  "factories": Map<"<CHAIN ID>", "<VESTING PAYMENTS FACTORY ADDRESS>">
}
```

The vesting payment factories must be instantiated before using this action.
Maps chain ID to vesting payment factory address.
