import { Chain, IBCInfo } from '@chain-registry/types'
import {
  assets as chainRegistryAssets,
  chains as chainRegistryChains,
  ibc as chainRegistryIbc,
} from 'chain-registry'

import { AnyChain, ChainId } from '@dao-dao/types'

/**
 * Convert ChainRegistry chain to AnyChain.
 */
export const convertChainRegistryChainToAnyChain = (
  chain: Chain
): AnyChain => ({
  chainId: chain.chain_id,
  chainName: chain.chain_name,
  bech32Prefix: chain.bech32_prefix ?? '',
  prettyName: chain.pretty_name ?? chain.chain_name,
  chainRegistry: chain,
})

//! ----- Modified chain-registry -----
let chains: AnyChain[] = chainRegistryChains.map(
  convertChainRegistryChainToAnyChain
)
const assets = [...chainRegistryAssets]

const chainsToRemove = [
  // Remove althea and andromeda1 since they spam the console.
  'althea',
  'andromeda1',
]
chains = chains.filter((chain) => !chainsToRemove.includes(chain.chainName))

// BitSong Testnet: halted indefinitely
// const bitSongTestnetChain = convertChainRegistryChainToAnyChain({
//   ...chains.find((c) => c.chainId === ChainId.BitsongMainnet)!.chainRegistry!,
//   chain_id: ChainId.BitsongTestnet,
//   chain_name: 'bitsongtestnet',
//   status: 'live',
//   network_type: 'testnet',
//   pretty_name: 'BitSong Testnet',
//   apis: {
//     rpc: [
//       {
//         address: 'https://rpc-testnet.explorebitsong.com',
//       },
//     ],
//     rest: [
//       {
//         address: 'https://lcd-testnet.explorebitsong.com',
//       },
//     ],
//   },
// })
// chains.push(bitSongTestnetChain)
// assets.push({
//   chain_name: bitSongTestnetChain.chainName,
//   // Copy assets from BitSong mainnet.
//   assets: assets.find((a) => a.chain_name === 'bitsong')?.assets ?? [],
// })

// OmniFlix Hub Testnet
const omniFlixHubTestnetChain = convertChainRegistryChainToAnyChain({
  ...chains.find((c) => c.chainId === ChainId.OmniflixHubMainnet)!
    .chainRegistry!,
  chain_id: ChainId.OmniflixHubTestnet,
  chain_name: 'omniflixhubtestnet',
  status: 'live',
  network_type: 'testnet',
  pretty_name: 'OmniFlix Hub Testnet',
  apis: {
    rpc: [
      {
        address: 'https://rpc.testnet.omniflix.network',
      },
    ],
    rest: [
      {
        address: 'https://api.testnet.omniflix.network',
      },
    ],
  },
})
chains.push(omniFlixHubTestnetChain)
assets.push({
  chain_name: omniFlixHubTestnetChain.chainName,
  // Copy assets from OmniFlix Hub mainnet.
  assets: assets.find((a) => a.chain_name === 'omniflixhub')?.assets ?? [],
})

// Replace Juno testnet uni-6 with uni-7.
const junoTestnetChain = chains.find((c) => c.chainId === 'uni-6')
if (junoTestnetChain?.chainRegistry) {
  junoTestnetChain.chainId = ChainId.JunoTestnet
  junoTestnetChain.chainRegistry.chain_id = ChainId.JunoTestnet
  junoTestnetChain.chainRegistry.fees = {
    fee_tokens: [
      {
        denom: 'ujunox',
        low_gas_price: 0.075,
        average_gas_price: 0.1,
        high_gas_price: 0.125,
        fixed_min_gas_price: 0.075,
      },
    ],
  }
}

// THORChain/Rujira mainnet and stagenet

