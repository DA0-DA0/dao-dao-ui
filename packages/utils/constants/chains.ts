import { ChainId, PolytoneConfig, SupportedChainConfig } from '@dao-dao/types'

// Chains which DAO DAO DAOs exist on.
export const SUPPORTED_CHAINS: Partial<Record<ChainId, SupportedChainConfig>> =
  {
    [ChainId.JunoMainnet]: {
      name: 'juno',
      mainnet: true,
      factoryContractAddress:
        'juno1eeqgsjyqxcscpxwa6ut36py8vfpu6hxrwy62n2vgu8ud72wa9pyqv38q7y',
      supportsV1GovProposals: true,
      indexes: {
        search: 'daos',
        featured: 'featured_daos',
      },
      explorerUrlTemplates: {
        tx: 'https://ping.pub/juno/tx/REPLACE',
        gov: 'https://ping.pub/juno/gov',
        govProp: 'https://ping.pub/juno/gov/REPLACE',
        wallet: 'https://ping.pub/juno/account/REPLACE',
      },
      codeIds: {
        // https://github.com/CosmWasm/cw-plus
        Cw20Base: 1993, // v0.16
        Cw4Group: 1992, // v0.16
        // https://github.com/CosmWasm/cw-nfts
        Cw721Base: 1994, // v0.16

        // ContractVersion.V210
        // https://github.com/DA0-DA0/dao-contracts/releases/tag/v2.1.0
        Cw20Stake: 2444,
        CwAdminFactory: 2449,
        CwPayrollFactory: 2451,
        CwTokenSwap: 2452,
        CwVesting: 2453,
        DaoCore: 2454,
        DaoMigrator: 2455,
        DaoPreProposeMultiple: 2458,
        DaoPreProposeSingle: 2459,
        DaoProposalMultiple: 2461,
        DaoProposalSingle: 2462,
        DaoVotingCw20Staked: 2463,
        DaoVotingCw4: 2464,
        DaoVotingCw721Staked: 2465,
        DaoVotingNativeStaked: 2466,
      },
      polytone: {
        [ChainId.OsmosisMainnet]: {
          // juno
          note: 'juno1ads7gcpje0y5jxhtn3ntsqs8kg3ahch9u953jk6v0njq4l39m3us5sxw68',
          // juno
          listener:
            'juno1f2676a53wxnnp05ezch69hwp5lpxug5qm07lyeywlf57y9ghw46qylrshd',
          // osmosis
          voice:
            'osmo1af93h8xcszszes2a0kjms5zpm5ns3fys4aez2f40fgz428hc8aws28klzs',
          // juno
          localConnection: 'connection-0',
          // osmosis
          remoteConnection: 'connection-1142',
          // juno
          localChannel: 'channel-288',
          // osmosis
          remoteChannel: 'channel-1664',
          // juno
          // localClient: '07-tendermint-0',
          // osmosis
          // remoteClient: '07-tendermint-1457',
          needsSelfRelay: false,
        },
      },
    },
    [ChainId.OsmosisMainnet]: {
      name: 'osmosis',
      mainnet: true,
      factoryContractAddress:
        'osmo102pg8quxtvhye3k4rcqwh7j5zwf5ekhcvlquafjjxjnarhu38qzstkdm6p',
      supportsV1GovProposals: false,
      indexes: {
        search: 'osmosis_daos',
        // Use same as mainnet.
        featured: 'osmosis_featured_daos',
      },
      explorerUrlTemplates: {
        tx: 'https://ping.pub/osmosis/tx/REPLACE',
        gov: 'https://ping.pub/osmosis/gov',
        govProp: 'https://ping.pub/osmosis/gov/REPLACE',
        wallet: 'https://ping.pub/osmosis/account/REPLACE',
      },
      codeIds: {
        // https://github.com/CosmWasm/cw-plus
        Cw20Base: -1, // v0.16
        Cw4Group: 123, // v0.16
        // https://github.com/CosmWasm/cw-nfts
        Cw721Base: 124, // v0.16

        // ContractVersion.V210
        // https://github.com/DA0-DA0/dao-contracts/releases/tag/v2.1.0
        Cw20Stake: -1,
        CwAdminFactory: 113,
        CwPayrollFactory: 114,
        CwTokenSwap: 115,
        CwVesting: 116,
        DaoCore: 117,
        DaoMigrator: -1,
        DaoPreProposeMultiple: 118,
        DaoPreProposeSingle: 119,
        DaoProposalMultiple: 120,
        DaoProposalSingle: 121,
        DaoVotingCw20Staked: -1,
        DaoVotingCw4: 122,
        DaoVotingCw721Staked: -1,
        DaoVotingNativeStaked: -1,
      },
      polytone: {
        [ChainId.JunoMainnet]: {
          // osmosis
          note: 'osmo1zu9sa2yu9ffdk6pxsgjzgp56wqgyzdh8e0ndn7crr3d0xhvtj8uqdv3dqa',
          // osmosis
          listener:
            'osmo1jhwx9nunu4m3ajhvlm5vl2pltrhkltyawanp9c0qhxmxp940dessqh46k6',
          // juno
          voice:
            'juno1mkq8ggvmr7kzu85c9muud30nmdcv98050uxyqrqmmftlmag044gs3e0d0u',
          // osmosis
          localConnection: 'connection-1142',
          // juno
          remoteConnection: 'connection-0',
          // osmosis
          localChannel: 'channel-1656',
          // juno
          remoteChannel: 'channel-287',
          // osmosis
          // localClient: '07-tendermint-1457',
          // juno
          // remoteClient: '07-tendermint-0',
          needsSelfRelay: false,
        },
      },
    },
    // [ChainId.StargazeMainnet]: {
    //   name: 'stargaze',
    //   mainnet: true,
    //   // TODO
    //   factoryContractAddress: '',
    //   supportsV1GovProposals: false,
    //   indexes: {
    //     search: 'stargaze_daos',
    //     featured: 'stargaze_featured_daos',
    //   },
    //   explorerUrlTemplates: {
    //     tx: 'https://ping.pub/stargaze/tx/REPLACE',
    //     gov: 'https://ping.pub/stargaze/gov',
    //     govProp: 'https://ping.pub/stargaze/gov/REPLACE',
    //     wallet: 'https://ping.pub/stargaze/account/REPLACE',
    //   },
    //   codeIds: {
    //     // https://github.com/CosmWasm/cw-plus
    //     Cw20Base: -1, // v0.16
    //     Cw4Group: 000, // v0.16
    //     // https://github.com/CosmWasm/cw-nfts
    //     // TODO: sg721?
    //     Cw721Base: -1, // v0.16

    //     // ContractVersion.V210
    //     // https://github.com/DA0-DA0/dao-contracts/releases/tag/v2.1.0
    //     Cw20Stake: -1,
    //     CwAdminFactory: 000,
    //     CwPayrollFactory: 000,
    //     CwTokenSwap: 000,
    //     CwVesting: 000,
    //     DaoCore: 000,
    //     DaoMigrator: -1,
    //     DaoPreProposeMultiple: 000,
    //     DaoPreProposeSingle: 000,
    //     DaoProposalMultiple: 000,
    //     DaoProposalSingle: 000,
    //     DaoVotingCw20Staked: -1,
    //     DaoVotingCw4: 000,
    //     DaoVotingCw721Staked: -1,
    //     DaoVotingNativeStaked: -1,
    //   },
    // },
    [ChainId.JunoTestnet]: {
      name: 'juno',
      mainnet: false,
      factoryContractAddress:
        'juno1dacj3j6pwr7jx0jeu99qdc4a2ylc2rxp4v3zap54sfrl3ntrhe8qkjfpku',
      supportsV1GovProposals: true,
      indexes: {
        search: 'testnet_daos',
        featured: 'featured_daos',
      },
      explorerUrlTemplates: {
        tx: 'https://testnet.ping.pub/juno/tx/REPLACE',
        gov: 'https://testnet.ping.pub/juno/gov',
        govProp: 'https://testnet.ping.pub/juno/gov/REPLACE',
        wallet: 'https://testnet.ping.pub/juno/account/REPLACE',
      },
      codeIds: {
        // https://github.com/CosmWasm/cw-plus
        Cw20Base: 177,
        Cw4Group: 178,
        // https://github.com/CosmWasm/cw-nfts
        Cw721Base: 179,

        // ContractVersion.V210
        // https://github.com/DA0-DA0/dao-contracts/releases/tag/v2.1.0
        Cw20Stake: 1247,
        CwAdminFactory: 1250,
        CwPayrollFactory: 1252,
        CwTokenSwap: 1253,
        CwVesting: 1254,
        DaoCore: 1255,
        DaoMigrator: 1256,
        DaoPreProposeMultiple: 1258,
        DaoPreProposeSingle: 1259,
        DaoProposalMultiple: 1261,
        DaoProposalSingle: 1262,
        DaoVotingCw20Staked: 1263,
        DaoVotingCw4: 1264,
        DaoVotingCw721Staked: 1265,
        DaoVotingNativeStaked: 1266,
      },
    },
    [ChainId.OsmosisTestnet]: {
      name: 'osmosis',
      mainnet: false,
      factoryContractAddress:
        'osmo1v5k3527dt2vt67848h8jk0az9dyl8sunsqaapznf2j9tm4arxxfs7gwa0n',
      supportsV1GovProposals: false,
      indexes: {
        search: 'osmosis_testnet_daos',
        // Use same as mainnet.
        featured: 'osmosis_featured_daos',
      },
      explorerUrlTemplates: {
        tx: 'https://testnet.ping.pub/osmosis/tx/REPLACE',
        gov: 'https://testnet.ping.pub/osmosis/gov',
        govProp: 'https://testnet.ping.pub/osmosis/gov/REPLACE',
        wallet: 'https://testnet.ping.pub/osmosis/account/REPLACE',
      },
      codeIds: {
        // https://github.com/CosmWasm/cw-plus
        Cw20Base: -1, // v0.16
        Cw4Group: 1327, // v0.16
        // https://github.com/CosmWasm/cw-nfts
        Cw721Base: 1326, // v0.16

        // ContractVersion.V210
        // https://github.com/DA0-DA0/dao-contracts/releases/tag/v2.1.0
        Cw20Stake: -1,
        CwAdminFactory: 1312,
        CwPayrollFactory: 1313,
        CwTokenSwap: 1314,
        CwVesting: 1316,
        DaoCore: 1318,
        DaoMigrator: -1,
        DaoPreProposeMultiple: 1319,
        DaoPreProposeSingle: 1320,
        DaoProposalMultiple: 1322,
        DaoProposalSingle: 1323,
        DaoVotingCw20Staked: -1,
        DaoVotingCw4: 1324,
        DaoVotingCw721Staked: -1,
        DaoVotingNativeStaked: -1,
      },
    },
    [ChainId.StargazeTestnet]: {
      name: 'stargaze',
      mainnet: false,
      factoryContractAddress:
        'stars1ajrde5kky0c3xspjthqncxd72qmyu5trfsspn6ndk892gyqwakzsdjmegx',
      supportsV1GovProposals: false,
      indexes: {
        search: 'stargaze_testnet_daos',
        // Use same as mainnet.
        featured: 'stargaze_featured_daos',
      },
      explorerUrlTemplates: {
        tx: 'https://testnet.ping.pub/stargaze/tx/REPLACE',
        gov: 'https://testnet.ping.pub/stargaze/gov',
        govProp: 'https://testnet.ping.pub/stargaze/gov/REPLACE',
        wallet: 'https://testnet.ping.pub/stargaze/account/REPLACE',
      },
      codeIds: {
        // https://github.com/CosmWasm/cw-plus
        Cw20Base: -1, // v0.16
        Cw4Group: 2887, // v0.16
        // https://github.com/CosmWasm/cw-nfts
        // TODO: sg721?
        Cw721Base: -1, // v0.16

        // ContractVersion.V210
        // https://github.com/DA0-DA0/dao-contracts/releases/tag/v2.1.0
        Cw20Stake: -1,
        CwAdminFactory: 2888,
        CwPayrollFactory: 2889,
        CwTokenSwap: 2890,
        CwVesting: 2891,
        DaoCore: 2892,
        DaoMigrator: -1,
        DaoPreProposeMultiple: 2882,
        DaoPreProposeSingle: 2883,
        DaoProposalMultiple: 2884,
        DaoProposalSingle: 2885,
        DaoVotingCw20Staked: -1,
        DaoVotingCw4: 2886,
        DaoVotingCw721Staked: -1,
        DaoVotingNativeStaked: -1,
      },
    },
  }

