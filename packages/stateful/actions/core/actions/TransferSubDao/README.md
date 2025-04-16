# TransferSubDao

Initiate ownership transfer of a SubDAO by nominating a new admin, to be
completed by the nominated admin with a different action
([AcceptSubDao](../AcceptSubDao)). TransferSubDao is different from
[BecomeSubDao](../BecomeSubDao), which is used when a DAO that is currently
fully self-administered decides to become a SubDAO.

## Bulk import format

This is relevant when bulk importing actions, as described in [this
guide](https://github.com/DA0-DA0/dao-dao-ui/wiki/Bulk-importing-actions).

### Key

`transferSubDao`

### Data format

```json
{
  "chainId": "<CHAIN ID>",
  "dao": "<SUBDAO ADDRESS>",
  "admin": "<NEW ADMIN ADDRESS>"
}
```
