# Migrate

Migrate a smart contract to a new code ID.

## Bulk import format

This is relevant when bulk importing actions, as described in [this
guide](https://github.com/DA0-DA0/dao-dao-ui/wiki/Bulk-importing-actions).

### Key

`migrate`

### Data format

```json
{
  "contract": "<SMART CONTRACT ADDRESS>",
  "codeId": <NEW SMART CONTRACT CODE ID>,
  "msg": "<SMART CONTRACT MIGRATION MESSAGE>",
}
```