// Fix THORChain mainnet because the chain registry doesn't have `apis` nor
// `fees` set.
// https://github.com/cosmos/chain-registry/blob/master/thorchain/chain.json
const thorchainMainnetChainRegistry = chains.find(
  (c) => c.chainId === ChainId.ThorchainMainnet
)!.chainRegistry!
thorchainMainnetChainRegistry.apis = {
  rpc: [
    {
      address: 'https://gateway.liquify.com/chain/thorchain_rpc',
    },
  ],
  rest: [
    {
      address: 'https://gateway.liquify.com/chain/thorchain_api',
    },
  ],
}
thorchainMainnetChainRegistry.fees = {
  fee_tokens: [
    {
      denom: 'rune',
      fixed_min_gas_price: 0,
    },
  ],
}
const thorchainMainnetChainRegistryAssets = assets.find(
  (a) => a.chain_name === thorchainMainnetChainRegistry.chain_name
)!
thorchainMainnetChainRegistryAssets.assets.push({
  description:
    'Ethereum is a decentralized blockchain platform for running smart contracts and dApps, with Ether (ETH) as its native cryptocurrency, enabling a versatile ecosystem beyond just digital currency.',
  extended_description:
    "Ethereum, symbolized as ETH, is a groundbreaking cryptocurrency and blockchain platform introduced in 2015 by a team led by Vitalik Buterin. Unlike Bitcoin, which primarily serves as a digital currency, Ethereum is designed to be a decentralized platform for running smart contracts and decentralized applications (dApps). These smart contracts are self-executing contracts with the terms directly written into code, enabling trustless and automated transactions without intermediaries. Ethereum's blockchain can host a wide variety of applications, from financial services to gaming, making it a versatile and powerful tool in the world of blockchain technology.\n\nOne of the most notable features of Ethereum is its native cryptocurrency, Ether (ETH), which is used to pay for transaction fees and computational services on the network. Ethereum has also been the backbone for the explosive growth of decentralized finance (DeFi), which seeks to recreate traditional financial systems with blockchain-based alternatives. Additionally, Ethereum is undergoing a significant upgrade known as Ethereum 2.0, which aims to improve scalability, security, and energy efficiency through a shift from proof-of-work (PoW) to proof-of-stake (PoS) consensus mechanisms. This transition is expected to enhance the network's performance and reduce its environmental impact, further solidifying Ethereum's position as a leading platform in the blockchain ecosystem.",
  denom_units: [
    {
      denom: 'eth-eth',
      exponent: 0,
    },
    {
      denom: 'eth',
      exponent: 8,
      aliases: ['ether'],
    },
  ],
  type_asset: 'unknown',
  base: 'eth-eth',
  name: 'Ether',
  display: 'eth',
  symbol: 'ETH',
  logo_URIs: {
    png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/eth-white.png',
    svg: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/eth-white.svg',
  },
  coingecko_id: 'ethereum',
  images: [
    {
      png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/eth-white.png',
      svg: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/eth-white.svg',
      theme: {
        primary_color_hex: '#303030',
      },
    },
  ],
})
thorchainMainnetChainRegistryAssets.assets.push({
  denom_units: [
    {
      denom: 'eth-usdc-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      exponent: 0,
      aliases: ['uusdc'],
    },
    {
      denom: 'usdc',
      exponent: 8,
    },
  ],
  base: 'eth-usdc-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  name: 'USDC',
  display: 'usdc',
  symbol: 'USDC',
  logo_URIs: {
    png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/usdc.png',
    svg: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/usdc.svg',
  },
  coingecko_id: 'usd-coin',
  images: [
    {
      svg: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/usdc.svg',
      png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/usdc.png',
      theme: {
        circle: true,
        primary_color_hex: '#2775CA',
      },
    },
  ],
  type_asset: 'unknown',
})

