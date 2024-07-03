import { Chain, IBCInfo } from '@chain-registry/types'
import {
  assets as chainRegistryAssets,
  chains as chainRegistryChains,
  ibc as chainRegistryIbc,
} from 'chain-registry'

import {
  BaseChainConfig,
  ChainId,
  ContractVersion,
  PolytoneConfig,
  SupportedChainConfig,
} from '@dao-dao/types'

import { NEUTRON_GOVERNANCE_DAO } from './env'

//! ----- Modified chain-registry -----
let chains = [...chainRegistryChains]
const assets = [...chainRegistryAssets]

// BitSong Testnet
const bitSongTestnetChain: Chain = {
  chain_name: 'bitsongtestnet',
  status: 'live',
  network_type: 'testnet',
  pretty_name: 'BitSong Testnet',
  chain_id: 'bobnet',
  bech32_prefix: 'bitsong',
  bech32_config: {
    bech32PrefixAccAddr: 'bitsong',
    bech32PrefixAccPub: 'bitsongpub',
    bech32PrefixValAddr: 'bitsongvaloper',
    bech32PrefixValPub: 'bitsongvaloperpub',
    bech32PrefixConsAddr: 'bitsongvalcons',
    bech32PrefixConsPub: 'bitsongvalconspub',
  },
  slip44: 639,
  logo_URIs: {
    png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/bitsong/images/btsg.png',
  },
  fees: {
    fee_tokens: [
      {
        denom: 'ubtsg',
        fixed_min_gas_price: 0,
        low_gas_price: 0,
        average_gas_price: 0,
        high_gas_price: 0,
      },
    ],
  },
  staking: {
    staking_tokens: [
      {
        denom: 'ubtsg',
      },
    ],
  },
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
}
chains.push(bitSongTestnetChain)
assets.push({
  chain_name: bitSongTestnetChain.chain_name,
  // Copy assets from BitSong mainnet.
  assets: assets.find((a) => a.chain_name === 'bitsong')?.assets ?? [],
})

