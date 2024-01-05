# UploadCode

Upload a smart contract wasm.

## Bulk import format

This is relevant when bulk importing actions, as described in [this
guide](https://github.com/DA0-DA0/dao-dao-ui/wiki/Bulk-importing-actions).

### Key

`uploadCode`

### Data format

```json
{
  "chainId": "<CHAIN ID>",
  "data": "<BASE64 WASM DATA>"
}
```
