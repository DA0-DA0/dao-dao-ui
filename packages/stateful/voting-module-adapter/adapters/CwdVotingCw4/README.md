# CwdVotingCw4

This is the voting module adapter for the
[`cwd-voting-cw4`](https://github.com/DA0-DA0/dao-contracts/tree/main/contracts/voting/cwd-voting-cw4)
contract, which determines DAO voting power based on the weight according to a
[cw4-group](https://docs.cosmwasm.com/cw-plus/0.9.0/cw4/cw4-group-spec)
contract. This represents the membership-based DAO structure, where members are
added, modified, and removed via DAO governance. This is also known as a
**multisig**.

## Layout

| Location                     | Summary                                                                           |
| ---------------------------- | --------------------------------------------------------------------------------- |
| [actions](./actions)         | Actions to display in the DAO during proposal creation.                           |
| [components](./components)   | React components.                                                                 |
| [daoCreation](./daoCreation) | Components and functions relating to the DAO creation flow adapter configuration. |
| [hooks](./hooks)             | React hooks.                                                                      |
| [index.tsx](./index.tsx)     | Adapter definition.                                                               |
| [types.ts](./types.ts)       | Types local to this adapter.                                                      |
