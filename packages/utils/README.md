# @dao-dao/utils

A collection of simple utility functions used across packages.

## Scripts

### cwgen

Generate types, clients, and queries for CosmWasm contracts, modify them for use
with this codebase, and install them in the right places.

```sh
Usage: pnpm cwgen [options]

Options:
  -n, --name <name>  contract name
  -p, --path <path>  path to contract folder that contains "schema" folder
  -h, --help         display help for command
```

### log-code-ids

Get Code IDs for a chain in the format for a
[dao-contracts](https://github.com/DA0-DA0/dao-contracts/releases) tagged
release.

```sh
Usage: pnpm log-code-ids [options]

Options:
  -c, --chain-id <string>  chain ID
  -h, --help               display help for command
```

### dump-go-relayer

Dump the specified chain Polytone connection(s) in the format expected by the
Go relayer.

```sh
Usage: pnpm dump-go-relayer [options]

dump Polytone relayer entries for one or multiple chains. passing no arguments will dump entries for all chains

Options:
  -s, --src <string>   source chain(s)
  -d, --dest <string>  destination chain(s)
  -h, --help           display help for command
```

- To dump all entries for all chains, pass no arguments.
- To dump the entries out of a specific chain and into another, specify both
  chains (with `-s` and `-d`).
- To dump all entries coming out of a specific chain, specify the source chain
  with `-s` and no destination chain.
- To dump all entries going into a specific chain, specify the destination chain
  with `-d` and no source chain.

### dump-hermes-relayer

Dump the specified chain Polytone connection(s) in the format expected by the
Hermes relayer.

```sh
Usage: pnpm dump-hermes-relayer [options]

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

### verify-code-ids

Validate that versions and code IDs in the `codeIds.json` file are correct by
finding contracts that currently exist on-chain for each code ID and checking
their version info.

```sh
Usage: pnpm verify-code-ids
```

### verify-code-hashes

Validate that the code hashes in the `codeHashes.json` file are correct by
comparing with their on-chain hashes. This is only needed for Secret Network.

```sh
Usage: pnpm verify-code-hashes
```
