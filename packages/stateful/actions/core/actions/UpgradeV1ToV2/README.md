# UpgradeV1ToV2

Recognize or remove SubDAOs from the DAO's list of recognized SubDAOs.

## Bulk import format

This is relevant when bulk importing actions, as described in [this
guide](https://github.com/DA0-DA0/dao-dao-ui/wiki/Bulk-importing-actions).

### Key

`upgradeV1ToV2`

### Data format

```json
{
  "targetAddress": "<DAO ADDRESS>",
  "subDaos": [
    {
      "addr": "<SUBDAO ADDRESS 1>"
    }
    // More SubDAOs can be added here.
  ]
}
```

The target address can be the current DAO or a SubDAO, as a SubDAO needs its
parent DAO to upgrade it. SubDAOs can be an empty array if there are none to
recognize during the upgrade.
