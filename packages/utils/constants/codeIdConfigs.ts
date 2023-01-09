import { CodeIdConfig } from '@dao-dao/types'

// https://github.com/DA0-DA0/dao-contracts/releases/tag/v2.0.0-beta
const junoTestnet: CodeIdConfig = {
  Cw20Base: 3471, // v0.16
  Cw20Stake: 3454,
  Cw4Group: 3472, // v0.16
  Cw721Base: 3356,
  CwAdminFactory: 3455,
  DaoCore: 3457,
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

const junoMainnet: CodeIdConfig = {
  Cw20Base: 1664, // v0.16
  Cw20Stake: 1645,
  Cw4Group: 1668, // v0.16
  Cw721Base: 1554,
  CwAdminFactory: 1648,
  DaoCore: 1650,
  DaoPreProposeMultiple: 1653,
  DaoPreProposeSingle: 1654,
  DaoProposalMultiple: 1655,
  DaoProposalSingle: 1656,
  DaoVotingCw20Staked: 1657,
  DaoVotingCw4: 1658,
  DaoVotingCw721Staked: 1659,
  DaoVotingNativeStaked: 1660,
  CwTokenSwap: 1649,
}

export const CodeIdConfigs: Record<string, CodeIdConfig | undefined> = {
  'uni-5': junoTestnet,
  'juno-1': junoMainnet,
}
