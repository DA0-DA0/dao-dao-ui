# @dao-dao/sda

Web application for viewing a single DAO. Live in production at
[dao.daodao.zone](https://dao.daodao.zone).

## Development

```bash
yarn dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
result.

## Environments

You can choose which environment you want to connect to. The default development
environment is [Juno Testnet](#testnet).

### Testnet

Note: you can get Juno Testnet tokens ($JUNOX) from the #faucet channel in the
main [Juno Discord](https://discord.com/invite/QcWPfK4gJ2). Testnet environment
variables are in `.env.development` and available by default when running the
`yarn dev` command.

```bash
yarn dev # starts nextjs dev server
```

### Advanced: Other environments

By default `yarn dev` connects to the testnet. For developing against localhost
or mainnet, copy the appropriate `.env` file to `.env.local`. Having a
`.env.local` file will override the default `.env.development` file when running
`yarn dev`.

#### Mainnet

NOTE: this will be using the real Juno network and real $JUNO tokens. Use with
caution. We highly recommend using the [Juno Testnet .env config](#testnet) for
local development.

```bash
cp .env.mainnet .env.local
```

#### Localhost

This will be using a local development instance in Docker. See the
[dao-contracts
repo](https://github.com/DA0-DA0/dao-contracts#deploying-in-a-development-environment)
for instructions on running a local development environment.

```bash
cp .env.localhost .env.local
```

## Requirements

Please ensure you have the [Keplr wallet
extension](https://chrome.google.com/webstore/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap)
installed in your Chrome-based browser (Chrome, Brave, etc).

## Main Libraries

We use a handful of powerful libraries to build this dApp.

To learn more about Next.js, CosmJS, Keplr, and Tailwind CSS, take a look at the
following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js
  features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [CosmJS Repository](https://github.com/cosmos/cosmjs) -JavaScript library for
  Cosmos ecosystem.
- [@cosmjs/cosmwasm-stargate
  Documentation](https://cosmos.github.io/cosmjs/latest/cosmwasm-stargate/modules.html)
  - CosmJS CosmWasm Stargate module documentation.
- [Keplr Wallet Documentation](https://docs.keplr.app/api/cosmjs.html) - using
  Keplr wallet with CosmJS.
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - utility-first CSS
  framework.

## Contributing

Interested in contributing to DAO DAO? Check out
[CONTRIBUTING.md](../../CONTRIBUTING.md).

## Disclaimer

DAO DAO TOOLING IS PROVIDED “AS IS”, AT YOUR OWN RISK, AND WITHOUT WARRANTIES OF
ANY KIND. No developer or entity involved in creating the DAO DAO UI or smart
contracts will be liable for any claims or damages whatsoever associated with
your use, inability to use, or your interaction with other users of DAO DAO
tooling, including any direct, indirect, incidental, special, exemplary,
punitive or consequential damages, or loss of profits, cryptocurrencies, tokens,
or anything else of value.
