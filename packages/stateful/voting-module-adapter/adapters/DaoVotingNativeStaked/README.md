# DaoVotingNativeStaked

This is the voting module adapter for the
[`dao-voting-native-staked`](https://github.com/DA0-DA0/dao-contracts/tree/main/contracts/voting/dao-voting-native-staked)
contract, which determines DAO voting power based on the staked balance of its
chosen native token (IBC or otherwise), such as `JUNO`. This is an alternative
to the [CW20](https://docs.cosmwasm.com/cw-plus/0.9.0/cw20/spec) governance
token-based DAO structure, where members are still free to exchange their
unstaked tokens with other parties at any time. However, it uses a native token
instead of a [CW20](https://docs.cosmwasm.com/cw-plus/0.9.0/cw20/spec) token.

## Layout

| Location                   | Summary             |
| -------------------------- | ------------------- |
| [components](./components) | React components.   |
| [hooks](./hooks)           | React hooks.        |
| [index.tsx](./index.tsx)   | Adapter definition. |
