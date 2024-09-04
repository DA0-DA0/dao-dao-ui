# ManageCw721

Add or remove an NFT collection from appearing in the Treasury NFTs tab.

## Bulk import format

This is relevant when bulk importing actions, as described in [this
guide](https://github.com/DA0-DA0/dao-dao-ui/wiki/Bulk-importing-actions).

### Key

`manageCw721`

### Data format

```json
{
  "chainId": "<CHAIN ID>",
  "adding": <true | false>,
  "address": "<NFT COLLECTION ADDRESS>"
}
```

`chainId` corresponds to which chain the NFT exists on. This is only relevant
when the DAO has created cross-chain accounts that have received NFTs. Otherwise
it should just be the chain the DAO lives on.
