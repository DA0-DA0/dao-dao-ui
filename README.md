## Preview

<p align="center" width="100%">
    <img alt="cw-dao UI preview" src="https://i.imgur.com/Dtk9eyO.gif">
</p>

## Summary

This project creates a web UI around the [cw-dao](https://github.com/DA0-DA0/cw-dao) smart contract. Enabling users to:

- View proposals for a previously instantiated cw-dao
- Create proposals for sending funds from the cw-dao instance
- Vote on proposals created by other users of the cw-dao instance

## Local Development
You need to deploy the contracts to a chain running locally in order to interact with the DAO frontend.

To do this we'll use [wasmd](https://github.com/CosmWasm/wasmd).

### Setup

**Prerequisites:** Make sure to have [Golang >=1.17](https://golang.org/).

#### Build from source

You need to ensure your gopath configuration is correct. If the following **'make'** step does not work then you might have to add these lines to your .profile or .zshrc in the users home folder:

```
export GOROOT=/usr/local/go
export GOPATH=$HOME/go
export GO111MODULE=on
export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin
```

```sh
git clone https://github.com/CosmWasm/wasmd
cd wasmd
make build && make install
```

This will build and install the `wasmd` binary into `$GOPATH`.

Note: When building from source, it is important to have your `$GOPATH` set correctly. When in doubt, the following should do:

```sh
mkdir ~/go
export GOPATH=~/go
```

#### Initialize local node
Note, this only needs to be done once

1. Initialize the Juno directories and create the local genesis file with the correct chain-id (these can be run from any directory):

   ```sh
   wasmd init validator --chain-id=localnet-1
   ```

   This initializes the chain with the name of `validator` for your local node, and `localnet-1` as the chain ID.

2. Create a local key pair:

   ```sh
   > wasmd keys add validator
   ```

3. Add your account to your local genesis file with a given amount and the key you just created. Use only `10000000000ujunox`, other amounts will be ignored.

   ```bash
   wasmd add-genesis-account $(wasmd keys show validator -a) 10000000000ujunox
   ```

#### Start node and deploy contracts
Start the node with:

``` bash
wasmd start --grpc.address 0.0.0.0:9091 --rpc.unsafe
```

Leave this running in a dedicated terminal.

In a new terminal, clone the [cw-dao](https://github.com/DA0-DA0/cw-dao) repo, and run the deploy contracts script.

``` bash
git clone https://github.com/DA0-DA0/cw-dao
cd cw-dao/scripts
bash deploy.sh $(wasmd keys show -a <your-key-name)
```

Make note of the addresses from the output.

#### Setup .env.local file

In the frontend repo, setup up your local environment
``` bash
cp .env.example .env.local
```

Add the addresses from earlier.

``` bash
NEXT_PUBLIC_DAO_CONTRACT_ADDRESS=
NEXT_PUBLIC_DAO_TOKEN_ADDRESS=
```

## Proposal List UI

The proposal list UI provides icons indicating proposal status:

<img alt="proposal status UI table" src="https://i.imgur.com/P5FDDJ8.png">

## Development

This project was bootstrapped with [`next-cosmwasm-keplr-starter`](https://github.com/ebaker/next-cosmwasm-keplr-starter)

```bash
git clone https://github.com/DA0-DA0/cw-dao-dapp
```

First, setup your `.env` file by copying the example:

```bash
cd cw-dao-dapp
cp .env.example .env.local
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

## Requirements

Please ensure you have the [Keplr wallet extension](https://chrome.google.com/webstore/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap) installed in your Chrome based browser (Chrome, Brave, etc).

## Learn More

To learn more about Next.js, CosmJS, Keplr, and Tailwind CSS - take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [CosmJS Repository](https://github.com/cosmos/cosmjs) -JavaScript library for Cosmos ecosystem.
- [@cosmjs/cosmwasm-stargate Documentation](https://cosmos.github.io/cosmjs/latest/cosmwasm-stargate/modules.html) - CosmJS CosmWasm Stargate module documentation.
- [Keplr Wallet Documentation](https://docs.keplr.app/api/cosmjs.html) - using Keplr wallet with CosmJS.
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - utility-first CSS framework.
- [DaisyUI Documentation](https://daisyui.com/docs/use) - lightweight component library built on [tailwindcss](https://tailwindcss.com/).

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
