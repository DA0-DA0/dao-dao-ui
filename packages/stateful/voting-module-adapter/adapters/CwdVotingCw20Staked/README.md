# CwdVotingCw20Staked

This is the voting module adapter for the
[`cwd-voting-cw20-staked`](https://github.com/DA0-DA0/dao-contracts/tree/main/contracts/voting/cwd-voting-cw20-staked)
contract, which determines DAO voting power based on the staked balance of its
chosen [CW20](https://docs.cosmwasm.com/cw-plus/0.9.0/cw20/spec) token. This
represents the CW20 governance token-based DAO structure, where members are free
to exchange their unstaked tokens with other parties at any time.

## Layout

| Location                     | Summary                                                                           |
| ---------------------------- | --------------------------------------------------------------------------------- |
| [actions](./actions)         | Actions to display in the DAO during proposal creation.                           |
| [components](./components)   | React components.                                                                 |
| [daoCreation](./daoCreation) | Components and functions relating to the DAO creation flow adapter configuration. |
| [hooks](./hooks)             | React hooks.                                                                      |
| [index.tsx](./index.tsx)     | Adapter definition.                                                               |
| [types.ts](./types.ts)       | Types local to this adapter.                                                      |
