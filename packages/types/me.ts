import { ComponentType, ReactNode } from 'react'
import { UseFormReturn } from 'react-hook-form'

import { Action, ActionKeyAndData, ActionsWithData } from './actions'
import { CosmosMsgFor_Empty } from './contracts'
import { LoadingData, SuspenseLoaderProps } from './stateless'

export type MeTransactionForm = {
  actions: ActionKeyAndData[]
}

export type MeTransactionSave = MeTransactionForm & {
  name: string
  description?: string
}

// Value goes in URL hash.
export enum MeTabId {
  TransactionBuilder = 'tx',
}

export type MeTab = {
  id: MeTabId
  label: string
  Component: ComponentType
}

export type MeProps = {
  rightSidebarContent: ReactNode
  MeTransactionBuilder: ComponentType
}

export type MeTransactionBuilderProps = {
  actions: Action[]
  actionsWithData: ActionsWithData
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
