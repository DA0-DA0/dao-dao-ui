import { CodeIdConfig } from '@dao-dao/types'

// https://github.com/DA0-DA0/dao-contracts/releases/tag/v2.0.0-beta
const junoTestnet: CodeIdConfig = {
  Cw20Base: 870,
  Cw20Stake: 871,
  Cw4Group: 872,
  Cw721Base: 3356,
  CwAdminFactory: 873,
  DaoCore: 875,
  DaoPreProposeMultiple: 876,
  DaoPreProposeSingle: 877,
  DaoProposalMultiple: 878,
  DaoProposalSingle: 879,
  DaoVotingCw20Staked: 880,
  DaoVotingCw4: 881,
  DaoVotingCw721Staked: 882,
  DaoVotingNativeStaked: 883,
  CwTokenSwap: 2825,
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
