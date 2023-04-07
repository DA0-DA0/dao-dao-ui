# ManageSubDaos

Recognize or remove SubDAOs from the DAO's list of recognized SubDAOs.

## Bulk import format

This is relevant when bulk importing actions, as described in [this
guide](https://github.com/DA0-DA0/dao-dao-ui/wiki/Bulk-importing-actions).

### Key

`manageSubDaos`

### Data format

```json
{
  "toAdd": [
    {
      "addr": "<SUBDAO ADDRESS TO ADD>"
    }
    // More SubDAOs can be added here.
  ],
  "toRemove": [
    "<SUBDAO ADDRESS TO REMOVE>"
    // More SubDAOs can be added here.
  ]
}
```

Each field can be omitted or an empty array, but at least one of them must be
present.
