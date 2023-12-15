import {
  ParsedTarget,
  RebalancerConfig,
} from './contracts/ValenceServiceRebalancer'
import { GenericTokenSource } from './token'

// The type of account. `native` means it's a wallet/smart contract/module
// address on the native chain given the context. `polytone` means it's a
// polytone account controlled by an account on another chain. `valence` means
// it's a valence account controlled by an account on the same or another chain.
// `ica` means it's an ICA account controlled by an account on another chain.
export enum AccountType {
  Native = 'native',
  Polytone = 'polytone',
  Valence = 'valence',
  Ica = 'ica',
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

export type IcaAccountTypeConfig = {
  type: AccountType.Ica
  config?: undefined
}

export type ValenceAccountConfig = {
  // If rebalancer setup, this will be defined.
  rebalancer?: {
    config: RebalancerConfig
    // Process targest.
    targets: ValenceAccountRebalancerTarget[]
  }
}

export type ValenceAccountRebalancerTarget = {
  // The source that uniquely identifies a token.
  source: GenericTokenSource
  // Target changes over time for this token.
  targets: ({
    timestamp: number
  } & ParsedTarget)[]
}

export type BaseAccount = {
  chainId: string
  address: string
}

export type NativeAccount = BaseAccount & NativeAccountTypeConfig
export type PolytoneAccount = BaseAccount & PolytoneAccountTypeConfig
export type ValenceAccount = BaseAccount & ValenceAccountTypeConfig
export type IcaAccount = BaseAccount & IcaAccountTypeConfig

export type Account =
  | NativeAccount
  | PolytoneAccount
  | ValenceAccount
  | IcaAccount
