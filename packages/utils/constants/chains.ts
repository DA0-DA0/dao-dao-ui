import { Chain, IBCInfo } from '@chain-registry/types'
import {
  assets as chainRegistryAssets,
  chains as chainRegistryChains,
  ibc as chainRegistryIbc,
} from 'chain-registry'

import {
  AnyChain,
  BaseChainConfig,
  ChainId,
  CodeHashConfig,
  CodeIdConfig,
  ContractVersion,
  PolytoneConfig,
  SkipChain,
  SupportedChainConfig,
  TokenType,
} from '@dao-dao/types'

import { NftBasedCreatorId } from './adapters'
import _ALL_CODE_HASHES from './codeHashes.json'
import _ALL_CODE_IDS from './codeIds.json'
import { NEUTRON_GOVERNANCE_DAO } from './env'
import { TEST_ENV } from './other'
import _ALL_POLYTONE from './polytone.json'

const ALL_CODE_HASHES = _ALL_CODE_HASHES as unknown as Partial<
  Record<ChainId, Partial<Record<ContractVersion, CodeHashConfig>>>
>
const ALL_CODE_IDS = TEST_ENV
  ? // Fetched later in convertConfiguredChainToSupportedChain.
    {}
  : (_ALL_CODE_IDS as unknown as Partial<
      Record<ChainId, Partial<Record<ContractVersion, CodeIdConfig>>>
    >)
const ALL_POLYTONE = _ALL_POLYTONE as unknown as Partial<
  Record<ChainId, PolytoneConfig>
>

export const convertChainRegistryChainToAnyChain = (
  chain: Chain
): AnyChain => ({
  chainId: chain.chain_id,
  chainName: chain.chain_name,
  bech32Prefix: chain.bech32_prefix ?? '',
  prettyName: chain.pretty_name ?? chain.chain_name,
  chainRegistry: chain,
})

export const convertSkipChainToAnyChain = (chain: SkipChain): AnyChain => ({
  chainId: chain.chain_id,
  chainName: chain.chain_name,
  bech32Prefix: chain.bech32_prefix,
  prettyName: chain.pretty_name ?? chain.chain_name,
  skipChain: chain,
})

//! ----- Modified chain-registry -----
let chains: AnyChain[] = chainRegistryChains.map(
  convertChainRegistryChainToAnyChain
)
const assets = [...chainRegistryAssets]

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

// THORChain/Rujira Stagenet
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

const chainsToRemove = [
  // Remove thorchain, althea, and andromeda1 since they spam the console.
  'thorchain',
  'althea',
  'andromeda1',
]
chains = chains.filter((chain) => !chainsToRemove.includes(chain.chainName))

// Shrink Cosmos Hub ICS provider testnet name since Keplr thinks it's too long.
chains.find((c) => c.chainId === ChainId.CosmosHubProviderTestnet)!.prettyName =
  'Cosmos ICS Provider Testnet'

export { chains, assets }
//! ----- Modified chain-registry -----