const thorchainStagenetChain = convertChainRegistryChainToAnyChain({
  chain_id: ChainId.ThorchainStagenet,
  chain_name: 'thorchainstagenet',
  chain_type: 'cosmos',
  status: 'live',
  network_type: 'devnet',
  pretty_name: 'THORChain Stagenet',
  bech32_prefix: 'sthor',
  slip44: 931,
  apis: {
    rpc: [
      {
        address: 'https://stagenet-rpc.ninerealms.com:443',
      },
    ],
    rest: [
      {
        address: 'https://stagenet-thornode.ninerealms.com:443',
      },
    ],
  },
  fees: {
    fee_tokens: [
      {
        denom: 'rune',
        fixed_min_gas_price: 0,
      },
    ],
  },
})
chains.push(thorchainStagenetChain)
assets.push({
  chain_name: thorchainStagenetChain.chainName,
  assets: [
    {
      description: 'The native token of THORChain',
      denom_units: [
        {
          denom: 'rune',
          exponent: 0,
        },
        {
          denom: 'RUNE',
          exponent: 8,
        },
      ],
      base: 'rune',
      name: 'THORChain RUNE',
      display: 'RUNE',
      symbol: 'RUNE',
      logo_URIs: {
        png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/thorchain/images/rune.png',
        svg: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/thorchain/images/rune.svg',
      },
      images: [
        {
          png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/thorchain/images/rune.png',
          svg: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/thorchain/images/rune.svg',
        },
      ],
      type_asset: 'sdk.coin',
    },
  ],
})

