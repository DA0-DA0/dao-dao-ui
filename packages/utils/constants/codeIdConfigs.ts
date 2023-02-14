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
  DaoPreProposeMultiple: 167,
  DaoPreProposeSingle: 168,
  DaoProposalMultiple: 170,
  DaoProposalSingle: 171,
  DaoVotingCw20Staked: 172,
  DaoVotingCw4: 173,
  DaoVotingCw721Staked: 174,
  DaoVotingNativeStaked: 175,
  CwTokenSwap: 161,
  CwPayrollFactory: 160,
  CwVesting: 162,
}

// ContractVersion.V2: 2.0.1
const junoMainnet: CodeIdConfig = {
  Cw20Base: 1664, // v0.16
  Cw20Stake: 1683,
  Cw4Group: 1668, // v0.16
  Cw721Base: 1671,
  CwAdminFactory: 1686,
  DaoCore: 1688,
  DaoPreProposeMultiple: 1691,
  DaoPreProposeSingle: 1692,
  DaoProposalMultiple: 1693,
  DaoProposalSingle: 1694,
  DaoVotingCw20Staked: 1695,
  DaoVotingCw4: 1696,
  DaoVotingCw721Staked: 1697,
  DaoVotingNativeStaked: 1698,
  CwTokenSwap: 1687,
  CwPayrollFactory: 1770,
  CwVesting: 1771,
}

export const CodeIdConfigs: Record<string, CodeIdConfig | undefined> = {
  'uni-6': junoTestnet,
  'juno-1': junoMainnet,
}
