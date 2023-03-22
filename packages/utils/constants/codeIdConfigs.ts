import { CodeIdConfig } from '@dao-dao/types'

// ContractVersion.V203
// https://github.com/DA0-DA0/dao-contracts/releases/tag/v2.0.3
const junoTestnet: CodeIdConfig = {
  // https://github.com/CosmWasm/cw-plus
  Cw20Base: 177,
  Cw4Group: 178,
  // https://github.com/CosmWasm/cw-nfts
  Cw721Base: 179,
  // https://github.com/DA0-DA0/dao-contracts
  Cw20Stake: 155,
  CwAdminFactory: 158,
  CwPayrollFactory: 526,
  CwTokenSwap: 161,
  CwVesting: 633,
  DaoCore: 163,
  // TODO: Add DaoMigrator.
  DaoMigrator: -1,
  DaoPreProposeMultiple: 167,
  DaoPreProposeSingle: 168,
  DaoProposalMultiple: 170,
  DaoProposalSingle: 171,
  DaoVotingCw20Staked: 172,
  DaoVotingCw4: 173,
  DaoVotingCw721Staked: 174,
  DaoVotingNativeStaked: 175,
}

// ContractVersion.V203
// https://github.com/DA0-DA0/dao-contracts/releases/tag/v2.0.3
const junoMainnet: CodeIdConfig = {
  // https://github.com/CosmWasm/cw-plus
  Cw20Base: 1993, // v0.16
  Cw4Group: 1992, // v0.16
  // https://github.com/CosmWasm/cw-nfts
  Cw721Base: 1994, // v0.16
  // https://github.com/DA0-DA0/dao-contracts
  Cw20Stake: 1995,
  CwAdminFactory: 2013,
  CwPayrollFactory: -1,
  CwTokenSwap: 2000,
  CwVesting: -1,
  DaoCore: 2024,
  // TODO: Add DaoMigrator.
  DaoMigrator: -1,
  DaoPreProposeMultiple: 2028,
  DaoPreProposeSingle: 2029,
  DaoProposalMultiple: 2031,
  DaoProposalSingle: 2032,
  DaoVotingCw20Staked: 2033,
  DaoVotingCw4: 2034,
  DaoVotingCw721Staked: 2035,
  DaoVotingNativeStaked: 2036,
}

export const CodeIdConfigs: Record<string, CodeIdConfig | undefined> = {
  'uni-6': junoTestnet,
  'juno-1': junoMainnet,
}