// Intergaze (Stargaze + Initia)
// https://github.com/initia-labs/initia-registry/blob/main/mainnets/intergaze/chain.json
const intergazeChain = convertChainRegistryChainToAnyChain({
  $schema: '../../chain.schema.json',
  chain_name: 'intergaze',
  pretty_name: 'Intergaze',
  chain_id: ChainId.IntergazeMainnet,
  bech32_prefix: 'init',
  network_type: 'mainnet',
  codebase: {
    git_repo: 'https://github.com/public-awesome/intergaze',
    recommended_version: 'v1.0.0-rc.5',
    genesis: {
      genesis_url: 'https://rpc.intergaze-apis.com/genesis',
    },
  },
  peers: {
    seeds: [],
    persistent_peers: [],
  },
  apis: {
    rpc: [
      {
        address: 'https://rpc.intergaze-apis.com',
      },
    ],
    rest: [
      {
        address: 'https://rest.intergaze-apis.com',
      },
    ],
    grpc: [
      {
        address: 'grpc.intergaze-apis.com:443',
      },
    ],
  },
  // @ts-ignore
  key_algos: ['initia_ethsecp256k1', 'secp256k1'],
  slip44: 60,
  fees: {
    fee_tokens: [
      {
        denom:
          'l2/fb936ffef4eb4019d82941992cc09ae2788ce7197fcb08cb00c4fe6f5e79184e',
        fixed_min_gas_price: 0.03,
      },
    ],
  },
  images: [
    {
      png: 'https://raw.githubusercontent.com/initia-labs/initia-registry/main/images/intergaze.png',
    },
  ],
  logo_URIs: {
    png: 'https://raw.githubusercontent.com/initia-labs/initia-registry/main/images/intergaze.png',
  },
  metadata: {
    op_bridge_id: '31',
    op_denoms: ['uinit'],
    executor_uri: 'https://executor.intergaze-apis.com',
    ibc_channels: [
      {
        chain_id: 'interwoven-1',
        port_id:
          'wasm.init1wug8sewp6cedgkmrmvhl3lf3tulagm9hnvy8p0rppz9yjw0g4wtq7947m6',
        channel_id: 'channel-1',
        version: 'ics721-1',
      },
      {
        chain_id: 'interwoven-1',
        port_id: 'transfer',
        channel_id: 'channel-0',
        version: 'ics20-1',
      },
    ],
    assetlist:
      'https://raw.githubusercontent.com/initia-labs/initia-registry/main/mainnets/intergaze/assetlist.json',
    minitia: {
      type: 'miniwasm',
      version: 'v1.0.2',
    },
  },
})
chains.push(intergazeChain)
// https://github.com/initia-labs/initia-registry/blob/main/mainnets/intergaze/assetlist.json
assets.push({
  chain_name: intergazeChain.chainName,
  assets: [
    {
      description: 'The native token of Initia',
      denom_units: [
        {
          denom:
            'l2/fb936ffef4eb4019d82941992cc09ae2788ce7197fcb08cb00c4fe6f5e79184e',
          exponent: 0,
        },
        {
          denom: 'INIT',
          exponent: 6,
        },
      ],
      base: 'l2/fb936ffef4eb4019d82941992cc09ae2788ce7197fcb08cb00c4fe6f5e79184e',
      display: 'INIT',
      traces: [
        {
          // @ts-ignore
          type: 'op',
          counterparty: {
            base_denom: 'uinit',
            chain_name: 'initia',
          },
          chain: {
            // @ts-ignore
            bridge_id: '31',
          },
        },
      ],
      name: 'Initia Native Token',
      symbol: 'INIT',
      coingecko_id: '',
      images: [
        {
          png: 'https://raw.githubusercontent.com/initia-labs/initia-registry/main/images/INIT.png',
        },
      ],
      logo_URIs: {
        png: 'https://raw.githubusercontent.com/initia-labs/initia-registry/main/images/INIT.png',
      },
    },
    {
      description: 'USDC on Initia',
      denom_units: [
        {
          denom:
            'l2/db147f1ded7ffcc336f5f8d1eff83c4feb95fcfff5c84f1b9c135444b816e48e',
          exponent: 0,
        },
        {
          denom: 'USDC',
          exponent: 6,
        },
      ],
      base: 'l2/db147f1ded7ffcc336f5f8d1eff83c4feb95fcfff5c84f1b9c135444b816e48e',
      display: 'USDC',
      name: 'USD Coin',
      symbol: 'USDC',
      coingecko_id: '',
      traces: [
        {
          type: 'ibc',
          counterparty: {
            chain_name: 'noble',
            base_denom: 'uusdc',
            channel_id: 'channel-129',
          },
          chain: {
            channel_id: 'channel-3',
            path: 'transfer/channel-3/uusdc',
          },
        },
        {
          // @ts-ignore
          type: 'op',
          counterparty: {
            base_denom:
              'ibc/6490A7EAB61059BFC1CDDEB05917DD70BDF3A611654162A1A47DB930D40D8AF4',
            chain_name: 'initia',
          },
          chain: {
            // @ts-ignore
            bridge_id: '31',
          },
        },
      ],
      images: [
        {
          png: 'https://raw.githubusercontent.com/initia-labs/initia-registry/main/images/USDC.png',
        },
      ],
      logo_URIs: {
        png: 'https://raw.githubusercontent.com/initia-labs/initia-registry/main/images/USDC.png',
      },
    },
  ],
})

