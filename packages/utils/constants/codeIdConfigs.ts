import { CodeIdConfig } from '@dao-dao/types'

// ContractVersion.V203
// https://github.com/DA0-DA0/dao-contracts/releases/tag/v2.0.3
const junoTestnet: CodeIdConfig = {
  Cw20Stake: 155,
  CwAdminFactory: 158,
  CwTokenSwap: 161,
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
  Cw20Base: 177,
  Cw4Group: 178,
  Cw721Base: 179,
}

// ContractVersion.V203
// https://github.com/DA0-DA0/dao-contracts/releases/tag/v2.0.3
const junoMainnet: CodeIdConfig = {
  Cw20Stake: 1995,
  CwAdminFactory: 2013,
  CwTokenSwap: 2000,
  DaoCore: 2024,
  DaoMigrator: 2025,
  DaoPreProposeMultiple: 2028,
  DaoPreProposeSingle: 2029,
  DaoProposalMultiple: 2031,
  DaoProposalSingle: 2032,
  DaoVotingCw20Staked: 2033,
  DaoVotingCw4: 2034,
  DaoVotingCw721Staked: 2035,
  DaoVotingNativeStaked: 2036,
  Cw20Base: 1993, // v0.16
  Cw4Group: 1992, // v0.16
  Cw721Base: 1994, // v0.16
}

export const CodeIdConfigs: Record<string, CodeIdConfig | undefined> = {
  'uni-6': junoTestnet,
  'juno-1': junoMainnet,
}
