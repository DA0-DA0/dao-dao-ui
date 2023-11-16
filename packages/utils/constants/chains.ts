import { ChainId, PolytoneConfig, SupportedChainConfig } from '@dao-dao/types'

// Chains which DAO DAO DAOs exist on.
export const SUPPORTED_CHAINS: Partial<Record<ChainId, SupportedChainConfig>> =
  {
    [ChainId.JunoMainnet]: {
      name: 'juno',
      mainnet: true,
      accentColor: '#f74a49',
      factoryContractAddress:
        'juno1eeqgsjyqxcscpxwa6ut36py8vfpu6hxrwy62n2vgu8ud72wa9pyqv38q7y',
      supportsV1GovProposals: true,
      kado: {
        network: 'JUNO',
      },
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
        Cw1Whitelist: 3914,
        Cw4Group: 1992, // v0.16
        // https://github.com/CosmWasm/cw-nfts
        Cw721Base: 1994, // v0.16

        // ContractVersion.V230
        CwPayrollFactory: 3915,
        CwTokenSwap: 3823,
        CwTokenfactoryIssuer: 3824,
        CwVesting: 3825,
        DaoCore: 3826,
        DaoMigrator: 3827,
        DaoPreProposeMultiple: 3828,
        DaoPreProposeSingle: 3829,
        DaoProposalMultiple: 3830,
        DaoProposalSingle: 3831,
        DaoVotingCw4: 3832,
        DaoVotingCw721Staked: 3833,
        DaoVotingTokenStaked: 3834,

        // v2.1.0 and below, for migrating v1 to v2 DAOs
        // ContractVersion.V210
        Cw20Stake: 2444,
        DaoVotingCw20Staked: 2463,
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
        },
        [ChainId.StargazeMainnet]: {
          // juno
          note: 'juno1vupyxq9q2mmg5jjcd4cl0ujav8a3xn0a9ahyhtmj0zjaje2gfejsyvyf3z',
          // juno
          listener:
            'juno1w9q8dgfl0n59gpuagn2r8j89w6y5ad4z8yvct096zawksaevx2nqzw3x9q',
          // stargaze
          voice:
            'stars1g9u4zmjj3xmu2me3vq07fqedqp7t0d9xjp3tqff9r2awwc2k8wvq7d39he',
          // juno
          localConnection: 'connection-30',
          // stargaze
          remoteConnection: 'connection-11',
          // juno
          localChannel: 'channel-305',
          // stargaze
          remoteChannel: 'channel-201',
          // juno
          // localClient: '07-tendermint-44',
          // stargaze
          // remoteClient: '07-tendermint-13',
        },
      },
    },
    [ChainId.OsmosisMainnet]: {
      name: 'osmosis',
      mainnet: true,
      accentColor: '#5604e8',
      factoryContractAddress:
        'osmo102pg8quxtvhye3k4rcqwh7j5zwf5ekhcvlquafjjxjnarhu38qzstkdm6p',
      supportsV1GovProposals: false,
      kado: {
        network: 'OSMOSIS',
      },
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
        // TODO(vesting)
        Cw1Whitelist: -1,
        Cw4Group: 123, // v0.16
        // https://github.com/CosmWasm/cw-nfts
        Cw721Base: 124, // v0.16

        // ContractVersion.V230
        // TODO(vesting): update
        CwPayrollFactory: -1,
        CwTokenSwap: 242,
        CwTokenfactoryIssuer: 243,
        CwVesting: 244,
        DaoCore: 245,
        DaoMigrator: -1, // not needed since only v2 DAOs exist but it's 246
        DaoPreProposeMultiple: 247,
        DaoPreProposeSingle: 248,
        DaoProposalMultiple: 249,
        DaoProposalSingle: 250,
        DaoVotingCw4: 251,
        DaoVotingCw721Staked: 253,
        DaoVotingTokenStaked: 252,
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
        },
        [ChainId.StargazeMainnet]: {
          // osmosis
          note: 'osmo1u44zc3vq37npnctdwd35n7ms3wtagfhdvdnpscq86pk6h9rmzpcsdqe992',
          // osmosis
          listener:
            'osmo1d00cmsk7uym7mtrsrcnhhdza8mpu346klhrpufkzzxkvy9wlegeqw2my6l',
          // stargaze
          voice:
            'stars1fr7ccflazj6mfmpt8z2st424kxkpc6uw7t65sx80q5rp0s8kug6sj34avq',
          // osmosis
          localConnection: 'connection-1223',
          // stargaze
          remoteConnection: 'connection-0',
          // osmosis
          localChannel: 'channel-2659',
          // stargaze
          remoteChannel: 'channel-202',
          // osmosis
          // localClient: '07-tendermint-1562',
          // stargaze
          // remoteClient: '07-tendermint-0',
        },
      },
    },
    [ChainId.NeutronMainnet]: {
      name: 'neutron',
      mainnet: true,
      accentColor: '#000000',
      factoryContractAddress:
        'neutron1xms03jykg6e2g402dxj3cw4q6ygm0r5rctdt5d7j99xehwtevm3sxl52n5',
      supportsV1GovProposals: false,
      indexes: {
        search: 'neutron_daos',
        featured: 'neutron_featured_daos',
      },
      explorerUrlTemplates: {
        tx: 'https://ping.pub/neutron/tx/REPLACE',
        gov: 'https://ping.pub/neutron/gov',
        govProp: 'https://ping.pub/neutron/gov/REPLACE',
        wallet: 'https://ping.pub/neutron/account/REPLACE',
      },
      codeIds: {
        // https://github.com/CosmWasm/cw-plus
        // TODO(vesting)
        Cw1Whitelist: -1,
        Cw4Group: 218, // v0.16
        // https://github.com/CosmWasm/cw-nfts
        Cw721Base: 232,

        // TODO(neutron-2.3.0): upgrade to v2.3.0 once CW 1.1 is supported
        // ContractVersion.V210
        // TODO(vesting): update
        CwPayrollFactory: -1,
        CwTokenSwap: 221,
        CwTokenfactoryIssuer: -1,
        CwVesting: 222,
        DaoCore: 223,
        DaoMigrator: -1,
        DaoPreProposeMultiple: 224,
        DaoPreProposeSingle: 225,
        DaoProposalMultiple: 226,
        DaoProposalSingle: 227,
        DaoVotingCw4: 228,
        DaoVotingCw721Staked: -1,
        DaoVotingTokenStaked: -1,
      },
    },
    [ChainId.StargazeMainnet]: {
      name: 'stargaze',
      mainnet: true,
      accentColor: '#8ac3cc',
      factoryContractAddress:
        'stars175zvu8psmyxlszsxaa5thz26gjm4y6l24cr9ctgs09g90755tpmqmskl4t',
      supportsV1GovProposals: false,
      indexes: {
        search: 'stargaze_daos',
        featured: 'stargaze_featured_daos',
      },
      explorerUrlTemplates: {
        tx: 'https://ping.pub/stargaze/tx/REPLACE',
        gov: 'https://ping.pub/stargaze/gov',
        govProp: 'https://ping.pub/stargaze/gov/REPLACE',
        wallet: 'https://ping.pub/stargaze/account/REPLACE',
      },
      codeIds: {
        // https://github.com/CosmWasm/cw-plus
        // TODO(vesting)
        Cw1Whitelist: -1,
        Cw4Group: 83, // v0.16

        // ContractVersion.V230
        // TODO(vesting): update
        CwPayrollFactory: -1,
        CwTokenSwap: 125,
        CwVesting: 126,
        DaoCore: 127,
        DaoMigrator: -1, // not needed since only v2 DAOs exist but it's 128
        DaoPreProposeMultiple: 129,
        DaoPreProposeSingle: 130,
        DaoProposalMultiple: 131,
        DaoProposalSingle: 132,
        DaoVotingCw4: 133,
        DaoVotingCw721Staked: 120,
        DaoVotingTokenStaked: 121,
        CwTokenfactoryIssuer: 122,
      },
      polytone: {
        [ChainId.OsmosisMainnet]: {
          // stargaze
          note: 'stars1p4f96xz9pz8264ccgapz2l6xu82l5cj0jvvng0ltlm3dw2sxqdrs43acfl',
          // stargaze
          listener:
            'stars1cu9nkty3wrg997qnmsdtpcy0m448zu5zj6kxmjfuze7jj2t6m3ns3f7ry5',
          // osmosis
          voice:
            'osmo13w3073l43gwxw77tv2np2katn3jrvet87unyfevg8nrj755m3x7q0aaw63',
          // stargaze
          localConnection: 'connection-0',
          // osmosis
          remoteConnection: 'connection-1223',
          // stargaze
          localChannel: 'channel-198',
          // osmosis
          remoteChannel: 'channel-2642',
          // stargaze
          // localClient: '07-tendermint-0',
          // osmosis
          // remoteClient: '07-tendermint-1562',
        },
        [ChainId.JunoMainnet]: {
          // stargaze
          note: 'stars17vst9ew3vhddgj4je82vdn0evv3dc9gyf0yapjydt9fzqn8c4ecqyunk79',
          // stargaze
          listener:
            'stars18mw7avlq5t0anxsavca5ch7ju0w6mjwu0jz55exfnhp0wz7rchasxurdf8',
          // juno
          voice:
            'juno13yxra87ltv7gva3z35ktxt0nx3n5tp8ngtkj2p2zxj0qg6n906fs00wgvf',
          // stargaze
          localConnection: 'connection-11',
          // juno
          remoteConnection: 'connection-30',
          // stargaze
          localChannel: 'channel-199',
          // juno
          remoteChannel: 'channel-304',
          // stargaze
          // localClient: '07-tendermint-13',
          // juno
          // remoteClient: '07-tendermint-44',
        },
      },
    },
    [ChainId.JunoTestnet]: {
      name: 'juno',
      mainnet: false,
      accentColor: '#f74a49',
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
        // TODO(vesting)
        Cw1Whitelist: -1,
        Cw4Group: 178,
        // https://github.com/CosmWasm/cw-nfts
        Cw721Base: 179,

        // ContractVersion.V230
        // TODO(vesting): update
        CwPayrollFactory: -1,
        CwTokenSwap: 3798,
        CwTokenfactoryIssuer: 3799,
        CwVesting: 3800,
        DaoCore: 3801,
        DaoMigrator: 3802,
        DaoPreProposeMultiple: 3803,
        DaoPreProposeSingle: 3804,
        DaoProposalMultiple: 3805,
        DaoProposalSingle: 3806,
        DaoVotingCw4: 3807,
        DaoVotingCw721Staked: 3808,
        DaoVotingTokenStaked: 3809,

        // v2.1.0 and below, for migrating v1 to v2 DAOs
        // ContractVersion.V210
        Cw20Stake: 1247,
        DaoVotingCw20Staked: 1263,
      },
    },
    [ChainId.OsmosisTestnet]: {
      name: 'osmosis',
      mainnet: false,
      accentColor: '#5604e8',
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
        // TODO(vesting)
        Cw1Whitelist: -1,
        Cw4Group: 1327, // v0.16
        // https://github.com/CosmWasm/cw-nfts
        Cw721Base: 1326, // v0.16

        // ContractVersion.V210
        // https://github.com/DA0-DA0/dao-contracts/releases/tag/v2.1.0
        // TODO(vesting): update
        CwPayrollFactory: -1,
        CwTokenSwap: 4894,
        CwTokenfactoryIssuer: 4895,
        CwVesting: 4896,
        DaoCore: 4897,
        DaoMigrator: -1, // not needed since only v2 DAOs exist but it's 4898
        DaoPreProposeMultiple: 4899,
        DaoPreProposeSingle: 4900,
        DaoProposalMultiple: 4901,
        DaoProposalSingle: 4902,
        DaoVotingCw4: 4903,
        DaoVotingCw721Staked: 4904,
        DaoVotingTokenStaked: 4905,
      },
    },
    [ChainId.StargazeTestnet]: {
      name: 'stargaze',
      mainnet: false,
      accentColor: '#8ac3cc',
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
        // TODO(vesting)
        Cw1Whitelist: -1,
        Cw4Group: 2887, // v0.16

        // ContractVersion.V230
        // TODO(vesting): update
        CwPayrollFactory: -1,
        CwTokenSwap: 3226,
        CwTokenfactoryIssuer: 3227,
        CwVesting: 3228,
        DaoCore: 3229,
        DaoMigrator: -1, // not needed since only v2 DAOs exist but it's 3230
        DaoPreProposeMultiple: 3231,
        DaoPreProposeSingle: 3232,
        DaoProposalMultiple: 3233,
        DaoProposalSingle: 3234,
        DaoVotingCw4: 3235,
        DaoVotingCw721Staked: 3236,
        DaoVotingTokenStaked: 3237,
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
    rpc: 'https://osmosis-rpc.polkachu.com',
    rest: 'https://osmosis-api.polkachu.com',
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
    rpc: 'https://rpc-kralum.neutron-1.neutron.org',
    rest: 'https://rest-kralum.neutron-1.neutron.org',
  },
}
