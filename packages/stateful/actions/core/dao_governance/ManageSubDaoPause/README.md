# ManageSubDaoPause

Pause or unpause a Neutron SubDAO.

## Bulk import format

This is relevant when bulk importing actions, as described in [this
guide](https://github.com/DA0-DA0/dao-dao-ui/wiki/Bulk-importing-actions).

### Key

`manageSubDaoPause`

### Data format

```json
{
  "address": "<SUBDAO ADDRESS>",
  "pausing": <true | false>,
  "blocks": "<NUMBER OF BLOCKS TO PAUSE FOR>"
}
```
