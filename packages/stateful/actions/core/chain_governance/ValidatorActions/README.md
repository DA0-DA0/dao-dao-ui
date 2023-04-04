# ValidatorActions

Perform an action on a validator managed by this account.

## Bulk import format

This is relevant when bulk importing actions, as described in [this
guide](https://github.com/DA0-DA0/dao-dao-ui/wiki/Bulk-importing-actions).

### Key

`validatorActions`

### Data format

```json
{
  "validatorActionType": "<VALIDATOR ACTION TYPE>",
  "createMsg": "\"{
    \"description\": {
      \"moniker\": \"<validator name>\",
      \"identity\": \"<optional identity signature (ex. UPort or Keybase)>\",
      \"website\": \"<your validator website>\",
      \"securityContact\": \"<optional security contact email>\",
      \"details\": \"<description of your validator>\"
    },
    \"commission\": {
      \"rate\": \"50000000000000000\",
      \"maxRate\": \"200000000000000000\",
      \"maxChangeRate\": \"100000000000000000\"
    },
    \"minSelfDelegation\": \"1\",
    \"delegatorAddress\": \"<CURRENT ACCOUNT ADDRESS>\",
    \"validatorAddress\": \"<VALIDATOR ADDRESS>\",
    \"pubkey\": {
      \"typeUrl\": \"/cosmos.crypto.ed25519.PubKey\",
      \"value\": {
        \"key\": \"<the base64 public key of your node (junod tendermint show-validator)>\"
      }
    },
    \"value\": {
      \"denom\": \"<DENOM>\",
      \"amount\": \"<INITIAL SELF DELEGATION>\"
    }
  }\"",
  "editMsg": "\"{
    \"description\": {
      \"moniker\": \"<validator name>\",
      \"identity\": \"<optional identity signature (ex. UPort or Keybase)>\",
      \"website\": \"<your validator website>\",
      \"securityContact\": \"<optional security contact email>\",
      \"details\": \"<description of your validator>\"
    },
    \"commissionRate\": \"50000000000000000\",
    \"minSelfDelegation\": \"1\",
    \"validatorAddress\": \"<VALIDATOR ADDRESS>\"
  }\"",
}
```

`validatorActionType` can be one of the following:

- `/cosmos.staking.v1beta1.MsgCreateValidator`
- `/cosmos.staking.v1beta1.MsgEditValidator`
- `/cosmos.slashing.v1beta1.MsgUnjail`
- `/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission`

If `validatorActionType` is `/cosmos.staking.v1beta1.MsgCreateValidator`, the
`createMsg` field must be set. If `validatorActionType` is
`/cosmos.staking.v1beta1.MsgEditValidator`, the `editMsg` field must be set. If
using either of the other two types, the `createMsg` and `editMsg` fields are
unnecessary.
