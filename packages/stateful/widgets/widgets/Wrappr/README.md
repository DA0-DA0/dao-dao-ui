# Wrappr

Legal wrappers for your digital assets.

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