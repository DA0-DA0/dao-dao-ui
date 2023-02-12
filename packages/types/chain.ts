import { Coin } from './contracts'

export interface Validator {
  address: string
  moniker: string
  website: string
  details: string
  commission: number
  status: string
  tokens: number
}

export interface Delegation {
  validator: Validator
  delegated: Coin
  pendingReward: Coin
}

export interface UnbondingDelegation {
  validator: Validator
  balance: Coin
  startedAtHeight: number
  finishesAt: Date
}

export interface NativeDelegationInfo {
  delegations: Delegation[]
  unbondingDelegations: UnbondingDelegation[]
}

export enum ContractVersion {
  // https://github.com/DA0-DA0/dao-contracts/releases/tag/v1.0.0
  V1 = '0.1.0',
  // https://github.com/DA0-DA0/dao-contracts/releases/tag/v2.0.0-alpha
  V2Alpha = '0.2.0',
  // https://github.com/DA0-DA0/dao-contracts/releases/tag/v2.0.0-beta
  V2Beta = '2.0.0-beta',
  // https://github.com/DA0-DA0/dao-contracts/releases/tag/v2.0.1
  V201 = '2.0.1',
  // https://github.com/DA0-DA0/dao-contracts/releases/tag/v2.0.2
  V202 = '2.0.2',
  // https://github.com/DA0-DA0/dao-contracts/releases/tag/v2.0.3
  V203 = '2.0.3',
}