// DAODISEO testnet
// https://github.com/daodiseomoney/chain-registry/blob/master/testnets/daodiseotestnet/chain.json
const daodiseoTestnetChain = convertChainRegistryChainToAnyChain({
  chain_name: 'odiseo',
  chain_type: 'cosmos',
  chain_id: ChainId.DaodiseoTestnet,
  pretty_name: 'DAODISEO Testnet',
  status: 'live',
  network_type: 'testnet',
  website: 'https://daodiseo.money',
  bech32_prefix: 'odiseo',
  key_algos: ['secp256k1'],
  slip44: 118,
  fees: {
    fee_tokens: [
      {
        denom: 'uodis',
        fixed_min_gas_price: 0.025,
        low_gas_price: 0.01,
        average_gas_price: 0.025,
        high_gas_price: 0.04,
      },
    ],
  },
  staking: {
    staking_tokens: [
      {
        denom: 'uodis',
      },
    ],
  },
  apis: {
    rpc: [
      {
        address: 'https://testnet-rpc.daodiseo.chaintools.tech',
        provider: 'DAODISEO',
      },
      {
        address: 'https://rpc-testnet-daodiseo.nodeist.net:443',
        provider: 'Nodeist',
      },
      {
        address: 'https://daodiseo-testnet-rpc.stakerhouse.com',
        provider: 'StakerHouse',
      },
      {
        address: 'https://odiseo-testnet-rpc.bonynode.online',
        provider: 'BonyNode',
      },
      {
        address: 'https://odiseo_testnet_rpc.chain.whenmoonwhenlambo.money',
        provider: 'WHEN MOON 🌕 WHEN LAMBO 🔥',
      },
      {
        address: 'https://odiseo-testnet.rpc.stakevillage.net:443',
        provider: 'Stake Village',
      },
      {
        address: 'https://rpc-daodiseo.dnsarz.xyz',
        provider: 'dnsarz',
      },
      {
        address: 'https://rpc.odiseo-testnet.liora.fun:443',
        provider: 'Monika',
      },
    ],
    rest: [
      {
        address: 'https://testnet-api.daodiseo.chaintools.tech',
        provider: 'DAODISEO',
      },
      {
        address: 'https://daodiseo-testnet-rest.stakerhouse.com',
        provider: 'StakerHouse',
      },
      {
        address: 'https://odiseo-testnet-api.bonynode.online',
        provider: 'BonyNode',
      },
      {
        address: 'https://odiseo_testnet_api.chain.whenmoonwhenlambo.money',
        provider: 'WHEN MOON 🌕 WHEN LAMBO 🔥',
      },
      {
        address: 'https://odiseo-testnet.api.stakevillage.net',
        provider: 'Stake Village',
      },
      {
        address: 'https://api-daodiseo.dnsarz.xyz',
        provider: 'dnsarz',
      },
      {
        address: 'https://api.odiseo-testnet.liora.fun',
        provider: 'Monika',
      },
    ],
    grpc: [
      {
        address: 'daodiseo-testnet-grpc.stakerhouse.com:443',
        provider: 'StakerHouse',
      },
      {
        address: 'odiseo-testnet.grpc.stakevillage.net:443',
        provider: 'Stake Village',
      },
      {
        address: 'https://grpc.odiseo-testnet.liora.fun:443',
        provider: 'Monika',
      },
    ],
  },
  explorers: [
    {
      kind: 'ping.pub',
      url: 'https://testnet.explorer.chaintools.tech/odiseo',
      tx_page: 'https://testnet.explorer.chaintools.tech/odiseo/txs/${txHash}',
      account_page:
        'https://testnet.explorer.chaintools.tech/odiseo/account/${accountAddress}',
    },
    {
      kind: 'cosmotracker',
      url: 'https://testnet.cosmotracker.com/daodiseo',
      tx_page: 'https://testnet.cosmotracker.com/daodiseo/tx/${txHash}',
      account_page:
        'https://testnet.cosmotracker.com/daodiseo/account/${accountAddress}',
    },
    {
      kind: 'bony-explorer',
      url: 'https://explorer.bonynode.online/odiseo/staking',
      tx_page: 'https://explorer.bonynode.online/odiseo/tx/${txHash}',
      account_page:
        'https://explorer.bonynode.online/odiseo/account/${accountAddress}',
    },
    {
      kind: 'moonlambo',
      url: 'https://explorer.whenmoonwhenlambo.money/odiseo-testnet',
      tx_page:
        'https://explorer.whenmoonwhenlambo.money/odiseo-testnet/txs/${txHash}',
      account_page:
        'https://explorer.whenmoonwhenlambo.money/odiseo-testnet/account/${accountAddress}',
    },
    {
      kind: 'Stake Village',
      url: 'https://exp.stakevillage.net/odiseo-testnet',
      tx_page: 'https://exp.stakevillage.net/odiseo-testnet/txs/${txHash}',
      account_page:
        'https://exp.stakevillage.net/odiseo-testnet/account/${accountAddress}',
    },
    {
      kind: 'dnsarz',
      url: 'https://ping.dnsarz.xyz/daodiseo-testnet',
      tx_page: 'https://ping.dnsarz.xyz/daodiseo-testnet/txs/${txHash}',
      account_page:
        'https://ping.dnsarz.xyz/daodiseo-testnet/account/${accountAddress}',
    },
    {
      kind: 'custom',
      url: 'https://explorer.YOURVALIDATOR.net/odiseo',
      tx_page: 'https://explorer.YOURVALIDATOR.net/odiseo/txs/${txHash}',
      account_page:
        'https://explorer.YOURVALIDATOR.net/odiseo/account/${accountAddress}',
    },
  ],
  logo_URIs: {
    png: 'https://daodiseo.money/wp-content/uploads/2025/05/DAO_O_logo_256x256.png',
  },
})
chains.push(daodiseoTestnetChain)
assets.push({
  chain_name: daodiseoTestnetChain.chainName,
  assets: [
    {
      type_asset: 'sdk.coin',
      description: 'The native token of DAODISEO',
      denom_units: [
        {
          denom: 'uodis',
          exponent: 0,
        },
        {
          denom: 'ODIS',
          exponent: 6,
        },
      ],
      base: 'uodis',
      display: 'ODIS',
      symbol: 'ODIS',
      name: 'DAODISEO Native Token',
    },
  ],
})