export const ibc: IBCInfo[] = [
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

/**
 * Chains where DAO DAO is deployed.
 */
const BASE_SUPPORTED_CHAINS: Omit<
  SupportedChainConfig,
  'codeIds' | 'allCodeIds' | 'codeHashes' | 'allCodeHashes' | 'polytone'
>[] = TEST_ENV
  ? []
  : [
      {
        chainId: ChainId.CosmosHubMainnet,
        name: 'cosmos',
        mainnet: true,
        accentColor: '#5064fb',
        factoryContractAddress:
          'cosmos1az0ae4wsthlcg8yar3ydhsc6xw6h9uvzdvvgf737qu02nq8ekcxq6v7ymq',
        explorerUrlTemplates: {
          tx: 'https://mintscan.io/cosmos/tx/REPLACE',
          gov: 'https://mintscan.io/cosmos/proposals',
          govProp: 'https://mintscan.io/cosmos/proposals/REPLACE',
          wallet: 'https://mintscan.io/cosmos/account/REPLACE',
        },
        // Disable token creation.
        noTokenFactory: true,
        daoCreatorDisabled: {
          // No NFTs on the Hub.
          [NftBasedCreatorId]: 'unsupported',
        },
        latestVersion: ContractVersion.V270,
      },
      {
        chainId: ChainId.JunoMainnet,
        name: 'juno',
        mainnet: true,
        accentColor: '#f74a49',
        factoryContractAddress:
          'juno1f3xxy7cw5lvljf38ehhcxavxlawpmkezq7qtrhesvympfudjvlaqzz6exr',
        kado: {
          network: 'JUNO',
        },
        subDaos: [
          'juno1nmezpepv3lx45mndyctz2lzqxa6d9xzd2xumkxf7a6r4nxt0y95qypm6c0',
          'juno1gyjl26rnqqyk6cuh6nqtvx8t885jgqagusvpqpvtgaygcjg2wjdqz0rzle',
          'juno1n34v729jqgysm5w0unukpt4kvqu4wqyacsv4krmd40f7pz5ruzwqau7e6m',
          'juno1mjsgk02jyn72jm2x7fgw72uu9wj7xy0v6pnuj2jd3aq7rgeqg5qq4dnhes',
        ],
        explorerUrlTemplates: {
          tx: 'https://ping.pub/juno/tx/REPLACE',
          gov: 'https://ping.pub/juno/gov',
          govProp: 'https://ping.pub/juno/gov/REPLACE',
          wallet: 'https://ping.pub/juno/account/REPLACE',
        },
        latestVersion: ContractVersion.V270,
      },
      {
        chainId: ChainId.OsmosisMainnet,
        name: 'osmosis',
        mainnet: true,
        accentColor: '#5604e8',
        factoryContractAddress:
          'osmo1qpszqk458arkkdff5z4vrqlqv4k2n9a0tjme23vn00uyt30nrr7sfe87cv',
        kado: {
          network: 'OSMOSIS',
        },
        explorerUrlTemplates: {
          tx: 'https://mintscan.io/osmosis/txs/REPLACE',
          gov: 'https://mintscan.io/osmosis/proposals',
          govProp: 'https://mintscan.io/osmosis/proposals/REPLACE',
          wallet: 'https://mintscan.io/osmosis/account/REPLACE',
        },
        latestVersion: ContractVersion.V270,
      },
      {
        chainId: ChainId.NeutronMainnet,
        name: 'neutron',
        mainnet: true,
        accentColor: '#000000',
        factoryContractAddress:
          'neutron1asszs9mjglv2rzpeu8fzlsa0cy55th0jkv27hsw3ulddt7f74gpsrqhatg',
        govContractAddress: NEUTRON_GOVERNANCE_DAO,
        subDaos: [
          'neutron1fuyxwxlsgjkfjmxfthq8427dm2am3ya3cwcdr8gls29l7jadtazsuyzwcc',
          'neutron1zjdv3u6svlazlydmje2qcp44yqkt0059chz8gmyl5yrklmgv6fzq9chelu',
        ],
        explorerUrlTemplates: {
          tx: 'https://neutron.celat.one/neutron-1/txs/REPLACE',
          wallet: 'https://neutron.celat.one/neutron-1/accounts/REPLACE',
        },
        latestVersion: ContractVersion.V270,
        valence: {
          servicesManager:
            'neutron1gantvpnat0la8kkkzrnj48d5d8wxdjllh5r2w4r2hcrpwy00s69quypupa',
          rebalancer:
            'neutron1qs6mzpmcw3dvg5l8nyywetcj326scszdj7v4pfk55xwshd4prqnqfwc0z2',
        },
        other: {
          govSpamDb:
            'neutron1zgqhpaynwlfsgvlugjhv2wahdkfpfsvfl7x0n70syl680vx8ca0qzq6u9w',
        },
      },
      {
        chainId: ChainId.StargazeMainnet,
        name: 'stargaze',
        mainnet: true,
        accentColor: '#8ac3cc',
        factoryContractAddress:
          'stars1rncaxmp9n0cw6l5uw9qjwzptqjckdrk99hewh857j72pr3gv7tzqv5s88r',
        explorerUrlTemplates: {
          tx: 'https://mintscan.io/stargaze/txs/REPLACE',
          gov: 'https://mintscan.io/stargaze/proposals',
          govProp: 'https://mintscan.io/stargaze/proposals/REPLACE',
          wallet: 'https://mintscan.io/stargaze/account/REPLACE',
        },
        latestVersion: ContractVersion.V270,
      },
      {
        chainId: ChainId.MigalooMainnet,
        name: 'migaloo',
        mainnet: true,
        accentColor: '#3ccd64',
        factoryContractAddress:
          'migaloo1d08e0gph0awec2ut76tzh92c6ftl6n85wpm0gq8xxe0eu8j97kzqpys8nw',
        explorerUrlTemplates: {
          tx: 'https://inbloc.org/migaloo/transactions/REPLACE',
          gov: 'https://inbloc.org/migaloo/governance',
          govProp: 'https://inbloc.org/migaloo/proposal/REPLACE',
          wallet: 'https://inbloc.org/migaloo/account/REPLACE',
        },
        latestVersion: ContractVersion.V270,
      },
      {
        chainId: ChainId.TerraMainnet,
        name: 'terra',
        mainnet: true,
        overrideChainImageUrl: '/chains/terra.png',
        accentColor: '#113da5',
        factoryContractAddress:
          'terra1hm8w8474vq46fj4na9cjaud2ruzddhc0xttu87tg8s667ncsnhtq3l04mj',
        explorerUrlTemplates: {
          tx: 'https://finder.terra.money/mainnet/tx/REPLACE',
          gov: 'https://mintscan.io/terra/proposals',
          govProp: 'https://mintscan.io/terra/proposals/REPLACE',
          wallet: 'https://finder.terra.money/mainnet/address/REPLACE',
        },
        tokenDaoType: 'both',
        latestVersion: ContractVersion.V270,
      },
      {
        // Ensure this chain stays below Terra so that the logic in
        // makeGetDaoStaticProps works with Terra Classic fallback.
        chainId: ChainId.TerraClassicMainnet,
        name: 'terraclassic',
        mainnet: true,
        accentColor: '#ffd842',
        noInstantiate2Create: true,
        factoryContractAddress:
          'terra1utde3xa30zf6ntf0vz8wqd4ljplgpaztrkmp4x2vayaqq2kkyf6qmsz68l',
        explorerUrlTemplates: {
          tx: 'https://finder.terra-classic.hexxagon.io/mainnet/tx/REPLACE',
          gov: 'https://ping.pub/terra-luna/gov',
          govProp: 'https://ping.pub/terra-luna/gov/REPLACE',
          wallet:
            'https://finder.terra-classic.hexxagon.io/mainnet/address/REPLACE',
        },
        tokenDaoType: TokenType.Cw20,
        latestVersion: ContractVersion.V270,
      },
      {
        chainId: ChainId.OraichainMainnet,
        name: 'oraichain',
        mainnet: true,
        overrideChainImageUrl: '/chains/oraichain.svg',
        accentColor: '#ffffff',
        factoryContractAddress:
          'orai1wkmqccusdlnxpvwejpm73nlt3dqjrg5evyzld2kxgty3w4zfc4vsjrlrav',
        explorerUrlTemplates: {
          tx: 'https://scan.orai.io/txs/REPLACE',
          gov: 'https://scan.orai.io/proposals',
          govProp: 'https://scan.orai.io/proposals/REPLACE',
          wallet: 'https://scan.orai.io/account/REPLACE',
        },
        tokenDaoType: TokenType.Cw20,
        latestVersion: ContractVersion.V270,
      },
      {
        chainId: ChainId.KujiraMainnet,
        name: 'kujira',
        mainnet: true,
        accentColor: '#e53935',
        // Permissioned, only Kujira governance can create DAOs.
        factoryContractAddress:
          'kujira1d4zzt4y0meqr9m3k55w0k0zztpfwm8dulvv4zsnap8cd2na9uhdqemhppe',
        createViaGovernance: true,
        explorerUrlTemplates: {
          tx: 'https://finder.kujira.network/kaiyo-1/tx/REPLACE',
          gov: 'https://kujira.network/govern',
          govProp: 'https://kujira.network/govern/REPLACE',
          wallet: 'https://finder.kujira.network/kaiyo-1/address/REPLACE',
        },
        latestVersion: ContractVersion.V250,
      },
      {
        chainId: ChainId.BitsongMainnet,
        name: 'bitsong',
        mainnet: true,
        accentColor: '#c53381',
        factoryContractAddress:
          'bitsong1glrutywr7268g9ew0uwj6xq5z5hv7rv0t7pum9gyvpkj7egty5cqzf7rdt',
        tokenCreationFactoryAddress:
          'bitsong16jp4jd68hzpc9a88mqcg3mnktjhgrlyv96shx4zvt522zzq99afsdldd04',
        subDaos: [
          'bitsong1qfwdjcmxgjr9jwa2grhf7pce87afx57j2664tvhh29j7r68a9tgqj9kuf3',
        ],
        explorerUrlTemplates: {
          tx: 'https://mintscan.io/bitsong/txs/REPLACE',
          gov: 'https://mintscan.io/bitsong/proposals',
          govProp: 'https://mintscan.io/bitsong/proposals/REPLACE',
          wallet: 'https://mintscan.io/bitsong/account/REPLACE',
        },
        latestVersion: ContractVersion.V270,
      },
      {
        chainId: ChainId.OmniflixHubMainnet,
        name: 'omniflixhub',
        mainnet: true,
        accentColor: '#d71d6a',
        factoryContractAddress:
          'omniflix1rg5jtk5984e3um65l92pagexxj9z6xrkkaw2lrrkhfeyq4376rlsf6j04f',
        explorerUrlTemplates: {
          tx: 'https://mintscan.io/omniflix/txs/REPLACE',
          gov: 'https://mintscan.io/omniflix/proposals',
          govProp: 'https://mintscan.io/omniflix/proposals/REPLACE',
          wallet: 'https://mintscan.io/omniflix/account/REPLACE',
        },
        latestVersion: ContractVersion.V270,
      },
      {
        chainId: ChainId.CosmosHubProviderTestnet,
        name: 'cosmosprovider',
        mainnet: false,
        accentColor: '#5064fb',
        factoryContractAddress:
          'cosmos1kp83xmg04ramd3n82p5chnekzem4yxmeawrgx4uv4ldszqtcedgqvqrwn0',
        explorerUrlTemplates: {
          tx: 'https://explorer.polypore.xyz/provider/tx/REPLACE',
          gov: 'https://explorer.polypore.xyz/provider/gov',
          govProp: 'https://explorer.polypore.xyz/provider/gov/REPLACE',
          wallet: 'https://explorer.polypore.xyz/provider/account/REPLACE',
        },
        // Disable token creation.
        noTokenFactory: true,
        daoCreatorDisabled: {
          // No NFTs on the Hub.
          [NftBasedCreatorId]: 'unsupported',
        },
        latestVersion: ContractVersion.V270,
      },
      {
        chainId: ChainId.JunoTestnet,
        name: 'juno',
        mainnet: false,
        accentColor: '#f74a49',
        factoryContractAddress:
          'juno10kkn698hpzm07kj0klhj3hrkxjsmngj9598esypm5kh9hfpealpq9vjvcw',
        explorerUrlTemplates: {
          tx: 'https://testnet.ping.pub/juno/tx/REPLACE',
          gov: 'https://testnet.ping.pub/juno/gov',
          govProp: 'https://testnet.ping.pub/juno/gov/REPLACE',
          wallet: 'https://testnet.ping.pub/juno/account/REPLACE',
        },
        latestVersion: ContractVersion.V270,
      },
      {
        chainId: ChainId.OsmosisTestnet,
        name: 'osmosis',
        mainnet: false,
        accentColor: '#5604e8',
        factoryContractAddress:
          'osmo1em9rp0zucf9dm7luqf06n20ke9dj9q0yyyd26k5w348sm8rq7h4qwrx8uw',
        explorerUrlTemplates: {
          tx: 'https://testnet.ping.pub/osmosis/tx/REPLACE',
          gov: 'https://testnet.ping.pub/osmosis/gov',
          govProp: 'https://testnet.ping.pub/osmosis/gov/REPLACE',
          wallet: 'https://testnet.ping.pub/osmosis/account/REPLACE',
        },
        latestVersion: ContractVersion.V270,
      },
      {
        chainId: ChainId.StargazeTestnet,
        name: 'stargaze',
        mainnet: false,
        accentColor: '#8ac3cc',
        factoryContractAddress:
          'stars1ezkctzcnrvnwy94d6vjp2zkg68z272qndw688crzhh9nn4ud0q6sw8z03f',
        explorerUrlTemplates: {
          tx: 'https://testnet.ping.pub/stargaze/tx/REPLACE',
          gov: 'https://testnet.ping.pub/stargaze/gov',
          govProp: 'https://testnet.ping.pub/stargaze/gov/REPLACE',
          wallet: 'https://testnet.ping.pub/stargaze/account/REPLACE',
        },
        latestVersion: ContractVersion.V270,
      },
      {
        chainId: ChainId.MigalooTestnet,
        name: 'migaloo',
        mainnet: false,
        accentColor: '#3ccd64',
        factoryContractAddress:
          'migaloo1x393zjpv0ve7wk2w3d40gwjxeww7n8c0unxtdf87u366dlvazryq239pxu',
        explorerUrlTemplates: {
          tx: 'https://testnet.ping.pub/migaloo/tx/REPLACE',
          gov: 'https://testnet.ping.pub/migaloo/gov',
          govProp: 'https://testnet.ping.pub/migaloo/gov/REPLACE',
          wallet: 'https://testnet.ping.pub/migaloo/account/REPLACE',
        },
        latestVersion: ContractVersion.V270,
      },
      // Kujira Testnet is halted indefinitely
      // {
      //   chainId: ChainId.KujiraTestnet,
      //   name: 'kujira',
      //   mainnet: false,
      //   accentColor: '#e53935',
      //   factoryContractAddress:
      //     'kujira13aa6np9kh2ejue5mgqd88ktmkmswcs4vyn6djtf3d0h8n0dt2uysfxx9a7',
      //   explorerUrlTemplates: {
      //     tx: 'https://finder.kujira.network/harpoon-4/tx/REPLACE',
      //     // cannot link directly to testnet
      //     // gov: 'https://kujira.network/govern',
      //     // cannot link directly to testnet
      //     // govProp: 'https://kujira.network/govern/REPLACE',
      //     wallet: 'https://finder.kujira.network/harpoon-4/address/REPLACE',
      //   },
      //   latestVersion: ContractVersion.V260,
      // },
      {
        chainId: ChainId.NeutronTestnet,
        name: 'neutron',
        mainnet: false,
        accentColor: '#000000',
        factoryContractAddress:
          'neutron1caflev8smuslum9uque5z2qhma8xxxmap5dafeynekl37s966k8sq034r4',
        govContractAddress: NEUTRON_GOVERNANCE_DAO,
        explorerUrlTemplates: {
          tx: 'https://neutron.celat.one/pion-1/txs/REPLACE',
          wallet: 'https://neutron.celat.one/pion-1/accounts/REPLACE',
        },
        latestVersion: ContractVersion.V270,
      },
      // BitSong Testnet is halted indefinitely
      // {
      //   chainId: ChainId.BitsongTestnet,
      //   name: 'bitsong',
      //   mainnet: false,
      //   accentColor: '#c53381',
      //   factoryContractAddress:
      //     'bitsong1zftu69lqmhgwyuqlyawssrm62h58hqyl0gvv4n9aj8pvkr6qqd8s2wl5ve',
      //   tokenCreationFactoryAddress:
      //     'bitsong13ackt4dv4ngt4jpngnvyyecjhu33w6gge3mad3n9vc0qkqcrk6cqzfm9vx',
      //   latestVersion: ContractVersion.V260,
      // },
      {
        chainId: ChainId.OmniflixHubTestnet,
        name: 'omniflixhub',
        mainnet: false,
        accentColor: '#d71d6a',
        factoryContractAddress:
          'omniflix1dlz906ww79sq49yykjvvlkf9fu0tv4u94gywfd7ldrtyjd8873hqufdvuc',
        explorerUrlTemplates: {
          tx: 'https://testnet.ping.pub/omniflix/tx/REPLACE',
          gov: 'https://testnet.ping.pub/omniflix/gov',
          govProp: 'https://testnet.ping.pub/omniflix/gov/REPLACE',
          wallet: 'https://testnet.ping.pub/omniflix/account/REPLACE',
        },
        latestVersion: ContractVersion.V270,
      },
      {
        chainId: ChainId.SecretTestnet,
        name: 'secret',
        mainnet: false,
        accentColor: '#000000',
        factoryContractAddress: 'secret15rtkhedsr9gx2z4vq2p7zqk25z4kssju5ae0yy',
        noIndexer: true,
        noInstantiate2Create: true,
        explorerUrlTemplates: {
          tx: 'https://testnet.ping.pub/secret/tx/REPLACE',
          gov: 'https://testnet.ping.pub/secret/gov',
          govProp: 'https://testnet.ping.pub/secret/gov/REPLACE',
          wallet: 'https://testnet.ping.pub/secret/account/REPLACE',
        },
        tokenDaoType: TokenType.Cw20,
        latestVersion: ContractVersion.V242,
      },
      {
        chainId: ChainId.BabylonTestnet,
        name: 'babylon',
        mainnet: false,
        noIndexer: true,
        accentColor: '#ce6533',
        factoryContractAddress:
          'bbn1jwx9r9hcdmcag2zka3dwsg4ekx965ega3wd9gl90pd46gcp7ecnqh3se4m',
        explorerUrlTemplates: {
          tx: 'https://babylon-testnet.l2scan.co/tx/REPLACE',
          gov: 'https://babylon-testnet.l2scan.co/proposals',
          wallet: 'https://babylon-testnet.l2scan.co/address/REPLACE',
        },
        tokenDaoType: TokenType.Cw20,
        noTokenCreation: true,
        latestVersion: ContractVersion.V260,
        daoCreatorDisabled: {
          // No NFTs on Babylon.
          [NftBasedCreatorId]: 'unsupported',
        },
      },
      {
        chainId: ChainId.ThorchainStagenet,
        name: 'thorchain',
        mainnet: false,
        accentColor: '#00eed1',
        factoryContractAddress:
          'sthor122ht2h5ca482vlyqt22ecs6yw5n8f3rx6mwj9wu3jym99ct9xl2qj4cgrz',
        explorerUrlTemplates: {
          tx: 'https://runescan.io/tx/REPLACE?network=stagenet',
          wallet: 'https://runescan.io/address/REPLACE?network=stagenet',
        },
        latestVersion: ContractVersion.V271,
      },
      {
        chainId: ChainId.DaodiseoTestnet,
        name: 'daodiseo',
        mainnet: false,
        accentColor: '#a454ac',
        factoryContractAddress:
          'odiseo124x902fdvdcaawkr7njtjtccx94jq5vq4vtw6mhshxlrjqqxezqqgzgzrq',
        explorerUrlTemplates: {
          tx: 'https://testnet.explorer.chaintools.tech/odiseo/tx/REPLACE',
          gov: 'https://testnet.explorer.chaintools.tech/odiseo/gov',
          govProp:
            'https://testnet.explorer.chaintools.tech/odiseo/gov/REPLACE',
          wallet:
            'https://testnet.explorer.chaintools.tech/odiseo/account/REPLACE',
        },
        latestVersion: ContractVersion.V271,
        noIndexer: true,
      },
      {
        chainId: ChainId.KopiMainnet,
        name: 'kopi',
        mainnet: true,
        accentColor: '#b4e07c',
        factoryContractAddress:
          'kopi1gyh4td7v96mucr4eaksd2msg0jv0mcn9a5yj85vx5l7hty3tu9psxraxed',
        explorerUrlTemplates: {
          tx: 'https://explorer.kopi.money/luwak-1/tx/REPLACE',
          gov: 'https://explorer.kopi.money/luwak-1/gov',
          govProp: 'https://explorer.kopi.money/luwak-1/gov/REPLACE',
          wallet: 'https://explorer.kopi.money/luwak-1/account/REPLACE',
        },
        latestVersion: ContractVersion.V270,
        noIndexer: true,
      },
    ]

const convertConfiguredChainToSupportedChain = (
  chain: (typeof BASE_SUPPORTED_CHAINS)[number]
): SupportedChainConfig => {
  // If testing, use the test codeIds. It's safe to require fs and path here
  // since this will only run in a node environment.
  const allCodeIdsToUse = TEST_ENV
    ? JSON.parse(
        // eslint-disable-next-line regex/invalid
        // Use `eval('require')` instead of `require` so webpack doesn't attempt
        // to bundle these node packages in the browser. The test environment is
        // only used in tests run by node, so these will never be used in the
        // browser.
        //
        // eslint-disable-next-line regex/invalid
        eval('require')('fs').readFileSync(
          // eslint-disable-next-line regex/invalid
          eval('require')('path').join(__dirname, './codeIds.test.json'),
          'utf8'
        )
      )
    : ALL_CODE_IDS

  const allCodeIds = allCodeIdsToUse[chain.chainId as ChainId] || {}
  const codeIds = allCodeIds[chain.latestVersion] || {}

  return {
    ...chain,
    codeIds,
    allCodeIds,
    codeHashes:
      ALL_CODE_HASHES[chain.chainId as ChainId]?.[chain.latestVersion],
    allCodeHashes: ALL_CODE_HASHES[chain.chainId as ChainId],
    polytone: ALL_POLYTONE[chain.chainId as ChainId],
  }
}

// Extract info from JSON config.
export let SUPPORTED_CHAINS: SupportedChainConfig[] = BASE_SUPPORTED_CHAINS.map(
  convertConfiguredChainToSupportedChain
)

export const POLYTONE_CONFIG_PER_CHAIN: [ChainId, PolytoneConfig][] =
  SUPPORTED_CHAINS.map(({ chainId, polytone: polytone = {} }) => [
    chainId as ChainId,
    polytone,
  ])

export const VALENCE_SUPPORTED_CHAINS = SUPPORTED_CHAINS.filter(
  ({ valence }) => valence
).map(({ chainId }) => chainId as ChainId)

export const CHAIN_ENDPOINTS: Partial<
  Record<
    ChainId,
    {
      rpc: string
      rest: string
    }
  >
> = {
  [ChainId.JunoMainnet]: {
    rpc: 'https://juno-rpc.polkachu.com',
    rest: 'https://juno-api.polkachu.com',
  },
  [ChainId.JunoTestnet]: {
    rpc: 'https://juno-testnet-rpc.polkachu.com',
    rest: 'https://juno-testnet-api.polkachu.com',
  },
  [ChainId.OsmosisMainnet]: {
    rpc: 'https://osmosis-rpc.publicnode.com',
    rest: 'https://osmosis-rest.publicnode.com',
  },
  [ChainId.OsmosisTestnet]: {
    rpc: 'https://osmosis-testnet-rpc.polkachu.com',
    rest: 'https://osmosis-testnet-api.polkachu.com',
  },
  [ChainId.StargazeMainnet]: {
    rpc: 'https://stargaze-rpc.polkachu.com',
    rest: 'https://stargaze-api.polkachu.com',
  },
  [ChainId.StargazeTestnet]: {
    rpc: 'https://stargaze-testnet-rpc.polkachu.com',
    rest: 'https://stargaze-testnet-api.polkachu.com',
  },
  [ChainId.NeutronMainnet]: {
    rpc: 'https://rpc-lb.neutron.org',
    rest: 'https://rest-lb.neutron.org',
  },
  [ChainId.NeutronTestnet]: {
    rpc: 'https://rpc-lb-pion.ntrn.tech',
    rest: 'https://rest-lb-pion.ntrn.tech',
  },
  [ChainId.CosmosHubMainnet]: {
    rpc: 'https://cosmos-rpc.polkachu.com',
    rest: 'https://cosmos-api.polkachu.com',
  },
  [ChainId.CosmosHubProviderTestnet]: {
    rpc: 'https://cosmos-testnet-rpc.polkachu.com',
    rest: 'https://cosmos-testnet-api.polkachu.com',
  },
  [ChainId.TerraMainnet]: {
    rpc: 'https://terra-rpc.polkachu.com',
    rest: 'https://terra-api.polkachu.com',
  },
  [ChainId.TerraClassicMainnet]: {
    rpc: 'https://terra-classic-rpc.publicnode.com',
    rest: 'https://terra-classic-lcd.publicnode.com',
  },
  [ChainId.MigalooMainnet]: {
    rpc: 'https://migaloo-rpc.polkachu.com',
    rest: 'https://migaloo-api.polkachu.com',
  },
  [ChainId.MigalooTestnet]: {
    rpc: 'https://migaloo-testnet-rpc.polkachu.com',
    rest: 'https://migaloo-testnet-api.polkachu.com',
  },
  [ChainId.KujiraMainnet]: {
    rpc: 'https://kujira-rpc.publicnode.com',
    rest: 'https://kujira-rest.publicnode.com',
  },
  [ChainId.KujiraTestnet]: {
    rpc: 'https://kujira-testnet-rpc.polkachu.com',
    rest: 'https://kujira-testnet-api.polkachu.com',
  },
  [ChainId.ChihuahuaMainnet]: {
    rpc: 'https://chihuahua-rpc.polkachu.com',
    rest: 'https://chihuahua-api.polkachu.com',
  },
  [ChainId.OraichainMainnet]: {
    rpc: 'https://rpc.orai.io',
    rest: 'https://lcd.orai.io',
  },
  [ChainId.ArchwayMainnet]: {
    rpc: 'https://archway-rpc.polkachu.com',
    rest: 'https://archway-api.polkachu.com',
  },
  [ChainId.BitsongTestnet]: {
    rpc: 'https://rpc-testnet.explorebitsong.com',
    rest: 'https://lcd-testnet.explorebitsong.com',
  },
  [ChainId.BitsongMainnet]: {
    rpc: 'https://rpc.explorebitsong.com',
    rest: 'https://lcd.explorebitsong.com',
  },
  [ChainId.OmniflixHubMainnet]: {
    rpc: 'https://omniflix-rpc.polkachu.com',
    rest: 'https://omniflix-api.polkachu.com',
  },
  [ChainId.OmniflixHubTestnet]: {
    rpc: 'https://rpc.testnet.omniflix.network',
    rest: 'https://api.testnet.omniflix.network',
  },
  [ChainId.SecretTestnet]: {
    rpc: 'https://rpc.pulsar.scrttestnet.com',
    rest: 'https://api.pulsar.scrttestnet.com',
  },
  [ChainId.BabylonTestnet]: {
    rpc: 'https://babylon-testnet-rpc.polkachu.com',
    rest: 'https://babylon-testnet-api.polkachu.com',
  },
  [ChainId.ThorchainStagenet]: {
    rpc: 'https://stagenet-rpc.ninerealms.com',
    rest: 'https://stagenet-thornode.ninerealms.com',
  },
  [ChainId.IntergazeMainnet]: {
    rpc: 'https://rpc.intergaze-apis.com',
    rest: 'https://rest.intergaze-apis.com',
  },
  [ChainId.DaodiseoTestnet]: {
    rpc: 'https://testnet-rpc.daodiseo.chaintools.tech',
    rest: 'https://testnet-api.daodiseo.chaintools.tech',
  },
  [ChainId.KopiMainnet]: {
    rpc: 'https://rpc.kopi.money',
    rest: 'https://rest.kopi.money',
  },
}

export const GAS_OVERRIDES: Partial<
  Record<
    ChainId,
    {
      amount: number
      denom: string
    }
  >
> = {
  [ChainId.KujiraTestnet]: {
    amount: 0.00125,
    denom: 'ukuji',
  },
}

// The chains not to show in the governance UI.
const NO_GOV_CHAIN_IDS = ['noble-1']

const convertChainToBaseChainConfig = (
  chain: AnyChain
): BaseChainConfig | undefined => {
  // Skip if chain already exists in configured chains.
  if (SUPPORTED_CHAINS.some((c) => c.chainId === chain.chainId)) {
    return
  }

  // Skip if no RPC exists for chain. Can't use `getRpcForChainId` helper
  // because that file depends on this one. Yay circular dependencies.
  if (
    !(chain.chainId in CHAIN_ENDPOINTS) &&
    !chain.chainRegistry?.apis?.rpc?.length
  ) {
    return
  }

  let explorerUrlTemplates: BaseChainConfig['explorerUrlTemplates'] = undefined
  const explorers = chain.chainRegistry?.explorers
  if (explorers) {
    const mintscanExplorer = explorers.find(
      (explorer) =>
        explorer.kind?.toLowerCase() === 'mintscan' &&
        explorer.url?.includes('mintscan.io')
    )
    if (mintscanExplorer) {
      explorerUrlTemplates = {
        tx: mintscanExplorer.url + '/txs/REPLACE',
        gov: mintscanExplorer.url + '/proposals',
        govProp: mintscanExplorer.url + '/proposals/REPLACE',
        wallet: mintscanExplorer.url + '/account/REPLACE',
      }
    }

    if (!explorerUrlTemplates) {
      const pingPubExplorer = explorers.find(
        (explorer) =>
          explorer.kind?.toLowerCase() === 'ping.pub' &&
          // Some explorers have kind = 'ping.pub' but the wrong URL.
          explorer.url?.includes('ping.pub')
      )
      if (pingPubExplorer) {
        explorerUrlTemplates = {
          tx: pingPubExplorer.url + '/tx/REPLACE',
          gov: pingPubExplorer.url + '/gov',
          govProp: pingPubExplorer.url + '/gov/REPLACE',
          wallet: pingPubExplorer.url + '/account/REPLACE',
        }
      }
    }

    if (!explorerUrlTemplates) {
      const atomScanExplorer = explorers.find(
        (explorer) =>
          explorer.kind?.toLowerCase() === 'atomscan' &&
          explorer.url?.includes('atomscan.com')
      )
      if (atomScanExplorer) {
        explorerUrlTemplates = {
          tx: atomScanExplorer.url + '/transactions/REPLACE',
          gov: atomScanExplorer.url + '/votes',
          govProp: atomScanExplorer.url + '/votes/REPLACE',
          wallet: atomScanExplorer.url + '/accounts/REPLACE',
        }
      }
    }

    if (!explorerUrlTemplates) {
      const bigDipperExplorer = explorers.find(
        (explorer) =>
          explorer.kind?.toLowerCase() === 'bigdipper' &&
          explorer.url?.includes('bigdipper.live')
      )
      if (bigDipperExplorer) {
        explorerUrlTemplates = {
          tx: bigDipperExplorer.url + '/transactions/REPLACE',
          gov: bigDipperExplorer.url + '/proposals',
          govProp: bigDipperExplorer.url + '/proposals/REPLACE',
          wallet: bigDipperExplorer.url + '/accounts/REPLACE',
        }
      }
    }

    if (!explorerUrlTemplates) {
      const explorersGuruExplorer = explorers.find(
        (explorer) =>
          explorer.kind?.toLowerCase() === 'explorers.guru' &&
          explorer.url?.includes('explorers.guru')
      )
      if (explorersGuruExplorer) {
        explorerUrlTemplates = {
          tx: explorersGuruExplorer.url + '/transaction/REPLACE',
          gov: explorersGuruExplorer.url + '/proposals',
          govProp: explorersGuruExplorer.url + '/proposals/REPLACE',
          wallet: explorersGuruExplorer.url + '/account/REPLACE',
        }
      }
    }

    if (!explorerUrlTemplates) {
      const stakeflowExplorer = explorers.find(
        (explorer) =>
          explorer.kind?.toLowerCase() === 'stakeflow' &&
          explorer.url?.includes('stakeflow.io')
      )
      if (stakeflowExplorer) {
        explorerUrlTemplates = {
          tx: stakeflowExplorer.url + '/transactions/REPLACE',
          gov: stakeflowExplorer.url + '/proposals',
          govProp: stakeflowExplorer.url + '/proposals/REPLACE',
          wallet: stakeflowExplorer.url + '/accounts/REPLACE',
        }
      }
    }
  }

  return {
    chainId: chain.chainId,
    name: chain.chainName,
    mainnet: chain.chainRegistry?.network_type === 'mainnet',
    accentColor: '',
    noGov: NO_GOV_CHAIN_IDS.includes(chain.chainId),
    explorerUrlTemplates,
  }
}
/**
 * All configured chains. Configured chains are either supported chains, which
 * DAO DAO is deployed on, or other chains that show up in the governance UI.
 */
export let CONFIGURED_CHAINS: BaseChainConfig[] = [
  ...SUPPORTED_CHAINS,
  // Add other chains from chain registry.
  ...(TEST_ENV
    ? []
    : chains
        .flatMap((chain) => convertChainToBaseChainConfig(chain) || [])
        .sort((a, b) => a.name.localeCompare(b.name))),
]

/**
 * Add a chain to the chains list and configured chains.
 *
 * For use in testing.
 */
export const _addChain = ({
  chain,
  rpcEndpoint,
  restEndpoint,
}: {
  chain: Chain | AnyChain
  rpcEndpoint: string
  restEndpoint: string
}) => {
  const anyChain =
    'chain_id' in chain ? convertChainRegistryChainToAnyChain(chain) : chain

  // Remove any existing chain with the same chain ID or name.
  chains = chains.filter(
    (c) => c.chainId !== anyChain.chainId && c.chainName !== anyChain.chainName
  )
  CONFIGURED_CHAINS = CONFIGURED_CHAINS.filter(
    (c) => c.chainId !== anyChain.chainId && c.name !== anyChain.chainName
  )
  SUPPORTED_CHAINS = SUPPORTED_CHAINS.filter(
    (c) => c.chainId !== anyChain.chainId && c.name !== anyChain.chainName
  )

  // Add the new chain.
  chains.push(anyChain)
  const baseChainConfig = convertChainToBaseChainConfig(anyChain)
  if (baseChainConfig) {
    CONFIGURED_CHAINS.push(baseChainConfig)
  }

  // Set preferred RPC and REST endpoints.
  CHAIN_ENDPOINTS[anyChain.chainId as keyof typeof CHAIN_ENDPOINTS] = {
    rpc: rpcEndpoint,
    rest: restEndpoint,
  }
}

/**
 * Add a supported chain.
 *
 * For use in testing.
 */
export const _addSupportedChain = ({
  chain,
  version,
  factoryContractAddress,
  explorerUrl,
}: {
  chain: Chain | AnyChain
  version: ContractVersion
  factoryContractAddress: string
  explorerUrl: string
}): SupportedChainConfig => {
  const anyChain =
    'chain_id' in chain ? convertChainRegistryChainToAnyChain(chain) : chain

  const baseExplorerUrl = `${explorerUrl}/${anyChain.chainId}`

  // Remove any existing chain with the same chain ID or name.
  SUPPORTED_CHAINS = SUPPORTED_CHAINS.filter(
    (c) => c.chainId !== anyChain.chainId && c.name !== anyChain.chainName
  )

  const config = convertConfiguredChainToSupportedChain({
    chainId: anyChain.chainId,
    name: anyChain.chainName,
    mainnet: false,
    accentColor: '',
    factoryContractAddress,
    noIndexer: true,
    explorerUrlTemplates: {
      tx: `${baseExplorerUrl}/tx/REPLACE`,
      gov: `${baseExplorerUrl}/gov`,
      govProp: `${baseExplorerUrl}/gov/REPLACE`,
      wallet: `${baseExplorerUrl}/account/REPLACE`,
    },
    latestVersion: version,
  })

  // Add to supported chains.
  SUPPORTED_CHAINS.push(config)

  return config
}
