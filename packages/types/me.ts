import { ComponentType, ReactNode } from 'react'
import { UseFormReturn } from 'react-hook-form'

import { Action, ActionKeyAndData, ActionsWithData } from './actions'
import { CosmosMsgFor_Empty } from './contracts'
import {
  LoadingData,
  LoadingDataWithError,
  SuspenseLoaderProps,
} from './stateless'

export type MeTransactionForm = {
  actions: ActionKeyAndData[]
}

export type MeTransactionSave = MeTransactionForm & {
  name: string
  description?: string
}

// Value goes in URL hash.
export enum MeTabId {
  Identity = 'identity',
  TransactionBuilder = 'tx',
}

export type MeTab = {
  id: MeTabId
  label: string
  Component: ComponentType
}

export type MeProps = {
  rightSidebarContent: ReactNode
  MeIdentity: ComponentType
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

export enum CheckmarkStatus {
  None = 'none',
  Pending = 'pending',
  Processing = 'processing',
  Checkmarked = 'checkmarked',
  Failed = 'failed',
}

export type MeIdentityStatus = {
  status: CheckmarkStatus
  // Present if status is 'pending'.
  sessionId?: string
  // Present if status is 'failed'.
  errors?: string[]
}

export type MeIdentityProps = {
  loadingStatus: LoadingDataWithError<MeIdentityStatus>
  beginVerification: () => Promise<void>
  onFinishVerification: () => void
  // If undefined, verification is not in progress.
  verificationSessionId: LoadingData<string | undefined>
  deleteCheckmark: () => Promise<void>
  deletingCheckmark: boolean
}
