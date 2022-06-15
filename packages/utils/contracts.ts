import {
  CW20STAKEDBALANCEVOTING_CONTRACT_NAME,
  CW4VOTING_CONTRACT_NAME,
} from './constants'

export enum VotingModuleType {
  Cw4Voting = 'Cw4Voting',
  Cw20StakedBalanceVoting = 'Cw20StakedBalanceVoting',
}

export const parseVotingModuleContractName = (contractName: string) =>
  contractName.includes(CW4VOTING_CONTRACT_NAME)
    ? VotingModuleType.Cw4Voting
    : contractName.includes(CW20STAKEDBALANCEVOTING_CONTRACT_NAME)
    ? VotingModuleType.Cw20StakedBalanceVoting
    : undefined
