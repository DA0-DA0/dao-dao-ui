# @dao-dao/stateful

This package combines the `@dao-dao/stateless` and `@dao-dao/state` packages
into stateful components, hooks, and other systems. These are the live,
intelligent components that do fun stuff with data.

## Layout

| Location                                               | Summary                                                                                                                                                                                         |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`actions`](./actions)                                 | UI components that allow for the creation and viewing of Cosmos messages in a proposal.                                                                                                         |
| [`command`](./command)                                 | Interface that allows customizing command modal actions and contexts.                                                                                                                           |
| [`components`](./components)                           | Stateful React components that combine elements from the [`state` package](../state) and [`stateless` package](../stateless).                                                                   |
| [`hooks`](./hooks)                                     | Stateful React hooks that combine elements from the [`state` package](../state) and [`stateless` package](../stateless). Notably, contains hooks for interacting with on-chain smart contracts. |
| [`inbox`](./inbox)                                     | Inbox adapter system that supports various data sources for inbox items.                                                                                                                        |
| [`payroll`](./payroll)                                 | Payroll adapter system that supports various payroll systems that a DAO can enable.                                                                                                             |
| [`proposal-module-adapter`](./proposal-module-adapter) | Proposal module adapter system that allows dynamic support for proposal modules in the UI.                                                                                                      |
| [`recoil`](./recoil)                                   | [Recoil](https://recoiljs.org) atoms and selectors that require [`state`](../state) or other stateful information.                                                                              |
| [`server`](./server)                                   | Isolated functions only to be run on the server. Notably, contains main [Static Site Generation](https://nextjs.org/docs/basic-features/data-fetching/get-static-props) code.                   |
| [`utils`](./utils)                                     | Stateful utility functions.                                                                                                                                                                     |
| [`voting-module-adapter`](./voting-module-adapter)     | Voting module adapter system that allows dynamic support for voting modules in the UI.                                                                                                          |
| [`widgets`](./widgets)                                 | Widget adapter system that supports various adaptesr that a DAO can add to its home page.                                                                                                       |
