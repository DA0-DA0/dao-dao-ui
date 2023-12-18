# IcaExecute

Execute messages from an ICA account.

## Bulk import format

This is relevant when bulk importing actions, as described in [this
guide](https://github.com/DA0-DA0/dao-dao-ui/wiki/Bulk-importing-actions).

### Key

`icaExecute`

### Data format

```json
{
  "chainId": "<CHAIN ID>",
  "_actionData": [
    // ACTIONS
  ]
}
```

Each action in `_actionData` should be formatted similar to how bulk actions are
formatted, with `key` and `data` fields, except `key` should be replaced with
`actionKey`. Thus, each object in `_actionData` should be an object with
`actionKey` and `data`, formatted the same as the `actions` array in the bulk
JSON format.
