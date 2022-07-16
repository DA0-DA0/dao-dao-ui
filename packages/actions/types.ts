import { ComponentType, FunctionComponent } from 'react'
import { FieldErrors } from 'react-hook-form'

import { CosmosMsgFor_Empty } from '@dao-dao/types/contracts/cw3-dao'
import { LoaderProps } from '@dao-dao/ui'

export enum ActionKey {
  Spend = 'spend',
  Mint = 'mint',
  Stake = 'stake',
  AddToken = 'addToken',
  RemoveToken = 'removeToken',
  ManageMembers = 'manageMembers',
  UpdateInfo = 'updateInfo',
  UpdateProposalConfig = 'updateProposalConfig',
  Instantiate = 'instantiate',
  Execute = 'execute',
  Migrate = 'migrate',
  UpdateAdmin = 'updateAdmin',
  Custom = 'custom',
}

export interface ActionAndData {
  action: Action
  data: any
}

export interface ActionKeyAndData {
  key: ActionKey
  data: any
}

export interface FormProposalData {
  title: string
  description: string
  actionData: ActionKeyAndData[]
}

// A component which will render an action's input form.
export type ActionComponentProps<T = undefined> = {
  coreAddress: string
  proposalId?: number
  getFieldName: (field: string) => string
  onRemove?: () => void
  errors?: FieldErrors
  readOnly?: boolean
  allActionsWithData: ActionKeyAndData[]
  index: number
  Loader: ComponentType<LoaderProps>
} & (T extends undefined ? {} : { options: T })

export type ActionComponent<T = undefined> = FunctionComponent<
  ActionComponentProps<T>
>

export type UseDefaults<D extends {} = any> = (coreAddress: string) => D

export type UseTransformToCosmos<D extends {} = any> = (
  coreAddress: string
) => (data: D) => CosmosMsgFor_Empty | undefined

export interface DecodeCosmosMsgNoMatch {
  match: false
  data?: never
}
export interface DecodeCosmosMsgMatch<D extends {} = any> {
  match: true
  data: D
}
export type UseDecodedCosmosMsg<D extends {} = any> = (
  msg: Record<string, any>,
  coreAddress: string
) => DecodeCosmosMsgNoMatch | DecodeCosmosMsgMatch<D>

// Defines a new action.
export interface Action<O extends {} = any, D extends {} = any> {
  key: ActionKey
  label: string
  description: string
  Component: ActionComponent<O>
  // Hook to get default fields for form display.
  useDefaults: UseDefaults<D>
  // Hook to make function to convert action data to CosmosMsgFor_Empty.
  useTransformToCosmos: UseTransformToCosmos<D>
  // Hook to make function to convert decoded msg to form display fields.
  useDecodedCosmosMsg: UseDecodedCosmosMsg<D>
}
