# ManageCw20

Add or remove a token from appearing in the Treasury tab.

## Bulk import format

This is relevant when bulk importing actions, as described in [this
guide](https://github.com/DA0-DA0/dao-dao-ui/wiki/Bulk-importing-actions).

### Key

`manageCw20`

### Data format

```json
{
  "adding": <true | false>,
  "address": "<CW20 TOKEN ADDRESS>"
}
```
