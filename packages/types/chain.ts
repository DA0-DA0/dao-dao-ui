import { Coin } from './contracts'

export interface Validator {
  address: string
  moniker: string
  website: string
  details: string
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

export enum ContractVersion {
  V0_1_0 = '0.1.0',
  V0_2_0 = '0.2.0',
}
