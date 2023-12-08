// The type of account. `native` means it's a wallet/smart contract/module
// address on the native chain. `polytone` means it's a polytone account
// controlled by an account on another chain.

// account controlled by an account on the same or another chain.
export enum AccountType {
  Native = 'native',
  Polytone = 'polytone',
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

export type IcaAccountTypeConfig = {
  type: AccountType.Ica
  config?: undefined
}

export type BaseAccount = {
  chainId: string
  address: string
}

export type NativeAccount = BaseAccount & NativeAccountTypeConfig
export type PolytoneAccount = BaseAccount & PolytoneAccountTypeConfig
export type IcaAccount = BaseAccount & IcaAccountTypeConfig

export type Account = NativeAccount | PolytoneAccount | IcaAccount
