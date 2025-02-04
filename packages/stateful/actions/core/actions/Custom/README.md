# Custom

Execute any Cosmos message.

## Bulk import format

This is relevant when bulk importing actions, as described in [this
guide](https://github.com/DA0-DA0/dao-dao-ui/wiki/Bulk-importing-actions).

### Key

`custom`

### Data format

```json
{
  "message": "<COSMOS MESSAGE>",
  "amino": <BOOLEAN>
}
```

If `amino` is true, the message will be decoded from Amino and encoded into
Stargate. Otherwise, it will be encoded into Stargate directly.