export const POLYTONE_CONFIG_PER_CHAIN: [ChainId, PolytoneConfig][] =
  Object.entries(SUPPORTED_CHAINS).map(([chainId, { polytone = {} }]) => [
    chainId as ChainId,
    polytone,
  ])

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
    rpc: 'https://juno-rpc.reece.sh',
    rest: 'https://juno-api.reece.sh',
  },
  [ChainId.JunoTestnet]: {
    rpc: 'https://uni-rpc.reece.sh',
    rest: 'https://uni-api.reece.sh',
  },
  [ChainId.OsmosisMainnet]: {
    rpc: 'https://osmosis-mainnet-rpc.indexer.zone',
    rest: 'https://lcd.osmosis.zone',
  },
  [ChainId.OsmosisTestnet]: {
    rpc: 'https://osmosis-testnet-rpc.indexer.zone',
    rest: 'https://lcd.testnet.osmosis.zone',
  },
  [ChainId.StargazeMainnet]: {
    rpc: 'https://rpc.stargaze-apis.com',
    rest: 'https://rest.stargaze-apis.com',
  },
  [ChainId.StargazeTestnet]: {
    rpc: 'https://rpc.elgafar-1.stargaze-apis.com',
    rest: 'https://rest.elgafar-1.stargaze-apis.com',
  },
}
