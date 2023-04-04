# ManageStorageItems

Manage the key-value pairs stored in the DAO's items storage.

## Bulk import format

This is relevant when bulk importing actions, as described in [this
guide](https://github.com/DA0-DA0/dao-dao-ui/wiki/Bulk-importing-actions).

### Key

`manageStorageItems`

### Data format

```json
{
  "setting": <true | false>,
  "key": "<KEY>",
  "value": "<VALUE>"
}
```

If `setting` is `false`, only `key` is required.
