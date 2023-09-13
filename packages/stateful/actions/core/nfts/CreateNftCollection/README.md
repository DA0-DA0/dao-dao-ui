# CreateNftCollection

Create a new NFT collection.

## Bulk import format

This is relevant when bulk importing actions, as described in [this
guide](https://github.com/DA0-DA0/dao-dao-ui/wiki/Bulk-importing-actions).

### Key

`createNftCollection`

### Data format

```json
{
  "chainId": "<CHAIN ID>",
  "name": "<NAME>",
  "symbol": "<SYMBOL>",
  "collectionInfo": {
    "type": <"base" | "vending">,
    "description": "<DESCRIPTION>",
    "explicitContent": true | false,
    "externalLink": <"LINK" | undefined>,
    "image": "<IMAGE">,
    "royalties": "<ROYALTY IN PERCENT>",
    "startTradingDate": "<MM/DD/YY HH:mm>"
  }
}
```

`collectionInfo` is only relevant when `chainId` is `stargaze-1` (Stargaze
mainnet) or `elgafar-1` (Stargaze testnet). All other chains only need `name`
and `symbol`.
