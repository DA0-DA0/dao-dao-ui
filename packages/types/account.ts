import { ComponentType } from 'react'

import { ActionKeyAndData } from './actions'
import { Threshold } from './contracts/DaoProposalSingle.common'

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
  Home = 'home',
  Daos = 'daos',
  Actions = 'actions',
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
 * The details that describe a multisig membership and threshold.
 */
export type MultisigDetails = {
  /**
   * The multisig's chain ID.
   */
  chainId: string
  /**
   * The multisig's address.
   */
  address: string
  /**
   * The members of the multisig.
   */
  members: {
    address: string
    weight: number
  }[]
  /**
   * The threshold of members that must sign a transaction for it to be valid.
   */
  threshold: Threshold
  /**
   * The sum of all members' weights.
   */
  totalWeight: number
}
