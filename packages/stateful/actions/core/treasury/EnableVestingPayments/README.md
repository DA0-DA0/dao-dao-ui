# EnableVestingPayments

Enable the vesting payments tab.

## Bulk import format

This is relevant when bulk importing actions, as described in [this
guide](https://github.com/DA0-DA0/dao-dao-ui/wiki/Bulk-importing-actions).

### Key

`enableVestingPayments`

### Data format

```json
{
  "factory": "<VESTING PAYMENTS FACTORY ADDRESS>"
}
```

The vesting payment factory must be instantiated before using this action.
