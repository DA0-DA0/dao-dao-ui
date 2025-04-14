# ManageModules

Add, update, or remove modules from the DAO.

## Bulk import format

This is relevant when bulk importing actions, as described in [this
guide](https://github.com/DA0-DA0/dao-dao-ui/wiki/Bulk-importing-actions).

### Key

`manageModules`

### Data format

```json
{
  "mode": "<set | delete>",
  "id": "<MODULE ID>",
  "values": {
    // MODULE SPECIFIC VALUES
  },
  "extra": {
    // EXTRA MODULE SPECIFIC DATA USED DURING ENCODING BUT NOT STORED
  }
}
```

The available modules with their respective `id` and `values` types can be found
in [`@dao-dao/packages/stateful/modules/modules`](../../../../modules/modules).
