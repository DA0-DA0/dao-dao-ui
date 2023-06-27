import { ChainInfoID } from '@noahsaso/cosmodal'

import { CodeIdConfig } from '@dao-dao/types'

import { OSMOSIS_TESTNET_CHAIN_ID } from './chains'

const junoTestnet: CodeIdConfig = {
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
}

const junoMainnet: CodeIdConfig = {
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
}

// TODO: Fill in.
const osmosisMainnet: CodeIdConfig = {
  // https://github.com/CosmWasm/cw-plus
  Cw20Base: 999, // v0.16
  Cw4Group: 999, // v0.16
  // https://github.com/CosmWasm/cw-nfts
  Cw721Base: 999, // v0.16

  // ContractVersion.V210
  // https://github.com/DA0-DA0/dao-contracts/releases/tag/v2.1.0
  Cw20Stake: 999,
  CwAdminFactory: 999,
  CwPayrollFactory: 999,
  CwTokenSwap: 999,
  CwVesting: 999,
  DaoCore: 999,
  DaoMigrator: 999,
  DaoPreProposeMultiple: 999,
  DaoPreProposeSingle: 999,
  DaoProposalMultiple: 999,
  DaoProposalSingle: 999,
  DaoVotingCw20Staked: 999,
  DaoVotingCw4: 999,
  DaoVotingCw721Staked: 999,
  DaoVotingNativeStaked: 999,
}

const osmosisTestnet: CodeIdConfig = {
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
}

export const CodeIdConfigs: Record<string, CodeIdConfig | undefined> = {
  [ChainInfoID.Uni6]: junoTestnet,
  [ChainInfoID.Juno1]: junoMainnet,
  [ChainInfoID.Osmosis1]: osmosisMainnet,
  [OSMOSIS_TESTNET_CHAIN_ID]: osmosisTestnet,
}
