# GovernanceDeposit

Deposit to a chain governance proposal.

## Bulk import format

This is relevant when bulk importing actions, as described in [this
guide](https://github.com/DA0-DA0/dao-dao-ui/wiki/Bulk-importing-actions).

### Key

`governanceDeposit`

### Data format

```json
{
  "proposalId": "<PROPOSAL ID>",
  "deposit": [
    {
      "denom": "<DENOM>",
      "amount": "<AMOUNT>"
    }
  ]
}
```
