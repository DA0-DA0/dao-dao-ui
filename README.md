## DAO DAO UI

This project creates a web UI for the [DAO DAO smart
contracts](https://github.com/DA0-DA0/dao-contracts), enabling users to:

- create a governance token-based DAO, membership-based DAO (multisig), or other
  type of DAO.
- create and vote on proposals.
- view the treasury and manage it democratically.

All without having to code!

You can find more info in our [documentation](https://docs.daodao.zone). Join
the [DAO DAO Discord](https://discord.gg/sAaGuyW3D2) if you're interested in
becoming a contributor.

## Development

### Clone this repo and install dependencies

```bash
git clone https://github.com/DA0-DA0/dao-dao-ui
cd dao-dao-ui
yarn
```

If you're here to work on UI components in isolation, you will likely want to
run the [Storybook](https://storybook.js.org/) server to mock up components and
iterate quickly without having to access live chain data. Check out the
[storybook package README](./packages/storybook) for usage
instructions.

To start the Storybook server, run this command from the root of this monorepo:

```bash
yarn storybook start
```

If you're here to work on any other part of the app, likely accessing live chain
data, run the `yarn dev` script (equivalent to running `yarn dev` from the
[`./apps/dapp`](./apps/dapp) package) to run the main app in development mode.

```bash
yarn dev
```

If something is misconfigured, check out the docs for
[Turborepo](https://turborepo.org/docs), the monorepo build system we use.

## Packages

#### `/apps`

| App                   | Summary                                                          |
| --------------------- | ---------------------------------------------------------------- |
| [`dapp`](./apps/dapp) | DAO DAO UI hosted at [https://daodao.zone](https://daodao.zone). |

#### `/packages`

| Package                             | Summary                                                                                               |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------- |
| [`config`](./packages/config)       | Configurations for various dev tools.                                                                 |
| [`i18n`](./packages/i18n)           | Internationalization/translation system.                                                              |
| [`state`](./packages/state)         | State retrieval and management for the DAO DAO UI.                                                    |
| [`stateful`](./packages/stateful)   | Stateful components, hooks, and systems that access and manipulate live data.                         |
| [`stateless`](./packages/stateless) | React components, React hooks, and other stateless rendering utilities which do not access live data. |
| [`storybook`](./packages/storybook) | [Storybook](https://storybook.js.org/) server configuration and story decorators.                     |
| [`types`](./packages/types)         | Types used across packages.                                                                           |
| [`utils`](./packages/utils)         | Utility functions used across packages.                                                               |

## Contributing

Interested in contributing to DAO DAO? Check out
[CONTRIBUTING.md](./CONTRIBUTING.md).

## Disclaimer

DAO DAO TOOLING IS PROVIDED “AS IS”, AT YOUR OWN RISK, AND WITHOUT WARRANTIES OF
ANY KIND. No developer or entity involved in creating the DAO DAO UI or smart
contracts will be liable for any claims or damages whatsoever associated with
your use, inability to use, or your interaction with other users of DAO DAO
tooling, including any direct, indirect, incidental, special, exemplary,
punitive or consequential damages, or loss of profits, cryptocurrencies, tokens,
or anything else of value.
