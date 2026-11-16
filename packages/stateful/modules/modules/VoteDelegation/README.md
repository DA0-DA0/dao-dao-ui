# Vote Delegation

This is the vote delegation module for the [dao-vote-delegation
contract](https://github.com/DA0-DA0/dao-contracts/tree/main/contracts/delegation/dao-vote-delegation).

## Layout

| Location                   | Summary                                                 |
| -------------------------- | ------------------------------------------------------- |
| [actions](./actions)       | Actions to manage vote delegation.                      |
| [components](./components) | React components used in both the actions and Renderer. |
| [Renderer](./Renderer)     | Component and state that renders the module.            |
| [index.ts](./index.ts)     | Module definition.                                      |
| [types.ts](./types.ts)     | Local module type definitions.                          |

## Voting module support

Vote delegation registers the delegation contract as a voting power change hook
on the DAO's voting module, so it requires a voting module whose
`supportsHooks` is true. For voting modules without hook support (such as
`dao-voting-native-staked`), the editor shows an explanation and encoding fails
with the same translated error, telling the DAO to migrate to
`dao-voting-token-staked` first.
