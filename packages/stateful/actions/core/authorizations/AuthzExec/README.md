# AuthzExec

Execute a message on an account that has authorized the executor to act on
behalf of its account via authz.

## Bulk import format

This is relevant when bulk importing actions, as described in [this
guide](https://github.com/DA0-DA0/dao-dao-ui/wiki/Bulk-importing-actions).

### Key

`authzExec`

### Data format

```json
{
  "address": "<TARGET ACCOUNT ADDRESS>",
  "msgs": [
    // COSMWASM MESSAGE
  ]
}
```

Each message is a CosmWasm message object in JSON format. You can find this by
viewing the raw data of an action in a proposal, or by viewing the preview in
the proposal creation UI with the action you want.
