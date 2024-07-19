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

### dump-go-relayer

Dump the specified chain Polytone connection(s) in the format expected by the
Go relayer.

```sh
Usage: yarn dump-go-relayer [options]

dump Polytone relayer entries for one or multiple chains. passing no arguments will dump entries for all chains

Options:
  -a, --chain-a <string>  chain A
  -b, --chain-b <string>  chain B
  -m, --many <string>     comma-separated list of chains to dump
  -h, --help              display help for command
```

To dump the entries between two specific chains, specify both chains (with `-a`
and `-b`). To dump all entries for one or multiple chains, use either `-a`,
`-b`, or `-m`. To dump all entries for all chains, pass no arguments.

### dump-hermes-relayer

Dump the specified chain Polytone connection(s) in the format expected by the
Hermes relayer.

```sh
Usage: yarn dump-hermes-relayer [options]

dump Polytone relayer entries for one or multiple chains. passing no arguments will dump entries for all chains

Options:
  -a, --chain-a <string>  chain A
  -b, --chain-b <string>  chain B
  -m, --many <string>     comma-separated list of chains to dump
  -h, --help              display help for command
```

To dump the entries between two specific chains, specify both chains (with `-a`
and `-b`). To dump all entries for one or multiple chains, use either `-a`,
`-b`, or `-m`. To dump all entries for all chains, pass no arguments.
