import {
  BaseChainConfig,
  ChainId,
  ContractVersion,
  PolytoneConfig,
  SupportedChainConfig,
} from '@dao-dao/types'

// Chains which DAO DAO DAOs exist on.
export const SUPPORTED_CHAINS: SupportedChainConfig[] = [
  {
    chainId: ChainId.JunoMainnet,
    name: 'juno',
    mainnet: true,
    accentColor: '#f74a49',
    factoryContractAddress:
      'juno1eeqgsjyqxcscpxwa6ut36py8vfpu6hxrwy62n2vgu8ud72wa9pyqv38q7y',
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
      DaoPreProposeApprovalSingle: 3921,
      DaoPreProposeApprover: 3927,
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
    historicalCodeIds: {
      [ContractVersion.V210]: {
        DaoPreProposeMultiple: 2458,
        DaoProposalMultiple: 2461,
      },
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
      [ChainId.TerraMainnet]: {
        // juno
        note: 'juno1hhfzyeytvfnunxast867qm36rnsnuugdl7w6vgdaj96r6cvqh6pq6ucxw7',
        // juno
        listener:
          'juno1jy0nct4jkmhsfua2fmyna5j9kr80xgytqpgdpzc95pul3l8gcw7q4phsv8',
        // terra
        voice:
          'terra1wkdcnhc9h2rm4vjg677t742u6n6pc72cxx2d8pk4qqsyd5ywzc2qvyckyy',
        // juno
        localConnection: 'connection-128',
        // terra
        remoteConnection: 'connection-6',
        // juno
        localChannel: 'channel-456',
        // terra
        remoteChannel: 'channel-319',
        // juno
        // localClient: '07-tendermint-185',
        // terra
        // remoteClient: '07-tendermint-3',
      },
      [ChainId.MigalooMainnet]: {
        // juno
        note: 'juno15mtjtjuxfrr6ez4a2yqfpsa6n86xerxuyal70n5vzdppgjtutyzqaahmzk',
        // juno
        listener:
          'juno1md8sgkt7pjlc92lztlvxwft3eh4lqr98lhf07zftaqfzuxne47rq3adtf3',
        // migaloo
        voice:
          'migaloo19dfxncujs33vtw2r5jscm7z7xt2lj7de8ar84z8c6h2l8hkysezq9n2shr',
        // juno
        localConnection: 'connection-282',
        // migaloo
        remoteConnection: 'connection-1',
        // juno
        localChannel: 'channel-457',
        // migaloo
        remoteChannel: 'channel-63',
        // juno
        // localClient: '07-tendermint-310',
        // migaloo
        // remoteClient: '07-tendermint-1',
      },
    },
  },
  {
    chainId: ChainId.OsmosisMainnet,
    name: 'osmosis',
    mainnet: true,
    accentColor: '#5604e8',
    factoryContractAddress:
      'osmo102pg8quxtvhye3k4rcqwh7j5zwf5ekhcvlquafjjxjnarhu38qzstkdm6p',
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
      // TODO(approver)
      DaoPreProposeApprovalSingle: -1,
      DaoPreProposeApprover: -1,
      DaoPreProposeMultiple: 247,
      DaoPreProposeSingle: 248,
      DaoProposalMultiple: 249,
      DaoProposalSingle: 250,
      DaoVotingCw4: 251,
      DaoVotingCw721Staked: 253,
      DaoVotingTokenStaked: 252,
    },
    historicalCodeIds: {
      [ContractVersion.V210]: {
        DaoPreProposeMultiple: 118,
        DaoProposalMultiple: 120,
      },
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
      [ChainId.TerraMainnet]: {
        // osmosis
        note: 'osmo1sa5yvr9pvxd8eh2wjmfj4c2cqvsxxs49ztn7e2pxtc4zxeet6e7spawtnd',
        // osmosis
        listener:
          'osmo10ql2wj858ejlx6jn46uhxnf5pda7pfxrnqm64drhane78kmtgd4smn544l',
        // terra
        voice:
          'terra1zgjqvzva5yz56yqa3s8dframcp3xkmxnspncsjq5hlg9dup7wk5smkrza7',
        // osmosis
        localConnection: 'connection-1536',
        // terra
        remoteConnection: 'connection-3',
        // osmosis
        localChannel: 'channel-12048',
        // terra
        remoteChannel: 'channel-320',
        // osmosis
        // localClient: '07-tendermint-1979',
        // terra
        // remoteClient: '07-tendermint-2',
      },
      [ChainId.MigalooMainnet]: {
        // osmosis
        note: 'osmo1gwg378zlvfcx294wvsxqswm6dt33mr6g5f4sdu752vxpcwqkhunqrhljl2',
        // osmosis
        listener:
          'osmo1v4lwr23hd5yvnr39nnv7x0zy8ja6nx7su5hwpde9pm5j2x40vnsquck9xh',
        // migaloo
        voice:
          'migaloo1x2fzq23trg33s9m37798s342r6p58rvcnya4wn7vcp6az95psl4s0t5563',
        // osmosis
        localConnection: 'connection-2171',
        // migaloo
        remoteConnection: 'connection-11',
        // osmosis
        localChannel: 'channel-12088',
        // migaloo
        remoteChannel: 'channel-65',
        // osmosis
        // localClient: '07-tendermint-2669',
        // migaloo
        // remoteClient: '07-tendermint-3',
      },
    },
  },
  {
    chainId: ChainId.NeutronMainnet,
    name: 'neutron',
    mainnet: true,
    accentColor: '#000000',
    factoryContractAddress:
      'neutron1xms03jykg6e2g402dxj3cw4q6ygm0r5rctdt5d7j99xehwtevm3sxl52n5',
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
      // TODO(approver)
      DaoPreProposeApprovalSingle: -1,
      DaoPreProposeApprover: -1,
      DaoPreProposeMultiple: 224,
      DaoPreProposeSingle: 225,
      DaoProposalMultiple: 226,
      DaoProposalSingle: 227,
      DaoVotingCw4: 228,
      DaoVotingCw721Staked: -1,
      DaoVotingTokenStaked: -1,
    },
    historicalCodeIds: {
      [ContractVersion.V210]: {
        DaoPreProposeMultiple: 224,
        DaoProposalMultiple: 226,
      },
    },
    // There is no IBC connection with:
    // - Juno
    polytone: {
      [ChainId.OsmosisMainnet]: {
        // neutron
        note: 'neutron1767kfqeglqyctuqsmvyzgjecs60lpqju2f590smxevk9duq5fhaqgk5eca',
        // neutron
        listener:
          'neutron1dvh9s7aa93uyv06hsu6qak238gc3kr6nr6cgejfrplhx3m9f630smfmn0l',
        // osmosis
        voice:
          'osmo1vw02frqejfw2v2w7dy6ws35jp9743dwkxy0laalwsuvzzvkszz7s8d93yw',
        // neutron
        localConnection: 'connection-18',
        // osmosis
        remoteConnection: 'connection-2338',
        // neutron
        localChannel: 'channel-54',
        // osmosis
        remoteChannel: 'channel-12058',
        // neutron
        // localClient: '07-tendermint-19',
        // osmosis
        // remoteClient: '07-tendermint-2823',
      },
      [ChainId.StargazeMainnet]: {
        // neutron
        note: 'neutron10h7a9s60ytvzeqzffa53dzqk4rdwqchmuue7ezp2txcs7a2ky82qzl203t',
        // neutron
        listener:
          'neutron1e06n0haqtmlvpj5u7fwkjdhc73ltxq0c3y5t5acdjscwqdf7uavqt6yxv6',
        // stargaze
        voice:
          'stars1f54x5q35vv39xv4dvjdxthj98xttulml2a86src2tf24mcpvq8wshc3px0',
        // neutron
        localConnection: 'connection-23',
        // stargaze
        remoteConnection: 'connection-211',
        // neutron
        localChannel: 'channel-55',
        // stargaze
        remoteChannel: 'channel-253',
        // neutron
        // localClient: '07-tendermint-31',
        // stargaze
        // remoteClient: '07-tendermint-283',
      },
      [ChainId.TerraMainnet]: {
        // neutron
        note: 'neutron143aydj5zcgh7fudhsjq7878z7v8dmj0ckn9un2hsrxgnslvgymfsln0tkw',
        // neutron
        listener:
          'neutron14zjfefmmx78sp4t45ftvx9eptd5gsspmdhm6dqztszdkfq4w4mvqtldzyf',
        // terra
        voice:
          'terra1669p39l9gg4ajjwyta5psf5g4aen05d392mzp9efpa06vnaa7j6s3czzd3',
        // neutron
        localConnection: 'connection-9',
        // terra
        remoteConnection: 'connection-192',
        // neutron
        localChannel: 'channel-53',
        // terra
        remoteChannel: 'channel-323',
        // neutron
        // localClient: '07-tendermint-12',
        // terra
        // remoteClient: '07-tendermint-274',
      },
    },
  },
  {
    chainId: ChainId.StargazeMainnet,
    name: 'stargaze',
    mainnet: true,
    accentColor: '#8ac3cc',
    factoryContractAddress:
      'stars175zvu8psmyxlszsxaa5thz26gjm4y6l24cr9ctgs09g90755tpmqmskl4t',
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
      // TODO(approver)
      DaoPreProposeApprovalSingle: -1,
      DaoPreProposeApprover: -1,
      DaoPreProposeMultiple: 129,
      DaoPreProposeSingle: 130,
      DaoProposalMultiple: 131,
      DaoProposalSingle: 132,
      DaoVotingCw4: 133,
      DaoVotingCw721Staked: 120,
      DaoVotingTokenStaked: 121,
      CwTokenfactoryIssuer: 122,
    },
    historicalCodeIds: {
      [ContractVersion.V210]: {
        DaoPreProposeMultiple: 89,
        DaoProposalMultiple: 91,
      },
    },
    // There is no IBC connection with:
    // - Stargaze
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
  {
    chainId: ChainId.MigalooMainnet,
    name: 'migaloo',
    mainnet: true,
    accentColor: '#3ccd64',
    factoryContractAddress:
      'migaloo19q77nmuaq3mnwecnxu7cfj6y6nd4jzw9x20v6xm66lmhqlvxwrkscaefz8',
    indexes: {
      search: 'migaloo_daos',
      featured: 'migaloo_featured_daos',
    },
    explorerUrlTemplates: {
      tx: 'https://ping.pub/migaloo/tx/REPLACE',
      gov: 'https://ping.pub/migaloo/gov',
      govProp: 'https://ping.pub/migaloo/gov/REPLACE',
      wallet: 'https://ping.pub/migaloo/account/REPLACE',
    },
    codeIds: {
      // https://github.com/CosmWasm/cw-plus
      Cw4Group: 302, // v0.16
      Cw721Base: 303,

      // ContractVersion.V240
      CwPayrollFactory: 286,
      CwTokenSwap: 287,
      CwTokenfactoryIssuer: 288,
      CwVesting: 290,
      DaoCore: 291,
      DaoMigrator: -1,
      DaoPreProposeMultiple: 295,
      DaoPreProposeSingle: 296,
      DaoProposalMultiple: 297,
      DaoProposalSingle: 298,
      DaoVotingCw4: 299,
      DaoVotingCw721Staked: 300,
      DaoVotingTokenStaked: 301,
    },
    // TODO
    polytone: {},
  },
  {
    chainId: ChainId.JunoTestnet,
    name: 'juno',
    mainnet: false,
    accentColor: '#f74a49',
    factoryContractAddress:
      'juno1dacj3j6pwr7jx0jeu99qdc4a2ylc2rxp4v3zap54sfrl3ntrhe8qkjfpku',
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
      // TODO(approver)
      DaoPreProposeApprovalSingle: -1,
      DaoPreProposeApprover: -1,
      DaoPreProposeMultiple: 3803,
      DaoPreProposeSingle: 3804,
      DaoProposalMultiple: 3960,
      DaoProposalSingle: 3961,
      DaoVotingCw4: 3807,
      DaoVotingCw721Staked: 3808,
      DaoVotingTokenStaked: 3809,

      // v2.1.0 and below, for migrating v1 to v2 DAOs
      // ContractVersion.V210
      Cw20Stake: 1247,
      DaoVotingCw20Staked: 1263,
    },
    historicalCodeIds: {
      [ContractVersion.V210]: {
        DaoPreProposeMultiple: 1258,
        DaoProposalMultiple: 1261,
      },
    },
  },
  {
    chainId: ChainId.OsmosisTestnet,
    name: 'osmosis',
    mainnet: false,
    accentColor: '#5604e8',
    factoryContractAddress:
      'osmo1v5k3527dt2vt67848h8jk0az9dyl8sunsqaapznf2j9tm4arxxfs7gwa0n',
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
      // TODO(approver)
      DaoPreProposeApprovalSingle: -1,
      DaoPreProposeApprover: -1,
      DaoPreProposeMultiple: 4899,
      DaoPreProposeSingle: 4900,
      DaoProposalMultiple: 4901,
      DaoProposalSingle: 4902,
      DaoVotingCw4: 4903,
      DaoVotingCw721Staked: 4904,
      DaoVotingTokenStaked: 4905,
    },
    historicalCodeIds: {
      [ContractVersion.V210]: {
        DaoPreProposeMultiple: 1319,
        DaoProposalMultiple: 1322,
      },
    },
  },
  {
    chainId: ChainId.StargazeTestnet,
    name: 'stargaze',
    mainnet: false,
    accentColor: '#8ac3cc',
    factoryContractAddress:
      'stars1ajrde5kky0c3xspjthqncxd72qmyu5trfsspn6ndk892gyqwakzsdjmegx',
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
      // TODO(approver)
      DaoPreProposeApprovalSingle: -1,
      DaoPreProposeApprover: -1,
      DaoPreProposeMultiple: 3231,
      DaoPreProposeSingle: 3232,
      DaoProposalMultiple: 3233,
      DaoProposalSingle: 3234,
      DaoVotingCw4: 3235,
      DaoVotingCw721Staked: 3236,
      DaoVotingTokenStaked: 3237,
    },
    historicalCodeIds: {
      [ContractVersion.V210]: {
        DaoPreProposeMultiple: 224,
        DaoProposalMultiple: 226,
      },
    },
  },
]