// Regen Testnet
const regenTestnetChain = convertChainRegistryChainToAnyChain({
  ...chains.find((c) => c.chainId === ChainId.RegenMainnet)!.chainRegistry!,
  chain_id: ChainId.RegenTestnet,
  chain_name: 'regentestnet',
  status: 'live',
  network_type: 'testnet',
  pretty_name: 'Regen Testnet',
  apis: {
    rpc: [
      {
        address: 'https://rpc-regen-upgrade.vitwit.com',
      },
    ],
    rest: [
      {
        address: 'https://api-regen-upgrade.vitwit.com',
      },
    ],
  },
})
chains.push(regenTestnetChain)
assets.push({
  chain_name: regenTestnetChain.chainName,
  // Copy assets from Regen mainnet.
  assets: assets.find((a) => a.chain_name === 'regen')?.assets ?? [],
})

// Shrink Cosmos Hub ICS provider testnet name since Keplr thinks it's too long.
chains.find((c) => c.chainId === ChainId.CosmosHubProviderTestnet)!.prettyName =
  'Cosmos ICS Provider Testnet'

const ibc: IBCInfo[] = [
  ...chainRegistryIbc,
  // Oraichain <-> Cosmos Hub
  {
    chain_1: {
      chain_name: 'oraichain',
      client_id: '07-tendermint-47',
      connection_id: 'connection-22',
    },
    chain_2: {
      chain_name: 'cosmoshub',
      client_id: '07-tendermint-651',
      connection_id: 'connection-497',
    },
    channels: [
      {
        chain_1: {
          channel_id: 'channel-15',
          port_id: 'transfer',
        },
        chain_2: {
          channel_id: 'channel-301',
          port_id: 'transfer',
        },
        ordering: 'unordered',
        version: 'ics20-1',
        tags: {
          status: 'live',
          preferred: true,
        },
      },
    ],
  },
  // Neutron <-> Carbon
  {
    chain_1: {
      chain_name: 'neutron',
      client_id: '07-tendermint-141',
      connection_id: 'connection-99',
    },
    chain_2: {
      chain_name: 'carbon',
      client_id: '07-tendermint-77',
      connection_id: 'connection-51',
    },
    channels: [
      {
        chain_1: {
          channel_id: 'channel-4892',
          port_id: 'transfer',
        },
        chain_2: {
          channel_id: 'channel-48',
          port_id: 'transfer',
        },
        ordering: 'unordered',
        version: 'ics20-1',
        tags: {
          status: 'live',
          preferred: true,
        },
      },
    ],
  },
]

export { chains, assets, ibc }
