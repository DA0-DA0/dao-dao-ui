import { ComponentType, ReactNode } from 'react'
import { UseFormReturn } from 'react-hook-form'

import {
  ActionCategoryWithLabel,
  LoadedActions,
  PartialCategorizedActionKeyAndData,
} from './actions'
import { SuspenseLoaderProps, WalletProfileHeaderProps } from './components'
import { CosmosMsgFor_Empty } from './contracts'
import { LoadingData } from './misc'

export type MeTransactionForm = {
  actions: PartialCategorizedActionKeyAndData[]
}

export type MeTransactionSave = MeTransactionForm & {
  name: string
  description?: string
}

// Value goes in URL hash.
export enum MeTabId {
  Balances = 'balances',
  Daos = 'daos',
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
  MeDaos: ComponentType
  ChainSwitcher: ComponentType<any>
} & Omit<WalletProfileHeaderProps, 'editable' | 'className'>

export type MeTransactionBuilderProps = {
  categories: ActionCategoryWithLabel[]
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
