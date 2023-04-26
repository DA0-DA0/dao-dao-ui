# PolytoneExec

Execute Cosmos messages on another chain.

## Bulk import format

This is relevant when bulk importing actions, as described in [this
guide](https://github.com/DA0-DA0/dao-dao-ui/wiki/Bulk-importing-actions).

### Key

`polytoneExec`

### Data format

```json
{
  "chainId": "<CHAIN ID>",
  "msgs": [
    // Cosmos messages (supported by CosmWasm) to execute on the other chain.
  ]
}
```
