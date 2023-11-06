# Wrappr

Legal wrappers for your digital assets.

## TODO:
- Render `WrapprPDF` based on `entity` & `jurisdiction`  \
*ref: https://github.com/kalidao/wrappr-ui/blob/main/src/minter/Confirm.tsx#L247*
- Format correct msg to mint Wrappr (cw721)
- use proper PDF's (Current PDF only specifies ETH Ricardian's)
- manage wrappr
- delete wrappr
- documentation

## Layout

| Location                   | Summary                                                 |
| -------------------------- | ------------------------------------------------------- |
| [actions](./actions)       | Actions to manage wrappr.                   |
| [components](./components) | React components used in both the actions and Renderer. |
| [Renderer](./Renderer)     | Component and state that renders the Widget.            |
| [index.ts](./index.ts)     | Widget definition.                                      |
| [state.ts](./state.ts)     | State for the press to retrieve posts.                  |
| [types.ts](./types.ts)     | Local adapter type definitions.                         |


## What is it?

This widget helps dao's interact with the [Wrappr.wtf](https://docs.wrappr.wtf/get-started/what/) contracts, via ibc calls to the contracts on evmos, or another evm compatible network.

A DAO's core contract may call the WrapprFactory contract, which will handle the instantiation of the Wrappr. 


## entity & jurisdiction types

- `una && wy `  Non-Profit
- `llc && de` Deleware LLC
- `llc && mi ` Marshall Island LLC