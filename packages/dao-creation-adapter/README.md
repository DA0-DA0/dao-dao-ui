# @dao-dao/dao-creation-adapter

Author: [@NoahSaso](https://github.com/NoahSaso)

## What is it?

This is an adapter package, like the voting and proposal module adapter
packages, which creates a common interface for the DAO creation flow. Creating
an adapter here allows for the easy instantiation of a given DAO structure, such
as token-based, NFT-based, and membership-based (multisig style).

## Why is this necessary?

As more DAO structure presets are created, the code gets more complex and less
readable, with random conditional checks for various defaults, component
rendering, and more options that differ by structure. Creating a self-contained
interface to manage this is the best way to organize different structures, since
some may have vastly different customization options from others. This will make
it easier to take advantage of new voting modules, since a DAO structure tends
to be tied to a given voting module.
