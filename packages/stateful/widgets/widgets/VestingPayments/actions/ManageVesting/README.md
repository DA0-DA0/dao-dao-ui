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
    "amount": <AMOUNT>,
    "denomOrAddress": "<NATIVE DENOM OR CW20 ADDRESS>",
    "recipient": "<RECIPIENT ADDRESS>",
    "title": "<TITLE>",
    // Optional.
    "description": "<DESCRIPTION>",
    "startDate": "<START DATE>",
    "duration": {
      "value": <DURATION VALUE>,
      "unit": "<seconds | minutes | hours | days | weeks | months | years>"
    }
  },
  "cancel": {
    "address": "<VESTING PAYMENT ADDRESS>"
  },
  "registerSlash": {
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
