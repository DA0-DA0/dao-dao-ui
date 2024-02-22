import { ComponentType } from 'react'

import { ActionKeyAndData } from './actions'

/**
 * The type of account given whatever the relevant context is.
 */
export enum AccountType {
  /**
   * Wallet/smart contract/module address on the current chain given the
   * context.
   */
  Native = 'native',
  /**
   * A Polytone account controlled by an account on another chain.
   */
  Polytone = 'polytone',
  /**
   * An ICA controlled by an account on another chain.
   */
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

/**
 * Unique identifier for account tabs, which is used in the URL path.
 */
export enum AccountTabId {
  Balances = 'balances',
  Daos = 'daos',
  TransactionBuilder = 'tx',
}

export type AccountTab = {
  id: AccountTabId
  label: string
  Icon: ComponentType<{ className: string }>
  Component: ComponentType
}

export type AccountTxForm = {
  actions: ActionKeyAndData[]
}

export type AccountTxSave = AccountTxForm & {
  name: string
  description?: string
}

/**
 * The details that describe a cryptographic multisig.
 */
export type CryptographicMultisigDetails = {
  /**
   * The multisig's chain ID.
   */
  chainId: string
  /**
   * The multisig's address.
   */
  address: string
  /**
   * The member addresses of the multisig.
   */
  addresses: string[]
  /**
   * The number of members that must sign a transaction for it to be valid.
   */
  threshold: number
}
