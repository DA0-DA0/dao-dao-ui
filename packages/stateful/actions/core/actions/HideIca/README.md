# HideIca

Hide an existing Interchain Account (ICA) from the treasury. This is different
from our native cross-chain account implementation that uses Polytone. ICA is
not recommended if a native Polytone cross-chain account is available.

## Bulk import format

This is relevant when bulk importing actions, as described in [this
guide](https://github.com/DA0-DA0/dao-dao-ui/wiki/Bulk-importing-actions).

### Key

`hideIca`

### Data format

```json
{
  "chainId": "<CHAIN ID">
}
```
