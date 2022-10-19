// eslint-disable-next-line regex/invalid
import { ComponentType, FunctionComponent } from 'react'
import { FieldErrors } from 'react-hook-form'
import { TFunction } from 'react-i18next'

import { LoaderProps, LogoProps } from '@dao-dao/ui'

import { ContractVersion } from './contract'
import { CosmosMsgFor_Empty } from './contracts/common'

export enum ActionKey {
  Spend = 'spend',
  Mint = 'mint',
  Stake = 'stake',
  AddCw20 = 'addCw20',
  RemoveCw20 = 'removeCw20',
  AddCw721 = 'addCw721',
  RemoveCw721 = 'removeCw721',
  ManageMembers = 'manageMembers',
  ManageSubDaos = 'manageSubDaos',
  UpdateInfo = 'updateInfo',
  UpdatePreProposeConfig = 'updatePreProposeConfig',
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

// A component which will render an action's input form.
export type ActionComponentProps<O = undefined, D = any> = {
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
  (O extends undefined ? {} : { options: O })

// eslint-disable-next-line regex/invalid
export type ActionComponent<O = undefined, D = any> = FunctionComponent<
  ActionComponentProps<O, D>
>

export type UseDefaults<D extends {} = any> = () => D

export type UseTransformToCosmos<D extends {} = any> = () => (
  data: D
) => CosmosMsgFor_Empty | undefined

export interface DecodeCosmosMsgNoMatch {
  match: false
  data?: never
}
export interface DecodeCosmosMsgMatch<D extends {} = any> {
  match: true
  data: D
}
export type UseDecodedCosmosMsg<D extends {} = any> = (
  msg: Record<string, any>
) => DecodeCosmosMsgNoMatch | DecodeCosmosMsgMatch<D>

export interface Action<Data extends {} = any, Options extends {} = any> {
  key: ActionKey
  Icon: ComponentType
  label: string
  description: string
  Component: ActionComponent<Options, Data>
  // Hook to get default fields for form display.
  useDefaults: UseDefaults<Data>
  // Hook to make function to convert action data to CosmosMsgFor_Empty.
  useTransformToCosmos: UseTransformToCosmos<Data>
  // Hook to make function to convert decoded msg to form display fields.
  useDecodedCosmosMsg: UseDecodedCosmosMsg<Data>
}

export enum ActionOptionsContextType {
  Dao = 'dao',
  Wallet = 'wallet',
}

export type ActionOptionsContext =
  | {
      type: ActionOptionsContextType.Dao
      coreVersion: ContractVersion
    }
  | {
      type: ActionOptionsContextType.Wallet
    }

export type ActionOptions<ExtraOptions extends {} = {}> = ExtraOptions & {
  t: TFunction
  // coreAddress if context.type === Dao
  // walletAddress if context.type === Wallet
  address: string
  context: ActionOptionsContext
}

export type ActionMaker<Data extends {} = any, ExtraOptions extends {} = {}> = (
  options: ActionOptions<ExtraOptions>
) => Action<Data> | null

// React context/provider system for actions.

export interface IActionsContext {
  options: ActionOptions
  actions: Action[]
}
