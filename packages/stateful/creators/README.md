# @dao-dao/stateful/creators

Author: [@NoahSaso](https://github.com/NoahSaso)

## Creators

| Creator                                       | Summary                                                              |
| --------------------------------------------- | -------------------------------------------------------------------- |
| [MembershipBased](./creators/MembershipBased) | Create a DAO that votes on membership voting power, like a multisig. |
| [NftBased](./creators/NftBased)               | Create a DAO that uses NFTs to represent voting power.               |
| [TokenBased](./creators/TokenBased)           | Create a DAO that uses tokens to represent voting power.             |

## Layout

| Location               | Summary                                                                                                                         |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| [creators](./creators) | Creators.                                                                                                                       |
| [react](./react)       | The external React interface used by apps and packages when using this creator system. This uses the core logic under the hood. |
| [core.ts](./core.ts)   | The core logic that matches and loads a creator from the available creators.                                                    |

## What is it?

This is a creator adapter package. It creates a common interface to setup
creation flows for DAOs.
