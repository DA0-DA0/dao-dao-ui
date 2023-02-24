import { ComponentType, ReactNode } from 'react'
import { UseFormReturn } from 'react-hook-form'

import { Action, ActionKeyAndData, LoadedActions } from './actions'
import { CosmosMsgFor_Empty } from './contracts'
import { NftCardInfo } from './dao'
import { WalletProfileData } from './profile'
import { LoadingData, SuspenseLoaderProps } from './stateless'
import { TokenCardInfo } from './token'

export type MeTransactionForm = {
  actions: ActionKeyAndData[]
}

export type MeTransactionSave = MeTransactionForm & {
  name: string
  description?: string
}

// Value goes in URL hash.
export enum MeTabId {
  Balances = 'balances',
  TransactionBuilder = 'tx',
}

export type MeTab = {
  id: MeTabId
  label: string
  Component: ComponentType
}

export type MeProps = {
  rightSidebarContent: ReactNode
  MeBalances: ComponentType
  MeTransactionBuilder: ComponentType
  walletAddress: string
  profileData: WalletProfileData
}

export type MeTransactionBuilderProps = {
  actions: Action[]
  loadedActions: LoadedActions
  formMethods: UseFormReturn<MeTransactionForm, object>
  execute: (messages: CosmosMsgFor_Empty[]) => Promise<void>
  loading: boolean
  SuspenseLoader: ComponentType<SuspenseLoaderProps>
  error?: string
  txHash?: string
  saves: LoadingData<MeTransactionSave[]>
  save: (save: MeTransactionSave) => Promise<boolean>
  deleteSave: (save: MeTransactionSave) => Promise<boolean>
  saving: boolean
}

export type MeBalancesProps<T extends TokenCardInfo, N extends NftCardInfo> = {
  tokens: LoadingData<T[]>
  // List of token denomOrAddress fields that should be hidden.
  hiddenTokens: LoadingData<string[]>
  TokenCard: ComponentType<T>
  nfts: LoadingData<N[]>
  NftCard: ComponentType<N>
}
