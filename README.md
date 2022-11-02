## DAO DAO UI

This project creates a web UI around the [DAO DAO V1 smart contracts](https://github.com/DA0-DA0/dao-contracts). Enabling users to:

- Create a governance token based DAO or multisig
- View proposals and treasury info
- Easily create proposals
- Vote on proposals

All without having to code!

You can find more info in our [documentation](https://docs.daodao.zone). Join the [DAO DAO Discord](https://discord.gg/sAaGuyW3D2) if you're interested in becoming a contributor.

## Development

### Clone this repo and install dependencies

```bash
git clone https://github.com/DA0-DA0/dao-dao-ui
cd dao-dao-ui
yarn
```

If you're here to work on UI components in isolation:

```bash
yarn storybook start
```

If you're here to work on app-wide stuff, run the `yarn dev` script (equivalent to running `yarn dev` from the `apps/dapp` folder) to run the main app in development mode.

```bash
yarn dev
```

Learn more about [Turborepo](https://turborepo.org/docs).

## Packages

#### `apps/`

- [`dapp`](./apps/dapp/README.md)

#### `packages/`

- [(wip)](https://github.com/DA0-DA0/dao-dao-ui/issues/368)

### Learn More

This project was bootstrapped with [`npx create-turbo@latest`](https://turborepo.org/docs/getting-started).

## Contributing

Interested in contributing to DAO DAO? Check out [CONTRIBUTING.md](./CONTRIBUTING.md).

## Disclaimer

DAO DAO TOOLING IS PROVIDED “AS IS”, AT YOUR OWN RISK, AND WITHOUT WARRANTIES OF ANY KIND. No developer or entity involved in creating the DAO DAO UI or smart contracts will be liable for any claims or damages whatsoever associated with your use, inability to use, or your interaction with other users of DAO DAO tooling, including any direct, indirect, incidental, special, exemplary, punitive or consequential damages, or loss of profits, cryptocurrencies, tokens, or anything else of value.