// Remove thorchain and althea since they spam the console.
const chainsToRemove = ['thorchain', 'althea']
chains = chains.filter((chain) => !chainsToRemove.includes(chain.chain_name))

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
    codeIdsVersion: ContractVersion.V240,
    codeIds: {
      // https://github.com/CosmWasm/cw-plus
      Cw1Whitelist: 3914,
      Cw4Group: 1992, // v0.16
      // https://github.com/CosmWasm/cw-nfts
      Cw721Base: 1994, // v0.16

      CwPayrollFactory: 4042,
      CwTokenSwap: 4043,
      CwTokenfactoryIssuerMain: 4045,
      CwVesting: 4046,
      DaoCore: 4047,
      DaoMigrator: 4048,
      DaoPreProposeApprovalSingle: 4049,
      DaoPreProposeApprover: 4050,
      DaoPreProposeMultiple: 4051,
      DaoPreProposeSingle: 4052,
      DaoProposalMultiple: 4053,
      DaoProposalSingle: 4054,
      DaoVotingCw4: 4055,
      DaoVotingCw721Staked: 4056,
      DaoVotingTokenStaked: 4057,

      // For migrating v1 DAOs to the latest v2. Not used by new DAOs.
      Cw20Stake: 4058,
      DaoVotingCw20Staked: 4059,
    },
    historicalCodeIds: {
      [ContractVersion.V210]: {
        DaoPreProposeMultiple: 2458,
        DaoProposalMultiple: 2461,
      },
    },
    // No IBC connection with:
    // - Injective
    // - Neutron
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
      [ChainId.KujiraMainnet]: {
        // juno
        note: 'juno1z0fepsfeeew78uwespyneswt5q9aqntj55xdwdasefxpu7zjed2qa6t582',
        // juno
        listener:
          'juno15mf52u00eeepjtxwr7hgy52la7enymwx55285tsvcfwera8lq6ls7sfss5',
        // kujira
        voice:
          'kujira13nqh8m3394cpm62h8wm0uagqux37zaxs30e6e2zgg3acdx5yr5aq08ezlr',
        // juno
        localConnection: 'connection-140',
        // kujira
        remoteConnection: 'connection-1',
        // juno
        localChannel: 'channel-474',
        // kujira
        remoteChannel: 'channel-129',
      },
      [ChainId.OraichainMainnet]: {
        // juno
        note: 'juno1slr28gq9acpjj2dqt90svs6dwlmaev77uupg9fysy6200vkssjfsca266k',
        // juno
        listener:
          'juno1r2hez8nr6yqcxcadpyp6ckjsapn0dxkhgf50mspvez74fhwq4ymqfl776u',
        // oraichain
        voice:
          'orai1chmwuwq4akxcpm0dv2w5rc5qr0d9c7ufpwacrzn7uheyd5c2wxvsff4vsv',
        // juno
        localConnection: 'connection-521',
        // oraichain
        remoteConnection: 'connection-150',
        // juno
        localChannel: 'channel-529',
        // oraichain
        remoteChannel: 'channel-229',
      },
      [ChainId.ArchwayMainnet]: {
        // juno
        note: 'juno129y879p7fc7lwktj5c72cqrxyl6n9t4e3a9knr5mwjfc5algft0sw6ep29',
        // juno
        listener:
          'juno1j8hac83mnjtww379wkgffpvqvl3grtyrkmsznav6v0ktyrhfl77seu9mah',
        // archway
        voice:
          'archway16v6tzjhgt5v5mlfmh5x269vz5gc0t09flgzextspnkym6cc79m0qy0z40s',
        // juno
        localConnection: 'connection-379',
        // archway
        remoteConnection: 'connection-19',
        // juno
        localChannel: 'channel-413',
        // archway
        remoteChannel: 'channel-45',
      },
      [ChainId.OmniflixHubMainnet]: {
        // juno
        note: 'juno128ace0g69ghvgw0quxptxmeg8kjex6mrw5fguulssllge6qnca6sjykzsw',
        // juno
        listener:
          'juno1ts88k8s6he69uew3y89pg7l9e3zjqplctj4nwg6jw40d9le3r4esvp42s9',
        // omniflixhub
        voice:
          'omniflix18cszlvm6pze0x9sz32qnjq4vtd45xehqs8dq7cwy8yhq35wfnn3q3wy4uv',
        // juno
        localConnection: 'connection-104',
        // omniflixhub
        remoteConnection: 'connection-27',
        // juno
        localChannel: 'channel-566',
        // omniflixhub
        remoteChannel: 'channel-41',
      },
      [ChainId.BitsongMainnet]: {
        // juno
        note: 'juno184r596nqsl3f0t46muruscv7zjc5edxt5a3xlxwvww6smfkjjatqasj6lx',
        // juno
        listener:
          'juno1qypq6yjn4nhrnmmskawnx2rayfchu2nfwlslg2ax68a9883sqmwq5zmq22',
        // bitsong
        voice:
          'bitsong1xn9ukrng6pfnkf76rvgsf2c4zkpydjpt6ue2jh6kpea6cnqekkesj662n5',
        // juno
        localConnection: 'connection-26',
        // bitsong
        remoteConnection: 'connection-9',
        // juno
        localChannel: 'channel-568',
        // bitsong
        remoteChannel: 'channel-34',
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
    explorerUrlTemplates: {
      tx: 'https://ping.pub/osmosis/tx/REPLACE',
      gov: 'https://ping.pub/osmosis/gov',
      govProp: 'https://ping.pub/osmosis/gov/REPLACE',
      wallet: 'https://ping.pub/osmosis/account/REPLACE',
    },
    codeIdsVersion: ContractVersion.V240,
    codeIds: {
      // https://github.com/CosmWasm/cw-plus
      Cw1Whitelist: 351,
      Cw4Group: 123, // v0.16
      // https://github.com/CosmWasm/cw-nfts
      Cw721Base: 124, // v0.16

      CwPayrollFactory: 353,
      CwTokenSwap: 354,
      CwTokenfactoryIssuerMain: 364,
      CwVesting: 355,
      DaoCore: 365,
      DaoMigrator: -1, // not needed since only v2 DAOs exist
      DaoPreProposeApprovalSingle: 357,
      DaoPreProposeApprover: 358,
      DaoPreProposeMultiple: 359,
      DaoPreProposeSingle: 360,
      DaoProposalMultiple: 366,
      DaoProposalSingle: 361,
      DaoVotingCw4: 362,
      DaoVotingCw721Staked: 363,
      DaoVotingTokenStaked: 367,
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
      [ChainId.NeutronMainnet]: {
        // osmosis
        note: 'osmo10j4qku3lzsqayyq6uhta4pzkv4fc97w3em9mjaxtvmv84y0fcats96lv89',
        // osmosis
        listener:
          'osmo14ww9jlat46msq8j8n9muhhc035aqv0w9rnft98th2a84zx06du3snhpl69',
        // neutron
        voice:
          'neutron14wfsdrpp9fhdfeh3wnfedz0jeeguxgz2jh5kk335zc9ghjac7mzs88tfau',
        // osmosis
        localConnection: 'connection-2338',
        // neutron
        remoteConnection: 'connection-18',
        // osmosis
        localChannel: 'channel-13106',
        // neutron
        remoteChannel: 'channel-58',
        // osmosis
        // localClient: '07-tendermint-2823',
        // neutron
        // remoteClient: '07-tendermint-19',
      },
      [ChainId.KujiraMainnet]: {
        // osmosis
        note: 'osmo174mke7nylzwylaerfk6j8epzy5yxnvnfvrlx6gy2j0sq8sjf80lsw6skfn',
        // osmosis
        listener:
          'osmo1hcfg9qv9k6dhkw6us3nca2tuyqqwa7rdfyjf2e667s5hnywnl07qkr69zw',
        // kujira
        voice:
          'kujira18zwe6dyezfla7p6zevm4wkatrajr4dn9lzf4l07ssdjz39s2322sw6ppuz',
        // osmosis
        localConnection: 'connection-1559',
        // kujira
        remoteConnection: 'connection-2',
        // osmosis
        localChannel: 'channel-16722',
        // kujira
        remoteChannel: 'channel-146',
      },
      [ChainId.OraichainMainnet]: {
        // osmosis
        note: 'osmo1heyensqmjxare0u3vms5q52czw4j6lwfszyhsfyjmqw54j6n2tnq9l0yh4',
        // osmosis
        listener:
          'osmo128t3k4gfenvxegdjft9r8ctely99drl4hgcvdrgcmlfhlla6ftuqydl0w4',
        // oraichain
        voice:
          'orai16wexpcgt9wn88yuu8mdln7lx2l85ygj594jxm9aufjn6qwny49vs6mvcq4',
        // osmosis
        localConnection: 'connection-1464',
        // oraichain
        remoteConnection: 'connection-21',
        // osmosis
        localChannel: 'channel-20861',
        // oraichain
        remoteChannel: 'channel-214',
      },
      [ChainId.ArchwayMainnet]: {
        // osmosis
        note: 'osmo14528h5e3c9knxzp82tex0gehhwx2qmz7fm32ntk6yluas27aknssrqkled',
        // osmosis
        listener:
          'osmo1hddgcv5efr435d8hmlf6kacthn0xsffdljd3er3yq2nxag7kg8wsytx400',
        // archway
        voice:
          'archway1c7vceg88kylv0u6lpqc6fejqkw50shg0mm84kacpkdkwtljked9q0kgkcy',
        // osmosis
        localConnection: 'connection-2362',
        // archway
        remoteConnection: 'connection-1',
        // osmosis
        localChannel: 'channel-8144',
        // archway
        remoteChannel: 'channel-43',
      },
      [ChainId.InjectiveMainnet]: {
        // osmosis
        note: 'osmo1zc4fdqwswxxwp9rqh9uq3crs5ykerzn2rptsznawsq7wp6jyhj0qddwey7',
        // osmosis
        listener:
          'osmo1x0hsnee8we57dn2rspvq7sj30l333v7mmr5kz5r2wg7nhxufrr6skvc4gz',
        // injective
        voice: 'inj10fxuwynmp9jtuumq27cuw0lw5quajpgxw692g5',
        // osmosis
        localConnection: 'connection-1298',
        // injective
        remoteConnection: 'connection-14',
        // osmosis
        localChannel: 'channel-77133',
        // injective
        remoteChannel: 'channel-301',
      },
      [ChainId.OmniflixHubMainnet]: {
        // osmosis
        note: 'osmo19p2k2wdzdvrr0np5jmef4qa2wpsxjgmumu3k35d3myxcwjf9yufq9xl65h',
        // osmosis
        listener:
          'osmo148g8aue5zvry9wy5zdspcghswqs7gg0qlh9wwzgm4g82t7c6w34qqvs433',
        // omniflixhub
        voice:
          'omniflix1wkwy0xh89ksdgj9hr347dyd2dw7zesmtrue6kfzyml4vdtz6e5wsnmv63u',
        // osmosis
        localConnection: 'connection-1431',
        // omniflixhub
        remoteConnection: 'connection-8',
        // osmosis
        localChannel: 'channel-78358',
        // omniflixhub
        remoteChannel: 'channel-42',
      },
      [ChainId.BitsongMainnet]: {
        // osmosis
        note: 'osmo1yz3wn53velq6j3xvgd96cuyerxm3ny06tmw0kk47zwhgnlanqdzsyu6grm',
        // osmosis
        listener:
          'osmo12nxa03mh0dm6nfdu4uhk8fu8nawd49ljmycfpzt7afr3kn7nvl4sj3485j',
        // bitsong
        voice:
          'bitsong1jea5dydjmjemf7fgesllzuhjg78rv40a0dh7gl2379wtyjq6z4jqs23cks',
        // osmosis
        localConnection: 'connection-1216',
        // bitsong
        remoteConnection: 'connection-0',
        // osmosis
        localChannel: 'channel-78440',
        // bitsong
        remoteChannel: 'channel-33',
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
    govContractAddress: NEUTRON_GOVERNANCE_DAO,
    subDaos: [
      'neutron1fuyxwxlsgjkfjmxfthq8427dm2am3ya3cwcdr8gls29l7jadtazsuyzwcc',
      'neutron1zjdv3u6svlazlydmje2qcp44yqkt0059chz8gmyl5yrklmgv6fzq9chelu',
    ],
    explorerUrlTemplates: {
      tx: 'https://neutron.celat.one/neutron-1/txs/REPLACE',
      wallet: 'https://neutron.celat.one/neutron-1/accounts/REPLACE',
    },
    codeIdsVersion: ContractVersion.V240,
    codeIds: {
      // https://github.com/CosmWasm/cw-plus
      Cw1Whitelist: 552,
      Cw4Group: 218, // v0.16
      // https://github.com/CosmWasm/cw-nfts
      Cw721Base: 232,

      CwPayrollFactory: 553,
      CwTokenSwap: 564,
      CwTokenfactoryIssuerMain: 565,
      CwVesting: 703,
      DaoCore: 567,
      DaoMigrator: -1, // not needed since only v2 DAOs exist
      DaoPreProposeApprovalSingle: 569,
      DaoPreProposeApprover: 570,
      DaoPreProposeMultiple: 575,
      DaoPreProposeSingle: 571,
      DaoProposalMultiple: 572,
      DaoProposalSingle: 573,
      DaoVotingCw4: 574,
      DaoVotingCw721Staked: 576,
      DaoVotingTokenStaked: 577,
    },
    historicalCodeIds: {
      [ContractVersion.V210]: {
        DaoPreProposeMultiple: 224,
        DaoProposalMultiple: 226,
      },
    },
    // There is no IBC connection with:
    // - Juno
    // - Migaloo
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
      [ChainId.KujiraMainnet]: {
        // neutron
        note: 'neutron1gkrrj668pf84sefae7yqgseeugnfeygrat8tnu06q8vtqfvc6mhqk7sysy',
        // neutron
        listener:
          'neutron1qytmw70y6vaqfa08mzec5m0g8d66e43h5t773xfme0r828chsg9slh6jxc',
        // kujira
        voice:
          'kujira1uexv52ffftauns6v2vlgvahc42k92nn0j0qa94u8re6dgp8zgfgqpw8uef',
        // neutron
        localConnection: 'connection-2',
        // kujira
        remoteConnection: 'connection-82',
        // neutron
        localChannel: 'channel-68',
        // kujira
        remoteChannel: 'channel-138',
      },
      [ChainId.ArchwayMainnet]: {
        // neutron
        note: 'neutron1kprjz0qusrcxvvhfklw0krn7g6ze36hzjuuhmktkepeyx5shljdqflwe2m',
        // neutron
        listener:
          'neutron1fh522a0x8h2wehc9wfqxwacnz7dqne0423qwrh07q8kz9ewnvdwqrhu0wv',
        // archway
        voice:
          'archway1qr94yuptq5h0nj5xctzft3q33262j2ajsquh42tpe0lptpev6rkswtfld5',
        // neutron
        localConnection: 'connection-43',
        // archway
        remoteConnection: 'connection-58',
        // neutron
        localChannel: 'channel-47',
        // archway
        remoteChannel: 'channel-85',
      },
      [ChainId.InjectiveMainnet]: {
        // neutron
        note: 'neutron1wpt84q6qsjtlv27vgk0pwg3l7dlueknlxz0xrh7teeut9strqyysrxc5a0',
        // neutron
        listener:
          'neutron12x9tc008u8teyg3txy2t70rjxz8cxxuftkk3plmccn0key4mxpuskq02jx',
        // injective
        voice: 'inj1v37vgn6y4knzr9e7uc3u9czxj3dcxug7s5lhzh',
        // neutron
        localConnection: 'connection-58',
        // injective
        remoteConnection: 'connection-220',
        // neutron
        localChannel: 'channel-4498',
        // injective
        remoteChannel: 'channel-304',
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
    explorerUrlTemplates: {
      tx: 'https://ping.pub/stargaze/tx/REPLACE',
      gov: 'https://ping.pub/stargaze/gov',
      govProp: 'https://ping.pub/stargaze/gov/REPLACE',
      wallet: 'https://ping.pub/stargaze/account/REPLACE',
    },
    codeIdsVersion: ContractVersion.V240,
    codeIds: {
      // https://github.com/CosmWasm/cw-plus
      Cw1Whitelist: 152,
      Cw4Group: 83, // v0.16

      CwPayrollFactory: 148,
      CwTokenSwap: 149,
      CwTokenfactoryIssuerMain: 150,
      CwVesting: 151,
      DaoCore: 153,
      DaoMigrator: -1, // not needed since only v2 DAOs exist
      DaoPreProposeApprovalSingle: 154,
      DaoPreProposeApprover: 155,
      DaoPreProposeMultiple: 156,
      DaoPreProposeSingle: 157,
      DaoProposalMultiple: 158,
      DaoProposalSingle: 159,
      DaoVotingCw4: 160,
      DaoVotingCw721Staked: 161,
      DaoVotingTokenStaked: 162,
    },
    historicalCodeIds: {
      [ContractVersion.V210]: {
        DaoPreProposeMultiple: 89,
        DaoProposalMultiple: 91,
      },
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
      [ChainId.NeutronMainnet]: {
        // stargaze
        note: 'stars14azfhpfxhkshxehex5x7xuq3a9wjqryc2x0kwg4stp6a59zmnpqqzfjl3c',
        // stargaze
        listener:
          'stars148gj3tqmu3ngrcyf55tms6tf5yyfepr0ru49ag8apkfptcr08z7sdzl76u',
        // neutron
        voice:
          'neutron1ageequk45wdfcjufqa5zj5ce2c9qxrssrn8ndgft7kfa7wk2arxscp9chd',
        // stargaze
        localConnection: 'connection-211',
        // neutron
        remoteConnection: 'connection-23',
        // stargaze
        localChannel: 'channel-267',
        // neutron
        remoteChannel: 'channel-59',
        // stargaze
        // localClient: '07-tendermint-283',
        // neutron
        // remoteClient: '07-tendermint-31',
      },
      [ChainId.MigalooMainnet]: {
        // stargaze
        note: 'stars1lyy3kkrw0vtgru49wezyhalxymhcs56xuyse835ld3v5hl0jrr3s926rml',
        // stargaze
        listener:
          'stars19hlknnxdu9xwt9zmcw0f0n84tepvdm2aaek0rfqqfpcxsj6ctc4s8p90w3',
        // migaloo
        voice:
          'migaloo1pddd7q33ht39y9uh3k34lk8nde33sp5apga5hpm6902as83pe72qqfsl7l',
        // stargaze
        localConnection: 'connection-287',
        // migaloo
        remoteConnection: 'connection-90',
        // stargaze
        localChannel: 'channel-272',
        // migaloo
        remoteChannel: 'channel-70',
        // stargaze
        // localClient: '07-tendermint-352',
        // migaloo
        // remoteClient: '07-tendermint-118',
      },
      [ChainId.KujiraMainnet]: {
        // stargaze
        note: 'stars1hp26cl5crsuyt9srmc9qjjmsf2fxv0sykxgvlcwk8qz59plm5xlqzk2n5g',
        // stargaze
        listener:
          'stars1rxaapnn7nyqtqd6fuyyva3rmdrpfv6kefpl07t7dvtlsv4q26hlqhc3fet',
        // kujira
        voice:
          'kujira1rd4l7q3c8737g3zjejlwkch3nht4hg00565k9dqezyrtsdn7xhns4thzes',
        // stargaze
        localConnection: 'connection-111',
        // kujira
        remoteConnection: 'connection-5',
        // stargaze
        localChannel: 'channel-276',
        // kujira
        remoteChannel: 'channel-135',
      },
      [ChainId.TerraMainnet]: {
        // stargaze
        note: 'stars1c8xqrx3es7nlzfx94hpsx94tu9mlxpdqv3338m039z0v4zltsl7qg7aglq',
        // stargaze
        listener:
          'stars1qd4hzjx8ugvkt5mtds9hxdm4c7hanfakgt80zrszyr9ccannq9zqg0t9tw',
        // terra
        voice:
          'terra1xezqw7jhu87ux2g7f2d27hlwt4u3qa8726j833323rrum82jgesq8ux30x',
        // stargaze
        localConnection: 'connection-275',
        // terra
        remoteConnection: 'connection-408',
        // stargaze
        localChannel: 'channel-284',
        // terra
        remoteChannel: 'channel-383',
      },
      [ChainId.ArchwayMainnet]: {
        // stargaze
        note: 'stars1ny7xvq2l07sgxdrak4qzrcj8eszyk5cwx34fkdshw4gyv84nyeus9cuw45',
        // stargaze
        listener:
          'stars14e2xhvph5ccteqxaes243na4dhskm4qx60eja75xg02kcdtg8lysdu7xug',
        // archway
        voice:
          'archway1hd4s3z4ga7f26eae4p44mp70dvr5my39d7l2qrh2hrl74jsv22dquc6h63',
        // stargaze
        localConnection: 'connection-258',
        // archway
        remoteConnection: 'connection-54',
        // stargaze
        localChannel: 'channel-248',
        // archway
        remoteChannel: 'channel-86',
      },
      [ChainId.InjectiveMainnet]: {
        // stargaze
        note: 'stars1fgdeujlyhymvh2malsdeckcjc9zfar8qc4rw77m4eldxmg4xly7s2n828w',
        // stargaze
        listener:
          'stars1hfhv66uu0t5kcku4rj506vvxp7l7h3aafjfruth5ss3yah76svuq59usx7',
        // injective
        voice: 'inj147yyg4ccmpwjut9e8marlmupx6myw8lj2wg4gn',
        // stargaze
        localConnection: 'connection-301',
        // injective
        remoteConnection: 'connection-270',
        // stargaze
        localChannel: 'channel-331',
        // injective
        remoteChannel: 'channel-310',
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
    explorerUrlTemplates: {
      tx: 'https://inbloc.org/migaloo/transactions/REPLACE',
      gov: 'https://inbloc.org/migaloo/governance',
      govProp: 'https://inbloc.org/migaloo/proposal/REPLACE',
      wallet: 'https://inbloc.org/migaloo/account/REPLACE',
    },
    codeIdsVersion: ContractVersion.V240,
    codeIds: {
      // https://github.com/CosmWasm/cw-plus
      Cw1Whitelist: 304,
      Cw4Group: 302, // v0.16
      // https://github.com/CosmWasm/cw-nfts
      Cw721Base: 303,

      CwPayrollFactory: 286,
      CwTokenSwap: 287,
      CwTokenfactoryIssuerMain: 401,
      CwTokenfactoryIssuerCosmWasm: 288,
      CwVesting: 290,
      DaoCore: 291,
      DaoMigrator: -1,
      DaoPreProposeApprovalSingle: 293,
      DaoPreProposeApprover: 294,
      DaoPreProposeMultiple: 295,
      DaoPreProposeSingle: 296,
      DaoProposalMultiple: 297,
      DaoProposalSingle: 298,
      DaoVotingCw4: 299,
      DaoVotingCw721Staked: 300,
      DaoVotingTokenStaked: 301,
    },
    // There are no IBC connections with:
    // - Neutron
    // TODO(polytone): Polytone does not yet exist with:
    // - Archway
    polytone: {
      [ChainId.JunoMainnet]: {
        // migaloo
        note: 'migaloo1v4y8lytcu7q5tmvcqs06km7qra5wlwtt96snmlf4pljn25z0u79smel9hc',
        // migaloo
        listener:
          'migaloo1wtc95908aajnw7rqfjdcmnppzlp70jv32jajp0a6nyk3z4svggsqmrz9ja',
        // juno
        voice:
          'juno1j4uvv0r8t4mc2x0s6nrua9um2tkue0efwx8553wxja9ecxj73z4qjqjwm0',
        // migaloo
        localConnection: 'connection-1',
        // juno
        remoteConnection: 'connection-282',
        // migaloo
        localChannel: 'channel-66',
        // juno
        remoteChannel: 'channel-458',
        // migaloo
        // localClient: '07-tendermint-1',
        // juno
        // remoteClient: '07-tendermint-310',
      },
      [ChainId.OsmosisMainnet]: {
        // migaloo
        note: 'migaloo1zmwmf0l06lnlty5a0xwxnz5yjxf5qm4pw2upznj4mdhfrdx5vjrqv2hz6p',
        // migaloo
        listener:
          'migaloo1tx4nc7jhf2zt87v9zy4a54nsw4lqthfkp8fed3ftm7mx8tz0mzwqnuf2s9',
        // osmosis
        voice:
          'osmo1rwaaf55us67nhl8atksgsrlz7pmkgcule3tcex9l44gu3a2dc86s4dk459',
        // migaloo
        localConnection: 'connection-11',
        // osmosis
        remoteConnection: 'connection-2171',
        // migaloo
        localChannel: 'channel-68',
        // osmosis
        remoteChannel: 'channel-12859',
        // migaloo
        // localClient: '07-tendermint-3',
        // osmosis
        // remoteClient: '07-tendermint-2669',
      },
      [ChainId.StargazeMainnet]: {
        // migaloo
        note: 'migaloo1cnuhn42mf3wy3x3rlkllc03h25eea8jjdt00dqy2mh4ukp7npsaqevswl4',
        // migaloo
        listener:
          'migaloo1sa0l849s9z23cu26lxdmc5waz65stz5m8shgueqvl5yhxzzm79msrsjh70',
        // stargaze
        voice:
          'stars1cj9a7p3y0zv3ccg90p9vhv6tr5cucujzf68yvlqwyrsl0pq82dzq5398jw',
        // migaloo
        localConnection: 'connection-90',
        // stargaze
        remoteConnection: 'connection-287',
        // migaloo
        localChannel: 'channel-71',
        // stargaze
        remoteChannel: 'channel-273',
        // migaloo
        // localClient: '07-tendermint-118',
        // stargaze
        // remoteClient: '07-tendermint-352',
      },
      [ChainId.TerraMainnet]: {
        // migaloo
        note: 'migaloo1en6cw3qs9stft3dmdh2x3mtmq679wr7d2yvdg20f94m7t5f0ug7qah9pf8',
        // migaloo
        listener:
          'migaloo1mep7v7auyjc5wmzf6rgthxwdh3t89d0vzxdu6l9f8k7yhex3rpqsckwz3w',
        // terra
        voice:
          'terra16yy3unw92e8qae9495yt480kqmqstapek6uhs42g5020vqhcgx3stukklk',
        // migaloo
        localConnection: 'connection-0',
        // terra
        remoteConnection: 'connection-93',
        // migaloo
        localChannel: 'channel-93',
        // terra
        remoteChannel: 'channel-367',
        // migaloo
        // localClient: '07-tendermint-0',
        // terra
        // remoteClient: '07-tendermint-105',
      },
      [ChainId.ChihuahuaMainnet]: {
        // migaloo
        note: 'migaloo1ezyangwcudgx7vq664g8zqtnrtl6nsvup9yfulewynlx2dru99ls54hxdn',
        // migaloo
        listener:
          'migaloo1jm58dy8ymmnffdgm3t8clye56qhdmw7g7jgsnarcnzk66jzdcyvqjxj0gn',
        // chihuahua
        voice:
          'chihuahua1ppjcxp24dw0s6nx94hsnlutxmsqqvds66u968w29x8xuwmw0gntqkcvtq0',
        // migaloo
        localConnection: 'connection-21',
        // chihuahua
        remoteConnection: 'connection-81',
        // migaloo
        localChannel: 'channel-111',
        // chihuahua
        remoteChannel: 'channel-80',
        // migaloo
        // localClient: '07-tendermint-21',
        // chihuahua
        // remoteClient: '07-tendermint-126',
      },
      [ChainId.InjectiveMainnet]: {
        // migaloo
        note: 'migaloo190zmewmp5pv2mhv3mqpmvseh55902fae3wn0mraxyrp3cys55jksftxwan',
        // migaloo
        listener:
          'migaloo1v4sw52jhgzuhsr8fmt9an390xevvafec0gd320h2auvfnlr4tftsu99m73',
        // injective
        voice: 'inj1edfqvfyvpce8qm5avph43spnm5plt2en2lgdg6',
        // migaloo
        localConnection: 'connection-8',
        // injective
        remoteConnection: 'connection-123',
        // migaloo
        localChannel: 'channel-120',
        // injective
        remoteChannel: 'channel-309',
      },
      [ChainId.KujiraMainnet]: {
        // migaloo
        note: 'migaloo1ra5czh604fv2k3rhrmesasa45afse97ulnwdz77zx9qkngyzx6jsfmvn6g',
        // migaloo
        listener:
          'migaloo1s06ndhqa93tmx244e6jefpv0mr0dgzwjkjj0nvvn9jpj0hd756tqrzygkw',
        // kujira
        voice:
          'kujira1dxcg652grz88gnur0cqelqks8aeazus6l44fejdnzjw2hel8x49skf5c96',
        // migaloo
        localConnection: 'connection-19',
        // kujira
        remoteConnection: 'connection-59',
        // migaloo
        localChannel: 'channel-123',
        // kujira
        remoteChannel: 'channel-167',
      },
    },
  },
  {
    chainId: ChainId.TerraMainnet,
    name: 'terra',
    mainnet: true,
    overrideChainImageUrl: '/chains/terra.png',
    accentColor: '#113da5',
    factoryContractAddress:
      'terra1a6m80fzww958qljatddgdj4xpj29effyshkh6rek8thmfzprd3ssw6wz2f',
    explorerUrlTemplates: {
      tx: 'https://finder.terra.money/mainnet/tx/REPLACE',
      gov: 'https://ping.pub/terra/gov',
      govProp: 'https://ping.pub/terra/gov/REPLACE',
      wallet: 'https://finder.terra.money/mainnet/address/REPLACE',
    },
    codeIdsVersion: ContractVersion.V240,
    codeIds: {
      // https://github.com/CosmWasm/cw-plus
      Cw1Whitelist: 2627,
      Cw4Group: 2628, // v0.16
      // https://github.com/CosmWasm/cw-nfts
      Cw721Base: 2629,

      CwPayrollFactory: 2631,
      CwTokenSwap: 2632,
      CwTokenfactoryIssuerMain: 2633,
      CwVesting: 2634,
      DaoCore: 2635,
      DaoMigrator: -1,
      DaoPreProposeApprovalSingle: 2637,
      DaoPreProposeApprover: 2638,
      DaoPreProposeMultiple: 2639,
      DaoPreProposeSingle: 2640,
      DaoProposalMultiple: 2641,
      DaoProposalSingle: 2642,
      DaoVotingCw4: 2643,
      DaoVotingCw721Staked: 2644,
      DaoVotingTokenStaked: 2645,
    },
    polytone: {
      [ChainId.JunoMainnet]: {
        // terra
        note: 'terra1dfwrwcjmsnprmr9938sg3d2885vm84cg2jfxtznf7kr59nrrxdtsdgnqu8',
        // terra
        listener:
          'terra1eqk2urjf0yvtpeaqu0r9zhkzptau9ulmwypjt6f3e7ktwtha48gsu3x2ee',
        // juno
        voice:
          'juno1ct0klhzska7h2k74m0pjlyr0u20mm8d3h4antq5fqeqfvavhc2gqcgw847',
        // terra
        localConnection: 'connection-6',
        // juno
        remoteConnection: 'connection-128',
        // terra
        localChannel: 'channel-385',
        // juno
        remoteChannel: 'channel-520',
      },
      [ChainId.OsmosisMainnet]: {
        // terra
        note: 'terra13wdx8mgcj73ltfgfq2mazwrryxadzcmwy0l2xmllpgs03hq0q8lqqyy2kn',
        // terra
        listener:
          'terra1hudgkhufhp7a20jnk8vvc2x6l8f55tpx7tr8wkqq996zjv9v3yqqcpyaar',
        // osmosis
        voice:
          'osmo1j3dzaqvaqa6navmz89rdmjrnztvgh5xma25wxchv6f3aj48jg6uqmxkhfu',
        // terra
        localConnection: 'connection-3',
        // osmosis
        remoteConnection: 'connection-1536',
        // terra
        localChannel: 'channel-386',
        // osmosis
        remoteChannel: 'channel-21185',
      },
      [ChainId.StargazeMainnet]: {
        // terra
        note: 'terra1ts8j0cwnykrh39nc97mxmzesvnukyru3uua3hych0s345a0wz32qhklzfw',
        // terra
        listener:
          'terra1z4qyl5t3wtv7006chg3ar8hpyzuqsuyj5uqujhskplwtun28ucss23uap7',
        // stargaze
        voice:
          'stars1457shfac8965ju277wwukf4qfvf24uqzrjdmw8j5w0xwhp8zps0qal9ure',
        // terra
        localConnection: 'connection-408',
        // stargaze
        remoteConnection: 'connection-275',
        // terra
        localChannel: 'channel-387',
        // stargaze
        remoteChannel: 'channel-285',
      },
      [ChainId.NeutronMainnet]: {
        // terra
        note: 'terra1eumwktcszm8p5p3apuxq4mrk008rx8sakntq68a5x6l6my33jl2qfvsfge',
        // terra
        listener:
          'terra1hu8esz9yhfrhj2eyq70refpmmdem95my2rpc2d896nt2a3p34s0qf5chle',
        // neutron
        voice:
          'neutron1dsxy6h7cfnrguqe09ym599wk09a9zpyzw6r6yttrkquqffp06l6sfptpfp',
        // terra
        localConnection: 'connection-192',
        // neutron
        remoteConnection: 'connection-9',
        // terra
        localChannel: 'channel-388',
        // neutron
        remoteChannel: 'channel-994',
      },
      [ChainId.MigalooMainnet]: {
        // terra
        note: 'terra1pmdg4yq0ew57fdpwckcsey5jw60tth49cm2vpw0r5l6zj368xvhshjurcl',
        // terra
        listener:
          'terra1xftzcyz2s2t0d35985j0w0csqffzczxfm5k3gw6dgd34etw88sxqz6t03k',
        // migaloo
        voice:
          'migaloo1ruw9ptkcdrj80npzuhzkryr5uxdf0nxw8w77eytwkvcmuh7al7gs0yaqpe',
        // terra
        localConnection: 'connection-93',
        // migaloo
        remoteConnection: 'connection-0',
        // terra
        localChannel: 'channel-389',
        // migaloo
        remoteChannel: 'channel-112',
      },
      [ChainId.ArchwayMainnet]: {
        // terra
        note: 'terra1x366fdkmpd88fvtjq09ksupjjgre6fr08zulwn3qe8mfefxfd3jswdmy3x',
        // terra
        listener:
          'terra1s5nmuezlqhgu5f063mklygkgde92fjds0trp7eaw55vz0fdzyl5s4qed79',
        // archway
        voice:
          'archway1ge0zdux54pn8f234l203nvugl4xnsr6hgv3tyah2wwm8qgz4y6esfzpwgg',
        // terra
        localConnection: 'connection-360',
        // archway
        remoteConnection: 'connection-47',
        // terra
        localChannel: 'channel-270',
        // archway
        remoteChannel: 'channel-54',
      },
      [ChainId.InjectiveMainnet]: {
        // terra
        note: 'terra1vf2janv5s6ywsa8lj4m5q7jdw3wfqpmgtkgdllh24l2shz0qyv4qvtjkuk',
        // terra
        listener:
          'terra1yu9encxx42k6rswr7skl43dhfxqzljddlk3wj250q7uykxzflw7qykt6wt',
        // injective
        voice: 'inj1tr0uhnh6dwtvaunnpa3zcdrq3gvq9y47jrysu8',
        // terra
        localConnection: 'connection-311',
        // injective
        remoteConnection: 'connection-202',
        // terra
        localChannel: 'channel-488',
        // injective
        remoteChannel: 'channel-289',
      },
    },
  },
  {
    // Ensure this chain stays below Terra so that the logic in
    // makeGetDaoStaticProps works with Terra Classic fallback.
    chainId: ChainId.TerraClassicMainnet,
    name: 'terraclassic',
    mainnet: true,
    accentColor: '#ffd842',
    createWithCw20: true,
    factoryContractAddress:
      'terra18d67ywrfwxq6924xdsg4ahrsjrtuvnu0q5v0ttj07fakw2thspps2fn9yy',
    explorerUrlTemplates: {
      tx: 'https://finder.terra.money/classic/tx/REPLACE',
      gov: 'https://ping.pub/terra-luna/gov',
      govProp: 'https://ping.pub/terra-luna/gov/REPLACE',
      wallet: 'https://finder.terra.money/classic/address/REPLACE',
    },
    codeIdsVersion: ContractVersion.V242,
    codeIds: {
      // https://github.com/CosmWasm/cw-plus
      Cw1Whitelist: 8725,
      Cw4Group: 8726, // v0.16
      // https://github.com/CosmWasm/cw-nfts
      Cw721Base: 8727,

      CwPayrollFactory: 8729,
      CwTokenSwap: 8730,
      CwTokenfactoryIssuerMain: -1, // Not used
      CwVesting: 8731,
      DaoCore: 8732,
      DaoMigrator: -1,
      DaoPreProposeApprovalSingle: 8734,
      DaoPreProposeApprover: 8735,
      DaoPreProposeMultiple: 8736,
      DaoPreProposeSingle: 8737,
      DaoProposalMultiple: 8738,
      DaoProposalSingle: 8739,
      DaoVotingCw4: 8740,
      DaoVotingCw721Staked: 8741,
      DaoVotingTokenStaked: -1, // Not used

      Cw20Base: 8785,
      Cw20Stake: 8786,
      DaoVotingCw20Staked: 8787,
    },
    polytone: {
      [ChainId.OsmosisMainnet]: {
        // terra
        note: 'terra1mudpw50amrmmj66j8gcxcvuervrmdpfpskjfjz8ccq2n6vs8messcqc26w',
        // terra
        listener:
          'terra1d4ge6jklal6enlfjuz8wgzzdlwmtqtuj87rnxf3wzw9ykw3wrl7srzx0lz',
        // osmosis
        voice:
          'osmo1sgyvze8v2jr600pjxll6leg3lpuz2grte0aceelzz0q3r7kv4dtsrgd9y8',
        // terra
        localConnection: 'connection-11',
        // osmosis
        remoteConnection: 'connection-1215',
        // terra
        localChannel: 'channel-93',
        // osmosis
        remoteChannel: 'channel-78083',
      },
      [ChainId.StargazeMainnet]: {
        // terra
        note: 'terra1wnvlwpdgug7sp3gan9cgdplfe9368apunh09dakurgjmvxwhn9gqk3t70u',
        // terra
        listener:
          'terra1306eg6lp30zdet9dkp0td4a2lw6wfp88ufuwppccp2eu7uva8thqv7h5qt',
        // stargaze
        voice:
          'stars19nlxjdrdqaphvnckuhl50jjdtwe6pflcr7rgjfhcs66nwlfr0ees0dwpqp',
        // terra
        localConnection: 'connection-152',
        // stargaze
        remoteConnection: 'connection-298',
        // terra
        localChannel: 'channel-100',
        // stargaze
        remoteChannel: 'channel-336',
      },
      [ChainId.MigalooMainnet]: {
        // terra
        note: 'terra16c0fhcrm0ez0e4an644lynknwxhru9wjeacg9xsplayrzrhs7uxs5y7vtx',
        // terra
        listener:
          'terra196xqr5ngsr483lvh4alux0rcnspep45gad484h6pdappqnf70jys7wpmkq',
        // migaloo
        voice:
          'migaloo10snk2jzmgxhzg3348gy8tljlah42wcw0jm3wpjsv6zhfz2cdls8sl573w4',
        // terra
        localConnection: 'connection-141',
        // migaloo
        remoteConnection: 'connection-88',
        // terra
        localChannel: 'channel-101',
        // migaloo
        remoteChannel: 'channel-121',
      },
      [ChainId.KujiraMainnet]: {
        // terra
        note: 'terra14peyt0qrvayqj3vcy2rtq6tpp2frgw0qyt4stks6enf42gnuwrnsx2skls',
        // terra
        listener:
          'terra1s7vmxcrtuuhetl5qjqhc0ldjlwqxd87r4m5uym428mky4s36vwfsl3jcm7',
        // kujira
        voice:
          'kujira1fnv7ar6xt2y8lsnv9zvdfykdnels04vfjwnq4n0edqgvkm9cj2aqss5ftx',
        // terra
        localConnection: 'connection-102',
        // kujira
        remoteConnection: 'connection-79',
        // terra
        localChannel: 'channel-106',
        // kujira
        remoteChannel: 'channel-166',
      },
    },
  },
  {
    chainId: ChainId.OraichainMainnet,
    name: 'oraichain',
    mainnet: true,
    overrideChainImageUrl: '/chains/oraichain.svg',
    accentColor: '#ffffff',
    factoryContractAddress:
      'orai1jwuyup67xem5tecj2pt098y23h5032f66zvj709p7mgz4vgyjx3qua5r5g',
    createWithCw20: true,
    explorerUrlTemplates: {
      tx: 'https://scan.orai.io/txs/REPLACE',
      gov: 'https://scan.orai.io/proposals',
      govProp: 'https://scan.orai.io/proposals/REPLACE',
      wallet: 'https://scan.orai.io/account/REPLACE',
    },
    codeIdsVersion: ContractVersion.V240,
    codeIds: {
      // https://github.com/CosmWasm/cw-plus
      Cw1Whitelist: 1546,
      Cw4Group: 1547, // v0.16
      // https://github.com/CosmWasm/cw-nfts
      Cw721Base: 1548,

      CwPayrollFactory: 1550,
      CwTokenSwap: 1551,
      CwTokenfactoryIssuerMain: 1552,
      CwVesting: 1553,
      DaoCore: 1554,
      DaoMigrator: -1,
      DaoPreProposeApprovalSingle: 1556,
      DaoPreProposeApprover: 1557,
      DaoPreProposeMultiple: 1558,
      DaoPreProposeSingle: 1559,
      DaoProposalMultiple: 1560,
      DaoProposalSingle: 1561,
      DaoVotingCw4: 1562,
      DaoVotingCw721Staked: 1563,
      DaoVotingTokenStaked: 1564,

      // Oraichain uses cw20 DAOs.
      Cw20Base: 1595, // v1.1.2
      Cw20Stake: 1565,
      DaoVotingCw20Staked: 1566,
    },
    polytone: {
      [ChainId.OsmosisMainnet]: {
        // oraichain
        note: 'orai1hvfzt6f7n7pea803j633089rsh23qhgmexk3j844lsegnyfxjluqt0e9pq',
        // oraichain
        listener:
          'orai1efwyc0zlc69n7pvj6yvnem504ynsv4xprquk9rgd65dthhc8n08snhh5my',
        // osmosis
        voice:
          'osmo1e459dlf6y4xlmlsjfpzpea6p54fx5zkngq203p4eamjhn334h56sspgqhz',
        // oraichain
        localConnection: 'connection-21',
        // osmosis
        remoteConnection: 'connection-1464',
        // oraichain
        localChannel: 'channel-216',
        // osmosis
        remoteChannel: 'channel-20862',
      },
      [ChainId.JunoMainnet]: {
        // oraichain
        note: 'orai1nu034cg5w2eax65n5nx9q92gaahywehjwfagf2cutwndt3jw66rsuj9n5a',
        // oraichain
        listener:
          'orai10urjh074nxcmy98sxl98rj63gyexdjvx5w7ttrtwsqsur3ucpk6qftv9ek',
        // juno
        voice:
          'juno1r9uz5a35ru3tpsjktd3a7kgj3afmrq993trkpmmxxlxwmtethc0s6s7v2y',
        // oraichain
        localConnection: 'connection-150',
        // juno
        remoteConnection: 'connection-521',
        // oraichain
        localChannel: 'channel-230',
        // juno
        remoteChannel: 'channel-530',
      },
    },
  },
  {
    chainId: ChainId.KujiraMainnet,
    name: 'kujira',
    mainnet: true,
    accentColor: '#e53935',
    // Permissioned, only Kujira governance can create DAOs.
    factoryContractAddress:
      'kujira1hwjtqgymczqra9n0859yvwemzamfqzvsegxsvuwcl7zwphpn04qqkr89yd',
    createViaGovernance: true,
    explorerUrlTemplates: {
      tx: 'https://finder.kujira.network/kaiyo-1/tx/REPLACE',
      gov: 'https://blue.kujira.network/govern',
      govProp: 'https://blue.kujira.network/govern/REPLACE',
      wallet: 'https://finder.kujira.network/kaiyo-1/address/REPLACE',
    },
    codeIdsVersion: ContractVersion.V242,
    codeIds: {
      // https://github.com/CosmWasm/cw-plus
      Cw1Whitelist: 259,
      Cw4Group: 260, // v0.16
      // https://github.com/CosmWasm/cw-nfts
      Cw721Base: 261,

      CwPayrollFactory: 262,
      CwTokenSwap: 263,
      CwTokenfactoryIssuerMain: 264,
      CwVesting: 265,
      DaoCore: 266,
      DaoMigrator: -1,
      DaoPreProposeApprovalSingle: 267,
      DaoPreProposeApprover: 268,
      DaoPreProposeMultiple: 269,
      DaoPreProposeSingle: 270,
      DaoProposalMultiple: 271,
      DaoProposalSingle: 272,
      DaoVotingCw4: 275,
      DaoVotingCw721Staked: 273,
      DaoVotingTokenStaked: 274,
    },
    // TODO(kujira-polytone):
    // - Migaloo
    polytone: {
      [ChainId.JunoMainnet]: {
        // kujira
        note: 'kujira1kthhh99l9ec60jr4eytnva40ep52tjvjlup9y2a409vgc7sutn6qv4rrxj',
        // kujira
        listener:
          'kujira10dpjpmd4jak247hrcupxnn87h77f94kqmgy8rwkspjakxc4paflqd3wnv5',
        // juno
        voice:
          'juno1vv7s07lcv2de64nphg255y7vsreasg6k89vq48gqf754wpsc5w0qmwupeu',
        // kujira
        localConnection: 'connection-1',
        // juno
        remoteConnection: 'connection-140',
        // kujira
        localChannel: 'channel-131',
        // juno
        remoteChannel: 'channel-475',
      },
      [ChainId.OsmosisMainnet]: {
        // kujira
        note: 'kujira15454vhqp90cy7u2swyaf79e53hervg0g6h78jgfsgydys5vgqa6shcruhm',
        // kujira
        listener:
          'kujira1tcu45eeuklxxkd8s4jsjpp0zlz3f04w9dgyhxxvy2sts8rxd3uksjrm9md',
        // osmosis
        voice:
          'osmo1546fnys90560am2jzuzsl0csmqc502g8ywgwpf3q9jdfucyr93jq7urvlm',
        // kujira
        localConnection: 'connection-2',
        // osmosis
        remoteConnection: 'connection-1559',
        // kujira
        localChannel: 'channel-147',
        // osmosis
        remoteChannel: 'channel-16723',
      },
      [ChainId.StargazeMainnet]: {
        // kujira
        note: 'kujira1wgjpx4d38gt3tc9rvyffk8upgs4sa805r0a3dleehtll67t7jyuqypclff',
        // kujira
        listener:
          'kujira1u5c2cn936tqh5rpua7xrscavglwy2g300zwp075wp0fapvs50e0qtwkher',
        // stargaze
        voice:
          'stars1qm2nv8vx9qf673h9r68vzwce4xf9kvyvkk54a28xnn5x5etcthuswrglxc',
        // kujira
        localConnection: 'connection-5',
        // stargaze
        remoteConnection: 'connection-111',
        // kujira
        localChannel: 'channel-136',
        // stargaze
        remoteChannel: 'channel-277',
      },
      [ChainId.NeutronMainnet]: {
        // kujira
        note: 'kujira14dckdzh7t30lkpdr0hgdqsqh52erux4tst5rl7jhvc693plnm39qp2r95q',
        // kujira
        listener:
          'kujira1wkv5qgu75crgyn93wmc2hdysn7xacrzzz3spcjcskr469884cn2snp6ffy',
        // neutron
        voice:
          'neutron162fvv88dxpsapf3rnux63anruqach36r8qg73ehm2dv3fkat2rusw70nlx',
        // kujira
        localConnection: 'connection-82',
        // neutron
        remoteConnection: 'connection-2',
        // kujira
        localChannel: 'channel-140',
        // neutron
        remoteChannel: 'channel-69',
      },
      [ChainId.TerraMainnet]: {
        // kujira
        note: 'kujira15u8wevalrxd62y6z549fmkmjdt3k2adr4zzsjgwp0uw365gmy45qkn8s8v',
        // kujira
        listener:
          'kujira1vgsdqvuxdn229q05f7guhytutcfa0u87l0qnd5xyeyp40e0w6xfqd8y63n',
        // terra
        voice:
          'terra14qj6ejeuqmgtx63fujulzcvnr290wcjmmfkvqdqh5p4vjdkuewzsyagufs',
        // kujira
        localConnection: 'connection-3',
        // terra
        remoteConnection: 'connection-13',
        // kujira
        localChannel: 'channel-141',
        // terra
        remoteChannel: 'channel-333',
      },
      [ChainId.ArchwayMainnet]: {
        // kujira
        note: 'kujira1q4r43ywst620wc9valw592nxs8k2a7vlsawkws0tz8x5675aaxxs5etvt8',
        // kujira
        listener:
          'kujira1fh29pj58cnkgjjnpwqc6rxfy3gnj3tj3hvdsmcn49e4cgz6x0skqldaxms',
        // archway
        voice:
          'archway1hnt7vrz40qy8lnz9577z0dxw6nedvgmxtqxqvt0ayts6e256v7cq3yzmlg',
        // kujira
        localConnection: 'connection-110',
        // archway
        remoteConnection: 'connection-12',
        // kujira
        localChannel: 'channel-133',
        // archway
        remoteChannel: 'channel-90',
      },
    },
  },
  {
    chainId: ChainId.BitsongMainnet,
    name: 'bitsong',
    mainnet: true,
    accentColor: '#c53381',
    // Token creation factory not yet ready.
    tokenCreationUnderDevelopment: true,
    factoryContractAddress:
      'bitsong1gpf39sy2u859wp370t4jty77gxlv9qennkm253swn0rqcm2r3v0q47w4ny',
    explorerUrlTemplates: {
      tx: 'https://ping.pub/bitsong/tx/REPLACE',
      gov: 'https://ping.pub/bitsong/gov',
      govProp: 'https://ping.pub/bitsong/gov/REPLACE',
      wallet: 'https://ping.pub/bitsong/account/REPLACE',
    },
    codeIdsVersion: ContractVersion.V242,
    codeIds: {
      Cw1Whitelist: 7,
      Cw4Group: 8,
      Cw721Base: 1,
      CwPayrollFactory: 11,
      CwTokenSwap: 12,
      CwVesting: 13,
      DaoCore: 14,
      DaoMigrator: -1, // not needed since only v2 DAOs exist
      DaoPreProposeApprovalSingle: 16,
      DaoPreProposeApprover: 17,
      DaoPreProposeMultiple: 18,
      DaoPreProposeSingle: 19,
      DaoProposalMultiple: 20,
      DaoProposalSingle: 21,
      DaoVotingCw4: 22,
      DaoVotingCw721Staked: 23,
      // TODO(bitsong): deploy when ready
      DaoVotingTokenStaked: -1,

      // unused
      CwTokenfactoryIssuerMain: -1,
    },
    polytone: {
      [ChainId.JunoMainnet]: {
        // bitsong
        note: 'bitsong1ucgr536rjpw3qvt3tkyx2w5w98llfpfe8v6eacud3g7tl3jdh07qkqz6hh',
        // bitsong
        listener:
          'bitsong1c7w23m0g7eg5l8c6pkdgtv52z39gug9vgnk9x8xtkqh9rawvsanqmwtxrx',
        // juno
        voice:
          'juno1czu3wfaj2a06d392a4jkhvvely6pcrxw397ht63pxamu98gv06zqmq85xz',
        // bitsong
        localConnection: 'connection-9',
        // juno
        remoteConnection: 'connection-26',
        // bitsong
        localChannel: 'channel-31',
        // juno
        remoteChannel: 'channel-567',
      },
      [ChainId.OsmosisMainnet]: {
        // bitsong
        note: 'bitsong149h0mwrjpgxnq8a6m8xvjkq9aya77a2rdm9ywkq2td6kqxgeu8rspz9sga',
        // bitsong
        listener:
          'bitsong1c8pgxceamfzr05yhmlkul9p5a7hz4p0vsmc80ffarvpl89nnlx0qdhqjr7',
        // osmosis
        voice:
          'osmo1ew5q937st3vemnk3cjk85rkceapvtmmk673pt0yc5mqt4ffhfa9qa4xfjn',
        // bitsong
        localConnection: 'connection-0',
        // osmosis
        remoteConnection: 'connection-1216',
        // bitsong
        localChannel: 'channel-32',
        // osmosis
        remoteChannel: 'channel-78439',
      },
    },
  },
  {
    chainId: ChainId.OmniflixHubMainnet,
    name: 'omniflixhub',
    mainnet: true,
    accentColor: '#d71d6a',
    // NFT DAOs not yet ready.
    nftDaosUnderDevelopment: true,
    factoryContractAddress:
      'omniflix13ehuhysn5mqjeaheeuew2gjs785f6k7jm8vfsqg3jhtpkwppcmzqjrdywp',
    explorerUrlTemplates: {
      tx: 'https://ping.pub/omniflixhub/tx/REPLACE',
      gov: 'https://ping.pub/omniflixhub/gov',
      govProp: 'https://ping.pub/omniflixhub/gov/REPLACE',
      wallet: 'https://ping.pub/omniflixhub/account/REPLACE',
    },
    codeIdsVersion: ContractVersion.V242,
    codeIds: {
      Cw1Whitelist: 5,
      Cw4Group: 6,
      CwPayrollFactory: 8,
      CwTokenSwap: 9,
      CwTokenfactoryIssuerMain: 21,
      CwVesting: 10,
      DaoCore: 11,
      DaoMigrator: -1, // not needed since only v2 DAOs exist
      DaoPreProposeApprovalSingle: 13,
      DaoPreProposeApprover: 14,
      DaoPreProposeMultiple: 15,
      DaoPreProposeSingle: 16,
      DaoProposalMultiple: 17,
      DaoProposalSingle: 18,
      DaoVotingCw4: 19,
      DaoVotingTokenStaked: 22,

      // Unused
      DaoVotingCw721Staked: -1,
    },
  },
  {
    chainId: ChainId.JunoTestnet,
    name: 'juno',
    mainnet: false,
    accentColor: '#f74a49',
    factoryContractAddress:
      'juno1dacj3j6pwr7jx0jeu99qdc4a2ylc2rxp4v3zap54sfrl3ntrhe8qkjfpku',
    explorerUrlTemplates: {
      tx: 'https://testnet.ping.pub/juno/tx/REPLACE',
      gov: 'https://testnet.ping.pub/juno/gov',
      govProp: 'https://testnet.ping.pub/juno/gov/REPLACE',
      wallet: 'https://testnet.ping.pub/juno/account/REPLACE',
    },
    codeIdsVersion: ContractVersion.V240,
    codeIds: {
      // https://github.com/CosmWasm/cw-plus
      Cw1Whitelist: 4060,
      Cw4Group: 178,
      // https://github.com/CosmWasm/cw-nfts
      Cw721Base: 179,

      CwPayrollFactory: 4062,
      CwTokenSwap: 4063,
      CwTokenfactoryIssuerMain: 4065,
      CwVesting: 4066,
      DaoCore: 4067,
      DaoMigrator: 4068,
      DaoPreProposeApprovalSingle: 4069,
      DaoPreProposeApprover: 4070,
      DaoPreProposeMultiple: 4071,
      DaoPreProposeSingle: 4072,
      DaoProposalMultiple: 4073,
      DaoProposalSingle: 4074,
      DaoVotingCw4: 4075,
      DaoVotingCw721Staked: 4076,
      DaoVotingTokenStaked: 4077,

      // For migrating v1 DAOs to the latest v2. Not used by new DAOs.
      Cw20Stake: 4058,
      DaoVotingCw20Staked: 4059,
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
    explorerUrlTemplates: {
      tx: 'https://testnet.ping.pub/osmosis/tx/REPLACE',
      gov: 'https://testnet.ping.pub/osmosis/gov',
      govProp: 'https://testnet.ping.pub/osmosis/gov/REPLACE',
      wallet: 'https://testnet.ping.pub/osmosis/account/REPLACE',
    },
    codeIdsVersion: ContractVersion.V240,
    codeIds: {
      // https://github.com/CosmWasm/cw-plus
      Cw1Whitelist: 5839,
      Cw4Group: 1327, // v0.16
      // https://github.com/CosmWasm/cw-nfts
      Cw721Base: 1326, // v0.16

      CwPayrollFactory: 5841,
      CwTokenSwap: 5842,
      CwTokenfactoryIssuerMain: 5843,
      CwVesting: 5844,
      DaoCore: 5845,
      DaoMigrator: -1, // not needed since only v2 DAOs exist
      DaoPreProposeApprovalSingle: 5847,
      DaoPreProposeApprover: 5848,
      DaoPreProposeMultiple: 5849,
      DaoPreProposeSingle: 5850,
      DaoProposalMultiple: 5851,
      DaoProposalSingle: 5852,
      DaoVotingCw4: 5853,
      DaoVotingCw721Staked: 5854,
      DaoVotingTokenStaked: 5855,
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
    explorerUrlTemplates: {
      tx: 'https://testnet.ping.pub/stargaze/tx/REPLACE',
      gov: 'https://testnet.ping.pub/stargaze/gov',
      govProp: 'https://testnet.ping.pub/stargaze/gov/REPLACE',
      wallet: 'https://testnet.ping.pub/stargaze/account/REPLACE',
    },
    codeIdsVersion: ContractVersion.V250,
    codeIds: {
      // https://github.com/CosmWasm/cw-plus
      Cw1Whitelist: 3459,
      Cw4Group: 2887, // v0.16

      CwPayrollFactory: 4355,
      CwTokenSwap: 4356,
      CwTokenfactoryIssuerMain: 4357,
      CwVesting: 4358,
      DaoCore: 4359,
      DaoMigrator: -1, // not needed since only v2 DAOs exist
      DaoPreProposeApprovalSingle: 4360,
      DaoPreProposeApprover: 4361,
      DaoPreProposeMultiple: 4362,
      DaoPreProposeSingle: 4363,
      DaoProposalMultiple: 4364,
      DaoProposalSingle: 4365,
      DaoVotingCw4: 4366,
      DaoVotingCw721Staked: 4367,
      DaoVotingTokenStaked: 4368,
    },
    historicalCodeIds: {
      [ContractVersion.V210]: {
        DaoPreProposeMultiple: 224,
        DaoProposalMultiple: 226,
      },
    },
  },
  {
    chainId: ChainId.MigalooTestnet,
    name: 'migaloo',
    mainnet: false,
    accentColor: '#3ccd64',
    factoryContractAddress:
      'migaloo1wug8sewp6cedgkmrmvhl3lf3tulagm9hnvy8p0rppz9yjw0g4wtqvk723g',
    explorerUrlTemplates: {
      tx: 'https://testnet.ping.pub/migaloo/tx/REPLACE',
      gov: 'https://testnet.ping.pub/migaloo/gov',
      govProp: 'https://testnet.ping.pub/migaloo/gov/REPLACE',
      wallet: 'https://testnet.ping.pub/migaloo/account/REPLACE',
    },
    codeIdsVersion: ContractVersion.V240,
    codeIds: {
      // https://github.com/CosmWasm/cw-plus
      Cw1Whitelist: 1,
      Cw4Group: 18, // v0.16
      // https://github.com/CosmWasm/cw-nfts
      Cw721Base: 19,

      CwPayrollFactory: 3,
      CwTokenSwap: 4,
      CwTokenfactoryIssuerMain: 65,
      CwTokenfactoryIssuerCosmWasm: 5,
      CwVesting: 6,
      DaoCore: 7,
      DaoMigrator: -1,
      DaoPreProposeApprovalSingle: 9,
      DaoPreProposeApprover: 10,
      DaoPreProposeMultiple: 11,
      DaoPreProposeSingle: 12,
      DaoProposalMultiple: 13,
      DaoProposalSingle: 14,
      DaoVotingCw4: 15,
      DaoVotingCw721Staked: 16,
      DaoVotingTokenStaked: 17,
    },
  },
  {
    chainId: ChainId.KujiraTestnet,
    name: 'kujira',
    mainnet: false,
    accentColor: '#e53935',
    factoryContractAddress:
      'kujira1v5vn69nlmkxcdlqc36ln6fyt6vpahpj9qp9ddt3vhurxsyastknqru9qkg',
    explorerUrlTemplates: {
      tx: 'https://finder.kujira.network/harpoon-4/tx/REPLACE',
      // TODO(kujira-testnet): fix once can link directly to testnet
      // gov: 'https://blue.kujira.network/govern',
      // TODO(kujira-testnet): fix once can link directly to testnet
      // govProp: 'https://blue.kujira.network/govern/REPLACE',
      wallet: 'https://finder.kujira.network/harpoon-4/address/REPLACE',
    },
    codeIdsVersion: ContractVersion.V242,
    codeIds: {
      // https://github.com/CosmWasm/cw-plus
      Cw1Whitelist: 3361,
      Cw4Group: 3362, // v0.16
      // https://github.com/CosmWasm/cw-nfts
      Cw721Base: 3363,

      CwPayrollFactory: 3365,
      CwTokenSwap: 3366,
      CwTokenfactoryIssuerMain: 3378,
      CwVesting: 3367,
      DaoCore: 3368,
      DaoMigrator: -1,
      DaoPreProposeApprovalSingle: 3370,
      DaoPreProposeApprover: 3371,
      DaoPreProposeMultiple: 3372,
      DaoPreProposeSingle: 3373,
      DaoProposalMultiple: 3374,
      DaoProposalSingle: 3375,
      DaoVotingCw4: 3376,
      DaoVotingCw721Staked: 3377,
      DaoVotingTokenStaked: 3379,
    },
  },
  {
    chainId: ChainId.NeutronTestnet,
    name: 'neutron',
    mainnet: false,
    accentColor: '#000000',
    factoryContractAddress:
      'neutron1gu2c0ddyrzk78cuzdlwwtz4c07mfyumx43wefe2fgtv5rf7fvlrq5upnkr',
    govContractAddress: NEUTRON_GOVERNANCE_DAO,
    explorerUrlTemplates: {
      tx: 'https://neutron.celat.one/pion-1/txs/REPLACE',
      wallet: 'https://neutron.celat.one/pion-1/accounts/REPLACE',
    },
    codeIdsVersion: ContractVersion.V242,
    codeIds: {
      // https://github.com/CosmWasm/cw-plus
      Cw1Whitelist: 4618,
      Cw4Group: 4619, // v0.16
      // https://github.com/CosmWasm/cw-nfts
      Cw721Base: 4620,

      CwPayrollFactory: 4622,
      CwTokenSwap: 4623,
      CwTokenfactoryIssuerMain: 4635,
      CwVesting: 4624,
      DaoCore: 4625,
      DaoMigrator: -1, // not needed since only v2 DAOs exist
      DaoPreProposeApprovalSingle: 4627,
      DaoPreProposeApprover: 4628,
      DaoPreProposeMultiple: 4629,
      DaoPreProposeSingle: 4630,
      DaoProposalMultiple: 4631,
      DaoProposalSingle: 4632,
      DaoVotingCw4: 4633,
      DaoVotingCw721Staked: 4634,
      DaoVotingTokenStaked: 4636,
    },
  },
  {
    chainId: ChainId.BitsongTestnet,
    name: 'bitsong',
    mainnet: false,
    accentColor: '#c53381',
    factoryContractAddress:
      'bitsong1ewd84afkxwxmqeu56p5mt3h446mgh3nh8yvmj2238akvu4ax7kss4a3u5c',
    tokenCreationFactoryAddress:
      'bitsong1czmxw9memalgt7823ud5r9hpknhcq2jzz7skah803rx0ug0xpx9qxsq6gx',
    codeIdsVersion: ContractVersion.V242,
    codeIds: {
      // https://github.com/CosmWasm/cw-plus
      Cw1Whitelist: 7,
      Cw4Group: 8, // v0.16
      // https://github.com/CosmWasm/cw-nfts
      Cw721Base: 9,

      CwPayrollFactory: 11,
      CwTokenSwap: 12,
      CwTokenfactoryIssuerMain: 27,
      CwVesting: 13,
      DaoCore: 14,
      DaoMigrator: -1, // not needed since only v2 DAOs exist
      DaoPreProposeApprovalSingle: 16,
      DaoPreProposeApprover: 17,
      DaoPreProposeMultiple: 18,
      DaoPreProposeSingle: 19,
      DaoProposalMultiple: 20,
      DaoProposalSingle: 21,
      DaoVotingCw4: 22,
      DaoVotingCw721Staked: 23,
      DaoVotingTokenStaked: 28,
    },
  },
  {
    chainId: ChainId.SecretTestnet,
    name: 'secret',
    mainnet: false,
    accentColor: '#000000',
    factoryContractAddress: 'secret13dk93ms25qu8j06pxn2p9yphzmsskpejtmddh0',
    noIndexer: true,
    createWithCw20: true,
    explorerUrlTemplates: {
      tx: 'https://testnet.ping.pub/secret/tx/REPLACE',
      gov: 'https://testnet.ping.pub/secret/gov',
      govProp: 'https://testnet.ping.pub/secret/gov/REPLACE',
      wallet: 'https://testnet.ping.pub/secret/account/REPLACE',
    },
    codeIdsVersion: ContractVersion.V242,
    codeIds: {
      // TODO(secret-testnet)
      Cw1Whitelist: -1,
      Cw4Group: 8168,
      Cw20Base: 8164, // snip20
      Cw721Base: 8172, // snip721
      CwPayrollFactory: 8186,
      CwTokenSwap: 8187,
      CwVesting: 8189,
      DaoCore: 8607,
      DaoPreProposeApprovalSingle: 8180,
      DaoPreProposeApprover: 8181,
      DaoPreProposeMultiple: 8177,
      DaoPreProposeSingle: 8175,
      DaoProposalMultiple: 8178,
      DaoProposalSingle: 8176,
      DaoVotingCw4: 8169,
      DaoVotingCw20Staked: 8170, // snip20
      DaoVotingCw721Staked: 8182, // snip721
      DaoVotingTokenStaked: 8174,
      QueryAuth: 8195,

      // unused
      CwTokenfactoryIssuerMain: -1,
      DaoMigrator: -1,
    },
    codeHashes: {
      // TODO(secret-testnet)
      Cw1Whitelist: '',
      Cw4Group:
        '0945d46e86259fffb84c5d7d501f773071ef8101a4112ae5ce1847c2abe297ab',
      Cw20Base:
        'c2508a75824974eeaa578a5d1af07006b1c3911b5c2909813d74672797264775', // snip20
      Cw721Base:
        'ab0f16b065e766eee7181c4357d29bc6f947d73dbd48943fc0e501b2147a492e', // snip721
      CwPayrollFactory:
        'f6f0bd62757f19c513fd2e0bccea1aa4d6bc57ff65c2cdd1f5c849a397eea9fd',
      CwTokenSwap:
        '26f2ce755019de01c65a5742ac3c8e704130a2feaa92bd69d161e76030998f2c',
      CwVesting:
        '0dae83b3616c066d0cdbf061b977707f99d6b91bdc7b44a81285a688e37552b0',
      DaoCore:
        'ad3f67d0983fd13726f34148835e07f65f9225ad698a30d0b55e78e783363fd4',
      DaoPreProposeApprovalSingle:
        '88410e9c96687c01af289c59730d90a425a974c81abf20a76597f076959cb7fc',
      DaoPreProposeApprover:
        '5fc6a014fd017a62bbfea437322857e952eac7572c901a0a6ca23ef7598f971f',
      DaoPreProposeMultiple:
        '24e2a494b9450e6747bdf2b00b01e0f9afb54d455121c58b3857396af74d298f',
      DaoPreProposeSingle:
        'd5fde27c749424968f14a70f4383d3aa1df97ba9ab4933a7e648186ecf8afa1c',
      DaoProposalMultiple:
        '78584b7acdbeae211e71b8711147985217999ab7cf146812df456c48a24835b9',
      DaoProposalSingle:
        '0d412146fccc5936cacc463db54e7721eae03d13977e4c3c3ee570fdbba530c6',
      DaoVotingCw4:
        '732a247721d7629a0c33bbf39c40a5b410fcd7d9b58415f3bcd91fb68a792176',
      DaoVotingCw20Staked:
        '715b7aa5925b46a7fcff277f4ad3763016429daec8ddedd568f892dad2eb88d0', // snip20
      DaoVotingCw721Staked:
        '90f91337256cb3db1b44567ced0457b51271263f67e5df3590de77d22c04a3b3', // snip721
      DaoVotingTokenStaked:
        '3bc835c9e0fdd0deea88202d3de32caa8125891eb0821973f1c5244f818f2d45',
      QueryAuth:
        'dbedf461d93392c5f5e36e07feb46ac4ce0700069d1be6c0796980ef48d1aab4',

      // unused
      CwTokenfactoryIssuerMain: '',
      DaoMigrator: '',
    },
  },
]

export const POLYTONE_CONFIG_PER_CHAIN: [ChainId, PolytoneConfig][] =
  SUPPORTED_CHAINS.map(({ chainId, polytone: polytone = {} }) => [
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
  [ChainId.SecretTestnet]: {
    rpc: 'https://rpc.pulsar.scrttestnet.com',
    rest: 'https://api.pulsar.scrttestnet.com',
  },
}

const INITIAL_CONFIGURED_CHAINS: BaseChainConfig[] = [
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

// The chains not to show in the governance UI.
const NO_GOV_CHAIN_IDS = ['noble-1']

/**
 * All configured chains. Configured chains are either supported chains, which
 * DAO DAO is deployed on, or other chains that show up in the governance UI.
 */
export const CONFIGURED_CHAINS: BaseChainConfig[] = [
  ...INITIAL_CONFIGURED_CHAINS,
  // Add other chains from chain registry.
  ...chains
    .flatMap((chain): BaseChainConfig | [] => {
      // Skip if chain already exists in configured chains.
      if (INITIAL_CONFIGURED_CHAINS.some((c) => c.chainId === chain.chain_id)) {
        return []
      }

      // Skip if no RPC exists for chain. Can't use `getRpcForChainId` helper
      // because that file depends on this one. Yay circular dependencies.
      if (!(chain.chain_id in CHAIN_ENDPOINTS) && !chain.apis?.rpc?.length) {
        return []
      }

      let explorerUrlTemplates: BaseChainConfig['explorerUrlTemplates'] =
        undefined
      if (chain.explorers) {
        const pingPubOrMintscanExplorer =
          chain.explorers?.find(
            (explorer) =>
              explorer.kind?.toLowerCase() === 'ping.pub' &&
              // Some explorers have kind = 'ping.pub' but the wrong URL.
              explorer.url?.includes('ping.pub')
          ) ||
          chain.explorers?.find(
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
          const atomScanExplorer = chain.explorers?.find(
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
          const bigDipperExplorer = chain.explorers?.find(
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
          const explorersGuruExplorer = chain.explorers?.find(
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
          const stakeflowExplorer = chain.explorers?.find(
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
        chainId: chain.chain_id,
        name: chain.chain_name,
        mainnet: chain.network_type === 'mainnet',
        accentColor: '',
        noGov: NO_GOV_CHAIN_IDS.includes(chain.chain_id),
        explorerUrlTemplates,
      }
    })
    .sort((a, b) => a.name.localeCompare(b.name)),
]
