## DAO DAO UI

This project creates a web UI around the [cw3-dao](https://github.com/DA0-DA0/dao-contracts/tree/main/contracts/cw3-dao) and [cw3-multisig](https://github.com/DA0-DA0/dao-contracts/tree/main/contracts/cw3-multisig) smart contracts. Enabling users to:

- Create a governance token based DAO or multisig
- View proposals and treasury info
- Easily create proposals
- Vote on proposals

You can find more info in our [documentation](https://docs.daodao.zone). Join the [DAO DAO Discord](https://discord.gg/sAaGuyW3D2) if you're interested in becoming a contributor.

## Contributing

Interested in contributing to DAO DAO? Check out [CONTRIBUTING.md](./CONTRIBUTING.md).

## Development

### Clone this repo and install dependencies

```bash
git clone https://github.com/DA0-DA0/dao-ui
cd dao-ui
yarn
```

You can choose which environment you want to connect to. The [Juno Testnet](#testnet) is probably easiest to get started with.

### Testnet

Note: you can get Juno Testnet tokens ($JUNOX) from the #faucet channel in the main [Juno Discord](https://discord.com/invite/QcWPfK4gJ2). Testnet environment variables are in `.env.development` and available by default when running `yarn dev` command.

```bash
yarn dev # starts nextjs dev server
```


### Advanced: Other environments

By default `yarn dev` connects to the testnet. For developing against localhost or mainnet, copy the appropriate `.env` file to `.env.local`. Having a `.env.local` file will override the default `.env.development` file when running `yarn dev`.


#### Localhost

This will be using a local development instance in Docker. See the [dao-contracts repo](https://github.com/DA0-DA0/dao-contracts#deploying-in-a-development-environment) for instructions on running a local development environment.

```bash
cp .env.localhost .env.local
```

#### Mainnet

NOTE: this will be using the real Juno network and real $JUNO tokens. Use with caution. We highly recommend using the [Juno Testnet .env config](#testnet) for local development.

```bash
cp .env.mainnet .env.local
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

Note: If you change `.env.local`, you'll sometimes need to re-add the chain to Keplr. If you [select a different chain](https://highlander-nodes.medium.com/junoswap-how-to-reset-chain-config-3e2470a9c1e1) in Keplr (like Cosmos), you can scroll down and remove the "Wasmd Test" chain, then you can re-add it by connecting your wallet.

## Requirements

Please ensure you have the [Keplr wallet extension](https://chrome.google.com/webstore/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap) installed in your Chrome based browser (Chrome, Brave, etc).

## Learn More

This project was bootstrapped with [`next-cosmwasm-keplr-starter`](https://github.com/ebaker/next-cosmwasm-keplr-starter).

To learn more about Next.js, CosmJS, Keplr, and Tailwind CSS - take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [CosmJS Repository](https://github.com/cosmos/cosmjs) -JavaScript library for Cosmos ecosystem.
- [@cosmjs/cosmwasm-stargate Documentation](https://cosmos.github.io/cosmjs/latest/cosmwasm-stargate/modules.html) - CosmJS CosmWasm Stargate module documentation.
- [Keplr Wallet Documentation](https://docs.keplr.app/api/cosmjs.html) - using Keplr wallet with CosmJS.
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - utility-first CSS framework.
- [DaisyUI Documentation](https://daisyui.com/docs/use) - lightweight component library built on [tailwindcss](https://tailwindcss.com/).

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Disclaimer

DAO DAO TOOLING IS PROVIDED “AS IS”, AT YOUR OWN RISK, AND WITHOUT WARRANTIES OF ANY KIND. No developer or entity involved in creating the DAO DAO UI or smart contracts will be liable for any claims or damages whatsoever associated with your use, inability to use, or your interaction with other users of DAO DAO tooling, including any direct, indirect, incidental, special, exemplary, punitive or consequential damages, or loss of profits, cryptocurrencies, tokens, or anything else of value.
