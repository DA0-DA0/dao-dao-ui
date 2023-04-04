# ManageMembers

Add, update, and remove members from the DAO.

## Bulk import format

This is relevant when bulk importing actions, as described in [this
guide](https://github.com/DA0-DA0/dao-dao-ui/wiki/Bulk-importing-actions).

### Key

`manageMembers`

### Data format

```json
{
  "toAdd": [
    {
      "addr": "<ADDRESS TO ADD>",
      "weight": <VOTING WEIGHT>
    },
    // More members can be added here.
  ],
  "toRemove": [
    {
      "addr": "<ADDRESS TO REMOVE>"
    },
    // More members can be added here.
  ]
}
```

Each field can be omitted or an empty array, but at least one of them must be
present.

Voting weight is relative to all other voting weights. This is _not_ the exact
voting percentage they have in the DAO. View current member voting weights on
the DAO's Members tab.
