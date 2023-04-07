# UpdateInfo

Update the name, description, image, and some other config for the DAO.

## Bulk import format

This is relevant when bulk importing actions, as described in [this
guide](https://github.com/DA0-DA0/dao-dao-ui/wiki/Bulk-importing-actions).

### Key

`updateInfo`

### Data format

```json
{
  "name": "<NAME>",
  "description": "<DESCRIPTION>",
  // Optional. If unset, will be removed.
  "image_url": "<IMAGE URL>",
  "automatically_add_cw20s": <true | false>,
  "automatically_add_cw721s": <true | false>,
  // Only on v2 and above. Optional. If unset, will be removed.
  "dao_uri": "<DAO URI>",
}
```
