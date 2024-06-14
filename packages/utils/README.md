# @dao-dao/utils

A collection of simple utility functions used across packages.

## Scripts

### log-code-ids

Get Code IDs for a chain in the format for a
[dao-contracts](https://github.com/DA0-DA0/dao-contracts/releases) tagged
release.

```sh
Usage: yarn log-code-ids [options]

Options:
  -c, --chain-id <string>  chain ID
  -h, --help               display help for command
```

### dump-relayer

Dump the specified chain Polytone connection(s) in the format expected by the
Hermes relayer.

```sh
Usage: yarn dump-relayer [options]

Options:
  -a, --chain-a <string>  chain A
  -b, --chain-b <string>  chain B
  -h, --help              display help for command
```

To dump the entries between two specific chains, specify both chains. To dump
all entries for a single chain, only specify one.
