# Instantiate

Instantiate a smart contract.

## Bulk import format

This is relevant when bulk importing actions, as described in [this
guide](https://github.com/DA0-DA0/dao-dao-ui/wiki/Bulk-importing-actions).

### Key

`instantiate`

### Data format

```json
{
  // Optional. If empty, the smart contract will have no admin and thus can
  // never be upgraded.
  "admin": "<ADMIN ADDRESS>",
  "codeId": <SMART CONTRACT CODE ID>,
  "label": "<SMART CONTRACT LABEL>",
  "message": "<SMART CONTRACT INSTANTIATION MESSAGE>",
  "funds": [
    // Optional. If not provided, no funds will be sent.
    {
      "denom": "<DENOM>",
      "amount": "<AMOUNT>"
    }
  ]
}
```
