# MintNft

Mint an NFT in a collection owned by the current account.

## Bulk import format

This is relevant when bulk importing actions, as described in [this
guide](https://github.com/DA0-DA0/dao-dao-ui/wiki/Bulk-importing-actions).

### Key

`mintNft`

### Data format

```json
{
  "contractChosen": true,
  "collectionAddress": "<NFT COLLECTION ADDRESS>",
  "mintMsg": {
    "owner": "<RECIPIENT ADDRESS>",
    "token_id": "<UNIQUE TOKEN ID>",
    // Optional. If not provided, the NFT will have no data associated with it,
    // which means no image.
    "token_uri": "<JSON METADATA URL>"
  }
}
```
