# AuthzExec

Execute a message on an account that has authorized the executor to act behalf
of its account via authz.

## Bulk import format

This is relevant when bulk importing actions, as described in [this
guide](https://github.com/DA0-DA0/dao-dao-ui/wiki/Bulk-importing-actions).

### Key

`authzExec`

### Data format

```json
{
  "authzExecActionType": "<AUTHORIZED MESSAGE TYPE URL>",
  "delegate": {
    "amount": {
      "denom": "<DENOM>",
      "amount": "<AMOUNT>"
    },
    "delegatorAddress": "<DELEGATOR ADDRESS>",
    "validatorAddress": "<VALIDATOR ADDRESS>"
  },
  "undelegate": {
    "amount": {
      "denom": "<DENOM>",
      "amount": "<AMOUNT>"
    },
    "delegatorAddress": "<DELEGATOR ADDRESS>",
    "validatorAddress": "<VALIDATOR ADDRESS>"
  },
  "redelegate": {
    "delegatorAddress": "<DELEGATOR ADDRESS>",
    "validatorSrcAddress": "<VALIDATOR SRC ADDRESS>",
    "validatorDstAddress": "<VALIDATOR DST ADDRESS>",
    "amount": {
      "denom": "<DENOM>",
      "amount": "<AMOUNT>"
    }
  },
  "claimRewards": {
    "delegatorAddress": "<DELEGATOR ADDRESS>",
    "validatorAddress": "<VALIDATOR ADDRESS>"
  },
  "custom": "<ARRAY OF CUSTOM MESSAGES>"
}
```

`authzExecActionType` can be one of the following authorized message type URLs:

- `/cosmos.staking.v1beta1.MsgDelegate`
- `/cosmos.staking.v1beta1.MsgUndelegate`
- `/cosmos.staking.v1beta1.MsgBeginRedelegate`
- `/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward`
- `custom`

Based on the selection, only the corresponding object needs to be filled in. For
example, if you wanted to execute a delegate action, all you would need to
include is:

```json
{
  "authzExecActionType": "/cosmos.staking.v1beta1.MsgDelegate",
  "delegate": {
    "amount": {
      "denom": "<DENOM>",
      "amount": "<AMOUNT>"
    },
    "delegatorAddress": "<DELEGATOR ADDRESS>",
    "validatorAddress": "<VALIDATOR ADDRESS>"
  }
}
```
