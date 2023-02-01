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

export type MeProps = {
  connected: boolean
  actions: Action[]
  actionsWithData: ActionsWithData
  formMethods: UseFormReturn<MeTransactionForm, object>
  execute: (messages: CosmosMsgFor_Empty[]) => Promise<void>
  loading: boolean
  rightSidebarContent: ReactNode
  SuspenseLoader: ComponentType<SuspenseLoaderProps>
  error?: string
  txHash?: string
  saves: LoadingData<MeTransactionSave[]>
  save: (save: MeTransactionSave) => Promise<boolean>
  deleteSave: (save: MeTransactionSave) => Promise<boolean>
  saving: boolean
}
