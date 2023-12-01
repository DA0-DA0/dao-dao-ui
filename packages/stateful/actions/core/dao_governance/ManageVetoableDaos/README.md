# ManageVetoableDaos

Enable or disable showing vetoable proposals on this DAO's home page from a DAO
that this DAO has the power to veto.

## Bulk import format

This is relevant when bulk importing actions, as described in [this
guide](https://github.com/DA0-DA0/dao-dao-ui/wiki/Bulk-importing-actions).

### Key

`manageVetoer`

### Data format

```json
{
  "chainId": "<CHAIN ID">,
  "address": "<DAO ADDRESS>",
  "enable": <true | false>
}
```
