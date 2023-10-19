import {Contracts, Templates} from './types'
import { loadEnv } from './utils/loadEnv';

loadEnv();

export const WRAPPR_WIDGET_ID = 'wrappr'

export enum Environment {
  DEVNET = "devnet",
  TESTNET = "testnet",
  MAINNET = "mainnet",
}

export const ENVIRONMENT = "testnet" as Environment;

export const COSMOS_PROXY_RPC_TESTNET = "https://testnet.rpc.axelar.dev";
export const COSMOS_PROXY_RPC_MAINNET = "https://mainnet.rpc.axelar.dev";


export const wrapprMainnetChains = [
    { value: 'Avalanche', label: 'Avalanche'},
    { value: 'arbitrum', label: 'Arbitrum'},
    { value: 'binance', label: 'Binance'},
    { value: 'Ethereum', label: 'Ethereum'},
    { value: 'evmos', label: 'Evmos'},
    { value: 'Fantom', label: 'Fantom'},
    { value: 'optimism', label: 'Optimism'},
    { value: 'Polygon', label: 'Polygon'},
  ]

  export const templates: Templates = {
    deLLC: ['name', 'ricardianId'],
    wyLLC: ['name', 'ricardianId'],
    deUNA: ['name', 'ricardianId', 'mission'],
    wyUNA: ['name', 'ricardianId', 'mission'],
    lexCharter: ['name', 'ricardianId', 'mission', 'jurisdiction'],
  }

