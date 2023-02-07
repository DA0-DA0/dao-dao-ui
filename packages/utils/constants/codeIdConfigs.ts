import { CodeIdConfig } from '@dao-dao/types'

// ContractVersion.V2Beta
// https://github.com/DA0-DA0/dao-contracts/releases/tag/v2.0.0-beta
const junoTestnet: CodeIdConfig = {
  Cw20Base: 3471, // v0.16
  Cw20Stake: 3454,
  Cw4Group: 3472, // v0.16
  Cw721Base: 3356,
  CwAdminFactory: 3455,
  DaoCore: 3457,
  DaoMigrator: -1,
  DaoPreProposeMultiple: 3460,
  DaoPreProposeSingle: 3461,
  DaoProposalMultiple: 3462,
  DaoProposalSingle: 3463,
  DaoVotingCw20Staked: 3464,
  DaoVotingCw4: 3465,
  DaoVotingCw721Staked: 3466,
  DaoVotingNativeStaked: 3467,
  CwTokenSwap: 3456,
}

// ContractVersion.V202
// https://github.com/DA0-DA0/dao-contracts/releases/tag/v2.0.2
const junoMainnet: CodeIdConfig = {
  Cw20Base: 1664, // v0.16
  Cw20Stake: 1900,
  Cw4Group: 1668, // v0.16
  Cw721Base: 1671,
  CwAdminFactory: 1903,
  DaoCore: 1908,
  DaoMigrator: 1909,
  DaoPreProposeMultiple: 1912,
  DaoPreProposeSingle: 1913,
  DaoProposalMultiple: 1915,
  DaoProposalSingle: 1916,
  DaoVotingCw20Staked: 1917,
  DaoVotingCw4: 1918,
  DaoVotingCw721Staked: 1919,
  DaoVotingNativeStaked: 1920,
  CwTokenSwap: 1906,
}

export const CodeIdConfigs: Record<string, CodeIdConfig | undefined> = {
  'uni-6': junoTestnet,
  'juno-1': junoMainnet,
}
