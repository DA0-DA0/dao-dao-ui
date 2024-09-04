# GovernanceVote

Vote in a chain governance proposal.

## Bulk import format

This is relevant when bulk importing actions, as described in [this
guide](https://github.com/DA0-DA0/dao-dao-ui/wiki/Bulk-importing-actions).

### Key

`governanceVote`

### Data format

```json
{
  "proposalId": "<PROPOSAL ID>",
  "vote": <VOTE>
}
```

`vote` is a number:

- `1` for `Yes`
- `2` for `Abstain`
- `3` for `No`
- `4` for `NoWithVeto`