export const deployments: { [key: number]: Contracts } = {
    // Ethereum
    1: {
      factory: '0xA945f46Ca376B18fB34d809ef4F21f9b58AE4C50',
      deLLC: '0xaC4EF9D6fC426f8fFd188771d9C688890b634462',
      wyLLC: '0x8d18D533047129dF8172feC7931a3933C47645D2',
      miLLC: '0xee06D1Eb614003f081F2A98F5e6a8135eBa99AF3',
      deUNA: '0xE22ebfbD3e6609A9550a86545E37af7DE1EE688b',
      wyUNA: '0x73Af00b92073D93b47e1077f796A3D6A12F63909',
      lexCharter: '0xa958f8D815a037E8eDe8194DAD70f9A3f3f94041',
      orCharter: '0x5228eBc680BA2Ac70A8dB9FBF01CEAaC9Dd9b2Ea',
      subgraph: 'https://api.thegraph.com/subgraphs/name/nerderlyne/wrappr-mainnet',
    },
    // Optimism
    10: {
      factory: '0xA945f46Ca376B18fB34d809ef4F21f9b58AE4C50',
      deLLC: '0xaC4EF9D6fC426f8fFd188771d9C688890b634462',
      wyLLC: '0x8d18D533047129dF8172feC7931a3933C47645D2',
      miLLC: '',
      deUNA: '0xE22ebfbD3e6609A9550a86545E37af7DE1EE688b',
      wyUNA: '0x73Af00b92073D93b47e1077f796A3D6A12F63909',
      lexCharter: '0xa958f8D815a037E8eDe8194DAD70f9A3f3f94041',
      orCharter: '0x5228eBc680BA2Ac70A8dB9FBF01CEAaC9Dd9b2Ea',
      subgraph: 'https://api.thegraph.com/subgraphs/name/nerderlyne/wrappr-optimism',
    },
    // Binance
    56: {
      factory: '0xA945f46Ca376B18fB34d809ef4F21f9b58AE4C50',
      deLLC: '0xaC4EF9D6fC426f8fFd188771d9C688890b634462',
      wyLLC: '0x8d18D533047129dF8172feC7931a3933C47645D2',
      miLLC: '0xee06D1Eb614003f081F2A98F5e6a8135eBa99AF3',
      deUNA: '0xE22ebfbD3e6609A9550a86545E37af7DE1EE688b',
      wyUNA: '0x73Af00b92073D93b47e1077f796A3D6A12F63909',
      lexCharter: '0xa958f8D815a037E8eDe8194DAD70f9A3f3f94041',
      orCharter: '0x5228eBc680BA2Ac70A8dB9FBF01CEAaC9Dd9b2Ea',
      subgraph: 'https://api.thegraph.com/subgraphs/name/nerderlyne/wrappr-bsc',
    },
    // Gnosis
    100: {
      factory: '0xA945f46Ca376B18fB34d809ef4F21f9b58AE4C50',
      deLLC: '0xaC4EF9D6fC426f8fFd188771d9C688890b634462',
      wyLLC: '0x8d18D533047129dF8172feC7931a3933C47645D2',
      miLLC: '0xee06D1Eb614003f081F2A98F5e6a8135eBa99AF3',
      deUNA: '0xE22ebfbD3e6609A9550a86545E37af7DE1EE688b',
      wyUNA: '0x73Af00b92073D93b47e1077f796A3D6A12F63909',
      lexCharter: '0xa958f8D815a037E8eDe8194DAD70f9A3f3f94041',
      orCharter: '0x5228eBc680BA2Ac70A8dB9FBF01CEAaC9Dd9b2Ea',
      subgraph: 'https://api.thegraph.com/subgraphs/name/nerderlyne/wrappr-xdai',
    },
    // Polygon
    137: {
      factory: '0xA945f46Ca376B18fB34d809ef4F21f9b58AE4C50',
      deLLC: '0xaC4EF9D6fC426f8fFd188771d9C688890b634462',
      wyLLC: '0x8d18D533047129dF8172feC7931a3933C47645D2',
      miLLC: '0xee06D1Eb614003f081F2A98F5e6a8135eBa99AF3',
      deUNA: '0xE22ebfbD3e6609A9550a86545E37af7DE1EE688b',
      wyUNA: '0x73Af00b92073D93b47e1077f796A3D6A12F63909',
      lexCharter: '0xa958f8D815a037E8eDe8194DAD70f9A3f3f94041',
      orCharter: '0x5228eBc680BA2Ac70A8dB9FBF01CEAaC9Dd9b2Ea',
      subgraph: 'https://api.thegraph.com/subgraphs/name/nerderlyne/wrappr-matic',
    },
    // Fantom
    250: {
      factory: '0xA945f46Ca376B18fB34d809ef4F21f9b58AE4C50',
      deLLC: '0xaC4EF9D6fC426f8fFd188771d9C688890b634462',
      wyLLC: '0x8d18D533047129dF8172feC7931a3933C47645D2',
      miLLC: '',
      deUNA: '0xE22ebfbD3e6609A9550a86545E37af7DE1EE688b',
      wyUNA: '0x73Af00b92073D93b47e1077f796A3D6A12F63909',
      lexCharter: '0xa958f8D815a037E8eDe8194DAD70f9A3f3f94041',
      orCharter: '0x5228eBc680BA2Ac70A8dB9FBF01CEAaC9Dd9b2Ea',
    },
    // Arbitrum
    42161: {
      factory: '0xA945f46Ca376B18fB34d809ef4F21f9b58AE4C50',
      deLLC: '0xaC4EF9D6fC426f8fFd188771d9C688890b634462',
      wyLLC: '0x8d18D533047129dF8172feC7931a3933C47645D2',
      miLLC: '',
      deUNA: '0xE22ebfbD3e6609A9550a86545E37af7DE1EE688b',
      wyUNA: '0x73Af00b92073D93b47e1077f796A3D6A12F63909',
      lexCharter: '0xa958f8D815a037E8eDe8194DAD70f9A3f3f94041',
      orCharter: '0x5228eBc680BA2Ac70A8dB9FBF01CEAaC9Dd9b2Ea',
      subgraph: 'https://api.thegraph.com/subgraphs/name/nerderlyne/wrappr-arbitrum',
    },
    // // Nova
    // 42170: {
    //   factory: '0xA945f46Ca376B18fB34d809ef4F21f9b58AE4C50',
    //   deLLC: '0xaC4EF9D6fC426f8fFd188771d9C688890b634462',
    //   wyLLC: '0x8d18D533047129dF8172feC7931a3933C47645D2',
    //   miLLC: '',
    //   deUNA: '0xE22ebfbD3e6609A9550a86545E37af7DE1EE688b',
    //   wyUNA: '0x73Af00b92073D93b47e1077f796A3D6A12F63909',
    //   orCharter: '0x5228eBc680BA2Ac70A8dB9FBF01CEAaC9Dd9b2Ea',
    //   lexCharter: '0xa958f8D815a037E8eDe8194DAD70f9A3f3f94041',
    // },
    // Avalanche
    43114: {
      factory: '0xA945f46Ca376B18fB34d809ef4F21f9b58AE4C50',
      deLLC: '0xaC4EF9D6fC426f8fFd188771d9C688890b634462',
      wyLLC: '0x8d18D533047129dF8172feC7931a3933C47645D2',
      miLLC: '',
      deUNA: '0xE22ebfbD3e6609A9550a86545E37af7DE1EE688b',
      wyUNA: '0x73Af00b92073D93b47e1077f796A3D6A12F63909',
      lexCharter: '0xa958f8D815a037E8eDe8194DAD70f9A3f3f94041',
      orCharter: '0x5228eBc680BA2Ac70A8dB9FBF01CEAaC9Dd9b2Ea',
      subgraph: 'https://api.thegraph.com/subgraphs/name/nerderlyne/wrappr-avalanche',
    },
    // Q
    35441: {
      factory: '',
      deLLC: '',
      wyLLC: '',
      miLLC: '',
      deUNA: '',
      wyUNA: '',
      lexCharter: '',
      orCharter: '',
      subgraph: '',
    },
    // Goerli
    5: {
      testnet: true,
      factory: '0xA945f46Ca376B18fB34d809ef4F21f9b58AE4C50',
      deLLC: '0xaC4EF9D6fC426f8fFd188771d9C688890b634462',
      wyLLC: '0x8d18D533047129dF8172feC7931a3933C47645D2',
      miLLC: '0xee06D1Eb614003f081F2A98F5e6a8135eBa99AF3',
      deUNA: '0xE22ebfbD3e6609A9550a86545E37af7DE1EE688b',
      wyUNA: '0x73Af00b92073D93b47e1077f796A3D6A12F63909',
      lexCharter: '0xa958f8D815a037E8eDe8194DAD70f9A3f3f94041',
      orCharter: '0x5228eBc680BA2Ac70A8dB9FBF01CEAaC9Dd9b2Ea',
      subgraph: 'https://api.thegraph.com/subgraphs/name/nerderlyne/wrappr-goerli',
    },
    // // Q Testnet
    // 35443: {
    //   testnet: true,
    //   factory: '0xB96b13E38caBF09A79A8b6a427FBB9e09A1aB6b2',
    //   deLLC: '0xaE8F59941A169cfA9C55E9213f7c50409973DB01',
    //   wyLLC: '0xB18D52C4662b2F9b9a860406ab6aA5D9C79d8b88',
    //   miLLC: '0x119Aef39481c2b7e683Fb1015a10EF8C75A5BF94',
    //   deUNA: '0x61FDc87e3BFE16874099650041Db3e11B005d69c',
    //   wyUNA: '0x1CEa1b21eE8Cb62ea97c54D0454E10b387bd0AA1',
    //   lexCharter: '0xa585417062dcB987cBf197F712532cBBcf7f95D5',
    //   orCharter: '0xdEe39515DB9366E1b80168190f7FE78bcbD29E5b',
    // },
  }