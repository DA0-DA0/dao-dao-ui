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
import _ALL_POLYTONE from './polytone.json'

const ALL_CODE_HASHES = _ALL_CODE_HASHES as unknown as Partial<
  Record<ChainId, Partial<Record<ContractVersion, CodeHashConfig>>>
>
const ALL_CODE_IDS = _ALL_CODE_IDS as unknown as Partial<
  Record<ChainId, Partial<Record<ContractVersion, CodeIdConfig>>>
>
const ALL_POLYTONE = _ALL_POLYTONE as unknown as Partial<
  Record<ChainId, PolytoneConfig>
>

export const convertChainRegistryChainToAnyChain = (
  chain: Chain
): AnyChain => ({
  chainId: chain.chain_id,
  chainName: chain.chain_name,
  bech32Prefix: chain.bech32_prefix,
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

// BitSong Testnet
const bitSongTestnetChain = convertChainRegistryChainToAnyChain({
  ...chains.find((c) => c.chainId === ChainId.BitsongMainnet)!.chainRegistry!,
  chain_id: ChainId.BitsongTestnet,
  chain_name: 'bitsongtestnet',
  status: 'live',
  network_type: 'testnet',
  pretty_name: 'BitSong Testnet',
  apis: {
    rpc: [
      {
        address: 'https://rpc-testnet.explorebitsong.com',
      },
    ],
    rest: [
      {
        address: 'https://lcd-testnet.explorebitsong.com',
      },
    ],
  },
})
chains.push(bitSongTestnetChain)
assets.push({
  chain_name: bitSongTestnetChain.chainName,
  // Copy assets from BitSong mainnet.
  assets: assets.find((a) => a.chain_name === 'bitsong')?.assets ?? [],
})

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

// Remove thorchain and althea since they spam the console.
const chainsToRemove = ['thorchain', 'althea']
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
]

/**
 * Chains where DAO DAO is deployed.
 */
const BASE_SUPPORTED_CHAINS: Omit<
  SupportedChainConfig,
  'codeIds' | 'allCodeIds' | 'codeHashes' | 'allCodeHashes' | 'polytone'
>[] = [
  {
    chainId: ChainId.CosmosHubMainnet,
    name: 'cosmos',
    mainnet: true,
    accentColor: '#5064fb',
    factoryContractAddress:
      'cosmos18cszlvm6pze0x9sz32qnjq4vtd45xehqs8dq7cwy8yhq35wfnn3q795n8y',
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
    latestVersion: ContractVersion.V250,
  },
  {
    chainId: ChainId.JunoMainnet,
    name: 'juno',
    mainnet: true,
    accentColor: '#f74a49',
    factoryContractAddress:
      'juno19c75u4zdthjcnyz4nv7d85n99erwzzjlr3dm64l0wkpquf0y3easzfesvt',
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
    latestVersion: ContractVersion.V250,
  },
  {
    chainId: ChainId.OsmosisMainnet,
    name: 'osmosis',
    mainnet: true,
    accentColor: '#5604e8',
    factoryContractAddress:
      'osmo1nqxfazrmuvzaka3k2zy6xqzxalhw0mdzde3navda96ch005u0lxspwyk3q',
    kado: {
      network: 'OSMOSIS',
    },
    explorerUrlTemplates: {
      tx: 'https://ping.pub/osmosis/tx/REPLACE',
      gov: 'https://ping.pub/osmosis/gov',
      govProp: 'https://ping.pub/osmosis/gov/REPLACE',
      wallet: 'https://ping.pub/osmosis/account/REPLACE',
    },
    latestVersion: ContractVersion.V250,
  },
  {
    chainId: ChainId.NeutronMainnet,
    name: 'neutron',
    mainnet: true,
    accentColor: '#000000',
    factoryContractAddress:
      'neutron1xsvrsy4m37pay0fkd6ur75hsl8p6netvxvzvpvj7h4tsp9udxuysqxpuzh',
    govContractAddress: NEUTRON_GOVERNANCE_DAO,
    subDaos: [
      'neutron1fuyxwxlsgjkfjmxfthq8427dm2am3ya3cwcdr8gls29l7jadtazsuyzwcc',
      'neutron1zjdv3u6svlazlydmje2qcp44yqkt0059chz8gmyl5yrklmgv6fzq9chelu',
    ],
    explorerUrlTemplates: {
      tx: 'https://neutron.celat.one/neutron-1/txs/REPLACE',
      wallet: 'https://neutron.celat.one/neutron-1/accounts/REPLACE',
    },
    latestVersion: ContractVersion.V250,
    valence: {
      servicesManager:
        'neutron1gantvpnat0la8kkkzrnj48d5d8wxdjllh5r2w4r2hcrpwy00s69quypupa',
      rebalancer:
        'neutron1qs6mzpmcw3dvg5l8nyywetcj326scszdj7v4pfk55xwshd4prqnqfwc0z2',
    },
  },
  {
    chainId: ChainId.StargazeMainnet,
    name: 'stargaze',
    mainnet: true,
    accentColor: '#8ac3cc',
    factoryContractAddress:
      'stars14reqfce75ayjkdyce0rkfea45y0eh283zgychdjtjkyfxsy28nmqprzf60',
    explorerUrlTemplates: {
      tx: 'https://ping.pub/stargaze/tx/REPLACE',
      gov: 'https://ping.pub/stargaze/gov',
      govProp: 'https://ping.pub/stargaze/gov/REPLACE',
      wallet: 'https://ping.pub/stargaze/account/REPLACE',
    },
    latestVersion: ContractVersion.V250,
  },
  {
    chainId: ChainId.MigalooMainnet,
    name: 'migaloo',
    mainnet: true,
    accentColor: '#3ccd64',
    factoryContractAddress:
      'migaloo1pz5adchq4wqdhajnpdc5j4k86xr6z9lv5wdpv5eqpvjz0fsk8h6s6f2vm5',
    explorerUrlTemplates: {
      tx: 'https://inbloc.org/migaloo/transactions/REPLACE',
      gov: 'https://inbloc.org/migaloo/governance',
      govProp: 'https://inbloc.org/migaloo/proposal/REPLACE',
      wallet: 'https://inbloc.org/migaloo/account/REPLACE',
    },
    latestVersion: ContractVersion.V250,
  },
  {
    chainId: ChainId.TerraMainnet,
    name: 'terra',
    mainnet: true,
    overrideChainImageUrl: '/chains/terra.png',
    accentColor: '#113da5',
    factoryContractAddress:
      'terra1kyj0sgjugpmau8ee37vde3rssxe9ztwh8g98pmmxcr7w2prh9hfqfwhsz7',
    explorerUrlTemplates: {
      tx: 'https://finder.terra.money/mainnet/tx/REPLACE',
      gov: 'https://ping.pub/terra/gov',
      govProp: 'https://ping.pub/terra/gov/REPLACE',
      wallet: 'https://finder.terra.money/mainnet/address/REPLACE',
    },
    tokenDaoType: 'both',
    latestVersion: ContractVersion.V250,
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
      'terra18d67ywrfwxq6924xdsg4ahrsjrtuvnu0q5v0ttj07fakw2thspps2fn9yy',
    explorerUrlTemplates: {
      tx: 'https://finder.terra-classic.hexxagon.io/mainnet/tx/REPLACE',
      gov: 'https://ping.pub/terra-luna/gov',
      govProp: 'https://ping.pub/terra-luna/gov/REPLACE',
      wallet:
        'https://finder.terra-classic.hexxagon.io/mainnet/address/REPLACE',
    },
    tokenDaoType: TokenType.Cw20,
    latestVersion: ContractVersion.V250,
  },
  {
    chainId: ChainId.OraichainMainnet,
    name: 'oraichain',
    mainnet: true,
    overrideChainImageUrl: '/chains/oraichain.svg',
    accentColor: '#ffffff',
    factoryContractAddress:
      'orai1d53g4e9gpnj5asr8kf9pfn7zpg0yr0cksllyaqc75m4rmxwu6sqqnxpjnm',
    explorerUrlTemplates: {
      tx: 'https://scan.orai.io/txs/REPLACE',
      gov: 'https://scan.orai.io/proposals',
      govProp: 'https://scan.orai.io/proposals/REPLACE',
      wallet: 'https://scan.orai.io/account/REPLACE',
    },
    tokenDaoType: TokenType.Cw20,
    latestVersion: ContractVersion.V250,
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
      gov: 'https://blue.kujira.network/govern',
      govProp: 'https://blue.kujira.network/govern/REPLACE',
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
      'bitsong1vdqwdy564mz4cl23nmlgma3c336tsla9vzpw2qrdj5f8w5qgp7pq39h464',
    tokenCreationFactoryAddress:
      'bitsong16jp4jd68hzpc9a88mqcg3mnktjhgrlyv96shx4zvt522zzq99afsdldd04',
    explorerUrlTemplates: {
      tx: 'https://ping.pub/bitsong/tx/REPLACE',
      gov: 'https://ping.pub/bitsong/gov',
      govProp: 'https://ping.pub/bitsong/gov/REPLACE',
      wallet: 'https://ping.pub/bitsong/account/REPLACE',
    },
    latestVersion: ContractVersion.V250,
  },
  {
    chainId: ChainId.OmniflixHubMainnet,
    name: 'omniflixhub',
    mainnet: true,
    accentColor: '#d71d6a',
    factoryContractAddress:
      'omniflix1zrhumzxl9hexjwh95te3as6fcjv46cty8z8ephtg70f5am3pw46sk93q7l',
    explorerUrlTemplates: {
      tx: 'https://ping.pub/omniflixhub/tx/REPLACE',
      gov: 'https://ping.pub/omniflixhub/gov',
      govProp: 'https://ping.pub/omniflixhub/gov/REPLACE',
      wallet: 'https://ping.pub/omniflixhub/account/REPLACE',
    },
    latestVersion: ContractVersion.V250,
  },
  {
    chainId: ChainId.CosmosHubThetaTestnet,
    name: 'cosmos',
    mainnet: false,
    accentColor: '#5064fb',
    factoryContractAddress:
      'cosmos124x902fdvdcaawkr7njtjtccx94jq5vq4vtw6mhshxlrjqqxezqq8upgs2',
    explorerUrlTemplates: {
      tx: 'https://explorer.polypore.xyz/theta-testnet-001/tx/REPLACE',
      gov: 'https://explorer.polypore.xyz/theta-testnet-001/gov',
      govProp: 'https://explorer.polypore.xyz/theta-testnet-001/gov/REPLACE',
      wallet: 'https://explorer.polypore.xyz/theta-testnet-001/account/REPLACE',
    },
    // Disable token creation.
    noTokenFactory: true,
    daoCreatorDisabled: {
      // No NFTs on the Hub.
      [NftBasedCreatorId]: 'unsupported',
    },
    latestVersion: ContractVersion.V250,
  },
  {
    chainId: ChainId.CosmosHubProviderTestnet,
    name: 'cosmosprovider',
    mainnet: false,
    accentColor: '#5064fb',
    factoryContractAddress:
      'cosmos1m66772ud8vcx4rhng94qtfusqcslwuszaehmwf23uw27q7ts4yssxedn2z',
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
    latestVersion: ContractVersion.V250,
  },
  {
    chainId: ChainId.JunoTestnet,
    name: 'juno',
    mainnet: false,
    accentColor: '#f74a49',
    factoryContractAddress:
      'juno1f5shaaqhe87mfsx8kvhur8a3ml9kgn466ez59aa6kut7wr5yas6qwhsu9r',
    explorerUrlTemplates: {
      tx: 'https://testnet.ping.pub/juno/tx/REPLACE',
      gov: 'https://testnet.ping.pub/juno/gov',
      govProp: 'https://testnet.ping.pub/juno/gov/REPLACE',
      wallet: 'https://testnet.ping.pub/juno/account/REPLACE',
    },
    latestVersion: ContractVersion.V250,
  },
  {
    chainId: ChainId.OsmosisTestnet,
    name: 'osmosis',
    mainnet: false,
    accentColor: '#5604e8',
    factoryContractAddress:
      'osmo1s8q5jkhpjg7qn353pxhjsuh9jytrufj7wyg5ekfx5y0qjnd0rzdqapyuu7',
    explorerUrlTemplates: {
      tx: 'https://testnet.ping.pub/osmosis/tx/REPLACE',
      gov: 'https://testnet.ping.pub/osmosis/gov',
      govProp: 'https://testnet.ping.pub/osmosis/gov/REPLACE',
      wallet: 'https://testnet.ping.pub/osmosis/account/REPLACE',
    },
    latestVersion: ContractVersion.V250,
  },
  {
    chainId: ChainId.StargazeTestnet,
    name: 'stargaze',
    mainnet: false,
    accentColor: '#8ac3cc',
    factoryContractAddress:
      'stars1u0fdpc8c2raq8g8pwwz4x7203l47ht0u362f6vq699yghuedgmaq9sfrav',
    explorerUrlTemplates: {
      tx: 'https://testnet.ping.pub/stargaze/tx/REPLACE',
      gov: 'https://testnet.ping.pub/stargaze/gov',
      govProp: 'https://testnet.ping.pub/stargaze/gov/REPLACE',
      wallet: 'https://testnet.ping.pub/stargaze/account/REPLACE',
    },
    latestVersion: ContractVersion.V250,
  },
  {
    chainId: ChainId.MigalooTestnet,
    name: 'migaloo',
    mainnet: false,
    accentColor: '#3ccd64',
    factoryContractAddress:
      'migaloo1fwv8685jxcy5llcxppmwuyauez64j49jw7e3pvtvwtsh3gqmt82ssqeekn',
    explorerUrlTemplates: {
      tx: 'https://testnet.ping.pub/migaloo/tx/REPLACE',
      gov: 'https://testnet.ping.pub/migaloo/gov',
      govProp: 'https://testnet.ping.pub/migaloo/gov/REPLACE',
      wallet: 'https://testnet.ping.pub/migaloo/account/REPLACE',
    },
    latestVersion: ContractVersion.V250,
  },
  {
    chainId: ChainId.KujiraTestnet,
    name: 'kujira',
    mainnet: false,
    accentColor: '#e53935',
    factoryContractAddress:
      'kujira10nywn24vstw6wdc6dsmlgpzjqdkfnx0ful5unj5syz5wk4ams4xstch5zp',
    explorerUrlTemplates: {
      tx: 'https://finder.kujira.network/harpoon-4/tx/REPLACE',
      // TODO(kujira-testnet): fix once can link directly to testnet
      // gov: 'https://blue.kujira.network/govern',
      // TODO(kujira-testnet): fix once can link directly to testnet
      // govProp: 'https://blue.kujira.network/govern/REPLACE',
      wallet: 'https://finder.kujira.network/harpoon-4/address/REPLACE',
    },
    latestVersion: ContractVersion.V250,
  },
  {
    chainId: ChainId.NeutronTestnet,
    name: 'neutron',
    mainnet: false,
    accentColor: '#000000',
    factoryContractAddress:
      'neutron1ujfsy8m04mxxam3az6hfxfp2rlky0vk32pknjcwv0weu2fcc2n9sxup3sd',
    govContractAddress: NEUTRON_GOVERNANCE_DAO,
    explorerUrlTemplates: {
      tx: 'https://neutron.celat.one/pion-1/txs/REPLACE',
      wallet: 'https://neutron.celat.one/pion-1/accounts/REPLACE',
    },
    latestVersion: ContractVersion.V250,
  },
  {
    chainId: ChainId.BitsongTestnet,
    name: 'bitsong',
    mainnet: false,
    accentColor: '#c53381',
    factoryContractAddress:
      'bitsong13rz2vj79hw3rnynd78qfa8tl0x6qc379fcdgr0j30mplaz3g077s8r425g',
    tokenCreationFactoryAddress:
      'bitsong13ackt4dv4ngt4jpngnvyyecjhu33w6gge3mad3n9vc0qkqcrk6cqzfm9vx',
    latestVersion: ContractVersion.V250,
  },
  {
    chainId: ChainId.OmniflixHubTestnet,
    name: 'omniflixhub',
    mainnet: false,
    accentColor: '#d71d6a',
    factoryContractAddress:
      'omniflix1g0du5fgvjqgkzpd6pk63utsay29vjjnyfshp7dwn6r20xexyq23skygsss',
    explorerUrlTemplates: {
      tx: 'https://testnet.ping.pub/omniflix/tx/REPLACE',
      gov: 'https://testnet.ping.pub/omniflix/gov',
      govProp: 'https://testnet.ping.pub/omniflix/gov/REPLACE',
      wallet: 'https://testnet.ping.pub/omniflix/account/REPLACE',
    },
    latestVersion: ContractVersion.V250,
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
]

// Extract info from JSON config.
export const SUPPORTED_CHAINS: SupportedChainConfig[] =
  BASE_SUPPORTED_CHAINS.map((chain): SupportedChainConfig => {
    // Type-check to ensure chain code IDs are present in JSON.
    const allCodeIds = ALL_CODE_IDS[chain.chainId]
    if (!allCodeIds) {
      throw new Error(`No code IDs found for chain ${chain.chainId}`)
    }

    // Type-check to ensure correct version of code IDs are present in JSON.
    const codeIds = allCodeIds[chain.latestVersion]
    if (!codeIds) {
      throw new Error(
        `Version ${chain.latestVersion} code IDs not found for chain ${chain.chainId}`
      )
    }

    return {
      ...chain,
      codeIds,
      allCodeIds,
      codeHashes: ALL_CODE_HASHES[chain.chainId]?.[chain.latestVersion],
      allCodeHashes: ALL_CODE_HASHES[chain.chainId],
      polytone: ALL_POLYTONE[chain.chainId],
    }
  })

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
    rpc: 'https://juno-rpc.kleomedes.network',
    rest: 'https://juno-api.kleomedes.network',
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
    rpc: 'https://rpc.stargaze-apis.com',
    rest: 'https://rest.stargaze-apis.com',
  },
  [ChainId.StargazeTestnet]: {
    rpc: 'https://rpc.elgafar-1.stargaze-apis.com',
    rest: 'https://rest.elgafar-1.stargaze-apis.com',
  },
  [ChainId.NeutronMainnet]: {
    rpc: 'https://rpc-lb.neutron.org',
    rest: 'https://rest-lb.neutron.org',
  },
  [ChainId.NeutronTestnet]: {
    rpc: 'https://rpc-falcron.pion-1.ntrn.tech',
    rest: 'https://rest-falcron.pion-1.ntrn.tech',
  },
  [ChainId.CosmosHubMainnet]: {
    rpc: 'https://cosmos-rpc.polkachu.com',
    rest: 'https://cosmos-api.polkachu.com',
  },
  [ChainId.CosmosHubThetaTestnet]: {
    rpc: 'https://rpc.sentry-01.theta-testnet.polypore.xyz',
    rest: 'https://rest.sentry-01.theta-testnet.polypore.xyz',
  },
  [ChainId.CosmosHubProviderTestnet]: {
    rpc: 'https://rpc.provider-sentry-01.rs-testnet.polypore.xyz',
    rest: 'https://rest.provider-sentry-01.rs-testnet.polypore.xyz',
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

/**
 * All configured chains. Configured chains are either supported chains, which
 * DAO DAO is deployed on, or other chains that show up in the governance UI.
 */
export const CONFIGURED_CHAINS: BaseChainConfig[] = [
  ...SUPPORTED_CHAINS,
  // Add other chains from chain registry.
  ...chains
    .flatMap((chain): BaseChainConfig | [] => {
      // Skip if chain already exists in configured chains.
      if (SUPPORTED_CHAINS.some((c) => c.chainId === chain.chainId)) {
        return []
      }

      // Skip if no RPC exists for chain. Can't use `getRpcForChainId` helper
      // because that file depends on this one. Yay circular dependencies.
      if (
        !(chain.chainId in CHAIN_ENDPOINTS) &&
        !chain.chainRegistry?.apis?.rpc?.length
      ) {
        return []
      }

      let explorerUrlTemplates: BaseChainConfig['explorerUrlTemplates'] =
        undefined
      const explorers = chain.chainRegistry?.explorers
      if (explorers) {
        const pingPubOrMintscanExplorer =
          explorers.find(
            (explorer) =>
              explorer.kind?.toLowerCase() === 'ping.pub' &&
              // Some explorers have kind = 'ping.pub' but the wrong URL.
              explorer.url?.includes('ping.pub')
          ) ||
          explorers.find(
            (explorer) =>
              explorer.kind?.toLowerCase() === 'mintscan' &&
              explorer.url?.includes('mintscan.io')
          )
        if (pingPubOrMintscanExplorer) {
          explorerUrlTemplates = {
            tx: pingPubOrMintscanExplorer.url + '/tx/REPLACE',
            gov: pingPubOrMintscanExplorer.url + '/gov',
            govProp: pingPubOrMintscanExplorer.url + '/gov/REPLACE',
            wallet: pingPubOrMintscanExplorer.url + '/account/REPLACE',
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
    })
    .sort((a, b) => a.name.localeCompare(b.name)),
]
