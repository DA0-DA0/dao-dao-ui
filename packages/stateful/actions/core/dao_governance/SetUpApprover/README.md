# SetUpApprover

Set up this DAO as an approver for another DAO with the approval flow setup.

## Bulk import format

This is relevant when bulk importing actions, as described in [this
guide](https://github.com/DA0-DA0/dao-dao-ui/wiki/Bulk-importing-actions).

### Key

`setUpApprover`

### Data format

```json
{
  "address": "<ADDRESS>"
}
```

`address` refers to the `dao-pre-propose-approval-*` contract setup with this
DAO as the approver.
