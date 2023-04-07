# TransferNft

Send an NFT owned by the current account.

## Bulk import format

This is relevant when bulk importing actions, as described in [this
guide](https://github.com/DA0-DA0/dao-dao-ui/wiki/Bulk-importing-actions).

### Key

`transferNft`

### Data format

```json
{
  "collection": "<NFT COLLECTION ADDRESS>",
  "tokenId": "<NFT TOKEN ID>",
  "recipient": "<RECIPIENT ADDRESS>",

  "executeSmartContract": <true | false>,
  "smartContractMsg": "<SMART CONTRACT MESSAGE>"
}
```

`executeSmartContract` is optional and defaults to `false`. If it is `true`, the
recipient should be a smart contract and `smartContractMsg` is required. The
`smartContractMsg` field should be a JSON string that is the message to execute
on the recipient contract upon receiving the NFT.

If you don't know what that means, or you just want to send the NFT to a wallet,
then you can omit those last two fields.
