# Sudo

Execute a Sudo message on a contract (only admin can do this).

## Bulk import format

This is relevant when bulk importing actions, as described in [this
guide](https://github.com/DA0-DA0/dao-dao-ui/wiki/Bulk-importing-actions).

### Key

`sudo`

### Data format

```json
{
  "chainId": "<CHAIN ID>",
  "contract": "<SMART CONTRACT ADDRESS>",
  "msg": "<SMART CONTRACT MIGRATION MESSAGE>"
}
```
