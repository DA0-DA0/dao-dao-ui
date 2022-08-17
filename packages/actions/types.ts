// eslint-disable-next-line regex/invalid
import { ComponentType, FunctionComponent } from 'react'
import { FieldErrors } from 'react-hook-form'

import { CosmosMsgFor_Empty } from '@dao-dao/types/contracts/cw3-dao'
import { LoaderProps, LogoProps } from '@dao-dao/ui'
import { ProposalModule } from '@dao-dao/utils'

export enum ActionKey {
  Spend = 'spend',
  Mint = 'mint',
  Stake = 'stake',
  AddCw20 = 'addCw20',
  RemoveCw20 = 'removeCw20',
  AddCw721 = 'addCw721',
  RemoveCw721 = 'removeCw721',
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
export type ActionComponentProps<T = undefined, D = any> = {
  coreAddress: string
  proposalModule: ProposalModule
  fieldNamePrefix: string
  allActionsWithData: ActionKeyAndData[]
  index: number
  data: D
  Loader: ComponentType<LoaderProps>
  Logo: ComponentType<LogoProps>
} & (
  | {
      isCreating: true
      onRemove: () => void
      errors: FieldErrors
    }
  | {
      isCreating: false
      onRemove?: undefined
      errors?: undefined
    }
) &
  (T extends undefined ? {} : { options: T })

// eslint-disable-next-line regex/invalid
export type ActionComponent<T = undefined, D = any> = FunctionComponent<
  ActionComponentProps<T, D>
>

export type UseDefaults<D extends {} = any> = (
  coreAddress: string,
  proposalModule: ProposalModule
) => D

export type UseTransformToCosmos<D extends {} = any> = (
  coreAddress: string,
  proposalModule: ProposalModule
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
  coreAddress: string,
  proposalModule: ProposalModule
) => DecodeCosmosMsgNoMatch | DecodeCosmosMsgMatch<D>

// Defines a new action.
export interface Action<O extends {} = any, D extends {} = any> {
  key: ActionKey
  Icon: ComponentType
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
