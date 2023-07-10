# GovernanceProposal

Submit a chain governance proposal.

## Bulk import format

This is relevant when bulk importing actions, as described in [this
guide](https://github.com/DA0-DA0/dao-dao-ui/wiki/Bulk-importing-actions).

### Key

`governanceProposal`

### Data format

```json
{
  "type": "<TYPE>",
  "title": "<TITLE>",
  "description": "<DESCRIPTION>",
  "initialDeposit": [
    {
      "denom": "<DENOM>",
      "amount": "<AMOUNT>"
    },
    ...
  ]
}
```

`type` is one of:

- `/cosmos.gov.v1beta1.TextProposal`
- `/cosmos.distribution.v1beta1.CommunityPoolSpendProposal`
- `/cosmos.params.v1beta1.ParameterChangeProposal`
- `/cosmos.upgrade.v1beta1.SoftwareUpgradeProposal`
- `/cosmos.upgrade.v1beta1.CancelSoftwareUpgradeProposal`
