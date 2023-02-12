import { CodeIdConfig } from '@dao-dao/types'

// ContractVersion.V203: 2.0.3
// https://github.com/DA0-DA0/dao-contracts/releases/tag/v2.0.3
const junoTestnet: CodeIdConfig = {
  Cw20Base: 177,
  Cw20Stake: 155,
  Cw4Group: 178,
  Cw721Base: 179,
  CwAdminFactory: 158,
  DaoCore: 163,
  DaoMigrator: 164,
  DaoPreProposeMultiple: 167,
  DaoPreProposeSingle: 168,
  DaoProposalMultiple: 170,
  DaoProposalSingle: 171,
  DaoVotingCw20Staked: 172,
  DaoVotingCw4: 173,
  DaoVotingCw721Staked: 174,
  DaoVotingNativeStaked: 175,
  CwTokenSwap: 161,
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
