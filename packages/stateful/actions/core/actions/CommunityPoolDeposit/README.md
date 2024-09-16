# CommunityPoolDeposit

Deposit native tokens into the community pool.

## Bulk import format

This is relevant when bulk importing actions, as described in [this
guide](https://github.com/DA0-DA0/dao-dao-ui/wiki/Bulk-importing-actions).

### Key

`communityPoolDeposit`

### Data format

```json
{
  "chainId": "<CHAIN ID>",
  "amount": "<AMOUNT>",
  "denom": "<DENOM>"
}
```

If used in a DAO, `chainId` determines which account has the tokens being sent
and to which chain's community pool they are being sent, which can be the native
chain or any supported Polytone chain.
