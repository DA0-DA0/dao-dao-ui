# DaoAdminExec

Execute arbitrary Cosmos messages on behalf of a DAO that the current DAO is
admin of. This is useful for executing messages on behalf of SubDAOs.

## Bulk import format

This is relevant when bulk importing actions, as described in [this
guide](https://github.com/DA0-DA0/dao-dao-ui/wiki/Bulk-importing-actions).

### Key

`daoAdminExec`

### Data format

```json
{
  "coreAddress": "<DAO ADDRESS>",
  "msgs": [
    // Cosmos messages (supported by CosmWasm) to execute on behalf of the DAO.
  ]
}
```
