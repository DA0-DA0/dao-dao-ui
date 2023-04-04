# ManageWidgets

Add, update, or remove widgets from the DAO's page.

## Bulk import format

This is relevant when bulk importing actions, as described in [this
guide](https://github.com/DA0-DA0/dao-dao-ui/wiki/Bulk-importing-actions).

### Key

`manageWidgets`

### Data format

```json
{
  "mode": "<set | delete>",
  "id": "<WIDGET ID>",
  "values": {
    // WIDGET SPECIFIC VALUES
  }
}
```

The available widgets with their respective `id` and `values` types can be found
in [`@dao-dao/packages/stateful/widgets/widgets`](../../../../widgets/widgets).
