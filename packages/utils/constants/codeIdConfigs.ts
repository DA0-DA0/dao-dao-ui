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
  // TODO: Add testnet code IDs.
  CwPayrollFactory: -1,
  CwVesting: -1,
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
