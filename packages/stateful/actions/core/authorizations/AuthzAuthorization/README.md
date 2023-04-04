# AuthzAuthorization

Authorize an account to execute messages on behalf of another account via authz.

## Bulk import format

This is relevant when bulk importing actions, as described in [this
guide](https://github.com/DA0-DA0/dao-dao-ui/wiki/Bulk-importing-actions).

### Key

`authzAuthorization`

### Data format

```json
{
  "custom": <true | false>,
  "mode": "<grant | revoke>",
  "value": {
    "grantee": "<AUTHORIZED ADDRESS>",
    "msgTypeUrl": "<AUTHORIZED MESSAGE TYPE URL>"
  }
}
```

If using one of the following authorized message type URLs, custom should be
`false`:

- `/cosmos.staking.v1beta1.MsgDelegate`
- `/cosmos.staking.v1beta1.MsgUndelegate`
- `/cosmos.staking.v1beta1.MsgBeginRedelegate`
- `/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward`

Otherwise, custom should be `true`.
