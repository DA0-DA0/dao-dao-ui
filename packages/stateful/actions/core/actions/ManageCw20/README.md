# ManageCw20

Add or remove a token from appearing in the Treasury tab.

## Bulk import format

This is relevant when bulk importing actions, as described in [this
guide](https://github.com/DA0-DA0/dao-dao-ui/wiki/Bulk-importing-actions).

### Key

`manageCw20`

### Data format

```json
{
  "chainId": "<CHAIN ID>",
  "adding": <true | false>,
  "address": "<CW20 TOKEN ADDRESS>"
}
```

`chainId` corresponds to which chain the cw20 exists on. This is only relevant
when the DAO has created cross-chain accounts that have received cw20s.
Otherwise it should just be the chain the DAO lives on.
