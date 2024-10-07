# ManageVesting

Begin or cancel a vesting payment, or register a slash for an existing payment.

## Bulk import format

This is relevant when bulk importing actions, as described in [this
guide](https://github.com/DA0-DA0/dao-dao-ui/wiki/Bulk-importing-actions).

### Key

`manageVesting`

### Data format

```json
{
  "mode": "<begin | cancel | registerSlash>",
  "begin": {
    "chainId": "<CHAIN ID>",
    "amount": "<AMOUNT>",
    "type": "<native | cw20>",
    "denomOrAddress": "<NATIVE DENOM OR CW20 ADDRESS>",
    "recipient": "<RECIPIENT ADDRESS>",
    "title": "<TITLE>",
    // Optional.
    "description": "<DESCRIPTION>",
    "startDate": "<START DATE>",
    "ownerMode": "<none | me | other | many>",
    "otherOwner": "<ADDRESS>",
    "manyOwners": [
      { "address": "<ADDRESS>" },
      ...
    ],
    "manyOwnersCw1WhitelistContract": "<MANY OWNER CW1-WHITELIST ADDRESS>",
    "steps": [
      {
        "percent": <PERCENT>,
        "delay": {
          "value": <DURATION VALUE>,
          "units": "<seconds | minutes | hours | days | weeks | months | years>"
        }
      },
      ...
    ]
  },
  "cancel": {
    "chainId": "<CHAIN ID>",
    "address": "<VESTING PAYMENT ADDRESS>"
  },
  "registerSlash": {
    "chainId": "<CHAIN ID>",
    "address": "<VESTING PAYMENT ADDRESS>",
    "valiator": "<VALIDATOR ADDRESS>",
    "time": "<TIME OF SLASH>",
    "amount": "<AMOUNT SLASHED>",
    "duringUnboding": <true | false>
  }
}
```

`denomOrAddress` should be either a native/IBC token denomination (e.g.
`ujuno`), or a CW20 token contract address.

Only the corresponding field is required for each mode. For example, if you want
to begin a vesting payment, then only `begin` is required, and `cancel` and
`registerSlash` can be omitted.
