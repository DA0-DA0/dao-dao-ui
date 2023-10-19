// The type of account. `native` means it's a wallet/smart contract/module
// address on the native chain. `polytone` means it's a polytone account
// controlled by an account on another chain. `valence` means it's a valence

import { GenericTokenSource } from './token'

// account controlled by an account on the same or another chain.
export enum AccountType {
  Native = 'native',
  Polytone = 'polytone',
  Valence = 'valence',
}

export type NativeAccountTypeConfig = {
  type: AccountType.Native
  config?: undefined
}

export type PolytoneAccountTypeConfig = {
  type: AccountType.Polytone
  config?: undefined
}

export type ValenceAccountTypeConfig = {
  type: AccountType.Valence
  config: ValenceAccountConfig
}

export type ValenceAccountConfig = {
  // If rebalancer setup, this will be defined.
  rebalancer?: {
    targets: ValenceAccountRebalancerTarget[]
  }
}

export type ValenceAccountRebalancerTarget = {
  // The source that uniquely identifies a token.
  source: GenericTokenSource
  targets: {
    timestamp: number
    // Proportion between 0 and 1.
    target: number
  }[]
}

export type BaseAccount = {
  chainId: string
  address: string
}

export type NativeAccount = BaseAccount & NativeAccountTypeConfig
export type PolytoneAccount = BaseAccount & PolytoneAccountTypeConfig
export type ValenceAccount = BaseAccount & ValenceAccountTypeConfig

export type Account = NativeAccount | PolytoneAccount | ValenceAccount
