# FeeShare

Earn gas fees from a contract.

## Bulk import format

This is relevant when bulk importing actions, as described in [this
guide](https://github.com/DA0-DA0/dao-dao-ui/wiki/Bulk-importing-actions).

### Key

`feeShare`

### Data format

```json
{
  "typeUrl": "<FEE SHARE TYPE URL>",
  "contract": "<SMART CONTRACT ADDRESS>",
  "showWithdrawer": <true | false>,
  "withdrawer": "<CUSTOM WITHDRAWER ADDRESS>",
}
```

`typeUrl` can be one of the following:

- `/juno.feeshare.v1.MsgRegisterFeeShare` — when registering a new fee share
- `/juno.feeshare.v1.MsgUpdateFeeShare` — when updating an existing fee share

If `showWithdrawer` is `false`, the current account (DAO or wallet using the
action) is the default withdrawer. If `true`, the `withdrawer` field will be
used instead.
