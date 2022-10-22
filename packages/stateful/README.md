# @dao-dao/stateful

This package combines the `@dao-dao/stateless` and `@dao-dao/state` packages
into stateful components, hooks, and other systems. These are the live,
intelligent components that do fun stuff with data.

Systems included in their own subfolders:

- [`actions`](./actions): UI components that allow for the creation and viewing
  of Cosmos messages in a proposal.
- [`command`](./command): Interface that allows customizing command modal
  actions and contexts.
- [`proposal-module-adapter`](./proposal-module-adapter): Proposal module
  adapter system that allows dynamic support for proposal modules in the UI.
- [`voting-module-adapter`](./voting-module-adapter): Voting module
  adapter system that allows dynamic support for voting modules in the UI.
