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

// TODO(v2): Fill in code IDs once v2 contracts on mainnet.
const junoMainnet: CodeIdConfig = {
  Cw20Base: 435,
  Cw20Stake: 430,
  Cw4Group: 434,
  Cw721Base: 1554,
  CwAdminFactory: -1,
  DaoCore: -1,
  DaoPreProposeMultiple: -1,
  DaoPreProposeSingle: -1,
  DaoProposalMultiple: -1,
  DaoProposalSingle: -1,
  DaoVotingCw20Staked: -1,
  DaoVotingCw4: -1,
  DaoVotingCw721Staked: -1,
  DaoVotingNativeStaked: -1,
  CwTokenSwap: -1,
}

export const CodeIdConfigs: Record<string, CodeIdConfig | undefined> = {
  'uni-5': junoTestnet,
  'juno-1': junoMainnet,
}
