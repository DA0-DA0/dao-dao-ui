# DaoVotingNativeStaked

This is the voting module adapter for the
[`dao-voting-token-staked`](https://github.com/DA0-DA0/dao-contracts/tree/95e4f73a170705deeb3689341c51f3a3b126e3e9/contracts/voting/dao-voting-token-staked)
contract, which determines DAO voting power based on the staked balance of a
native token (IBC, factory, or otherwise), such as `JUNO` or
`factory/junoContract/subdenom`. This is an alternative to the
[CW20](https://docs.cosmwasm.com/cw-plus/0.9.0/cw20/spec) governance token-based
DAO structure, where members are still free to exchange their unstaked tokens
with other parties at any time. However, it uses a native token instead of a
[CW20](https://docs.cosmwasm.com/cw-plus/0.9.0/cw20/spec) token.

## Layout

| Location                   | Summary             |
| -------------------------- | ------------------- |
| [components](./components) | React components.   |
| [hooks](./hooks)           | React hooks.        |
| [index.tsx](./index.tsx)   | Adapter definition. |