export const POLYTONE_CONFIG_PER_CHAIN: [ChainId, PolytoneConfig][] =
  SUPPORTED_CHAINS.map(({ chainId, polytone = {} }) => [
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
  [ChainId.CosmosHubMainnet]: {
    rpc: 'https://cosmos-rpc.polkachu.com',
    rest: 'https://cosmos-api.polkachu.com',
  },
  [ChainId.TerraMainnet]: {
    rpc: 'https://terra-rpc.polkachu.com',
    rest: 'https://terra-api.polkachu.com',
  },
  [ChainId.MigalooMainnet]: {
    rpc: 'https://migaloo-rpc.polkachu.com',
    rest: 'https://migaloo-api.polkachu.com',
  },
}

// All configured chains. Configured chains are either supported chains, which
// DAO DAO is deployed on, or other chains that show up in the governance UI.
export const CONFIGURED_CHAINS: BaseChainConfig[] = [
  {
    chainId: ChainId.CosmosHubMainnet,
    name: 'cosmos',
    mainnet: true,
    accentColor: '#5064fb',
    explorerUrlTemplates: {
      tx: 'https://ping.pub/cosmos/tx/REPLACE',
      gov: 'https://ping.pub/cosmos/gov',
      govProp: 'https://ping.pub/cosmos/gov/REPLACE',
      wallet: 'https://ping.pub/cosmos/account/REPLACE',
    },
  },
  {
    chainId: ChainId.CosmosHubTestnet,
    name: 'cosmos',
    mainnet: false,
    accentColor: '#5064fb',
    explorerUrlTemplates: {
      tx: 'https://testnet.ping.pub/cosmos/tx/REPLACE',
      gov: 'https://testnet.ping.pub/cosmos/gov',
      govProp: 'https://testnet.ping.pub/cosmos/gov/REPLACE',
      wallet: 'https://testnet.ping.pub/cosmos/account/REPLACE',
    },
  },
  ...SUPPORTED_CHAINS,
]
