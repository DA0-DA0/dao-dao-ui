# @dao-dao/stateful/creators

Author: [@NoahSaso](https://github.com/NoahSaso)

## What is it?

This is a creator adapter package. It creates a common interface to setup
creation flows for DAOs.

## Creators

| Creator                              | Summary                                                              |
| ------------------------------------ | -------------------------------------------------------------------- |
| [MembershipBased](./MembershipBased) | Create a DAO that votes on membership voting power, like a multisig. |
| [NftBased](./NftBased)               | Create a DAO that uses NFTs to represent voting power.               |
| [TokenBased](./TokenBased)           | Create a DAO that uses tokens to represent voting power.             |

## Layout

| Location             | Summary                                                                      |
| -------------------- | ---------------------------------------------------------------------------- |
| [core.ts](./core.ts) | The core logic that matches and loads a creator from the available creators. |
