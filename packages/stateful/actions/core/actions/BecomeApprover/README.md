# BecomeApprover

Set up this DAO as an approver for another DAO with a pre-propose-approval-*
module whose approver is already set to this DAO. This will automatically create
proposals in this DAO that decide whether or not to allow proposals in the other
DAO to open for voting.

## Bulk import format

This is relevant when bulk importing actions, as described in [this
guide](https://github.com/DA0-DA0/dao-dao-ui/wiki/Bulk-importing-actions).

### Key

`becomeApprover`

### Data format

```json
{
  "address": "<ADDRESS>"
}
```

`address` refers to the `dao-pre-propose-approval-*` contract created with this
DAO as the approver.
