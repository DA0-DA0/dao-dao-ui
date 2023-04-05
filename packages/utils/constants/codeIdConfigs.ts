import { CodeIdConfig } from '@dao-dao/types'

const stargazeTestnet: CodeIdConfig = {
  // https://github.com/CosmWasm/cw-plus
  Cw20Base: 1931,
  Cw4Group: 1935,
  // https://github.com/CosmWasm/cw-nfts
  Cw721Base: 1936,

  // ContractVersion.V210
  // https://github.com/DA0-DA0/dao-contracts/releases/tag/v2.1.0
  Cw20Stake: 1932,
  CwAdminFactory: 1937,
  CwPayrollFactory: 1939,
  CwTokenSwap: 1940,
  CwVesting: 1941,
  DaoCore: 1942,
  DaoMigrator: 1943,
  DaoPreProposeMultiple: 1946,
  DaoPreProposeSingle: 1947,
  DaoProposalMultiple: 1949,
  DaoProposalSingle: 1950,
  DaoVotingCw20Staked: 1951,
  DaoVotingCw4: 1952,
  DaoVotingCw721Staked: 1952,
  DaoVotingNativeStaked: 1954,
}

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

export const CodeIdConfigs: Record<string, CodeIdConfig | undefined> = {
  'stargaze-1': stargazeTestnet,
  // 'uni-6': junoTestnet,
  // 'juno-1': junoMainnet,
}
