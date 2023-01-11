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
  V1 = '0.1.0',
  V2Alpha = '0.2.0',
  V2Beta = '2.0.0-beta',
  V2 = '2.0.1',
}
