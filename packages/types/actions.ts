// eslint-disable-next-line regex/invalid
import { ComponentType, FunctionComponent } from 'react'
import { FieldErrors } from 'react-hook-form'
import { TFunction } from 'react-i18next'

import { ContractVersion } from './chain'
import { CosmosMsgFor_Empty } from './contracts/common'

// Actions defined in the core actions system (@dao-dao/stateful/actions). These
// are provided in the top-level ActionsProvider.
export enum CoreActionKey {
  Spend = 'spend',
  StakingActions = 'stakingActions',
  ManageCw20 = 'manageCw20',
  ManageCw721 = 'manageCw721',
  TransferNft = 'transferNft',
  MintNft = 'mintNft',
  BurnNft = 'burnNft',
  ManageSubDaos = 'manageSubDaos',
  UpdateInfo = 'updateInfo',
  Instantiate = 'instantiate',
  Execute = 'execute',
  Migrate = 'migrate',
  UpdateAdmin = 'updateAdmin',
  Custom = 'custom',
  PerformTokenSwap = 'performTokenSwap',
  WithdrawTokenSwap = 'withdrawTokenSwap',
  ManageStorageItems = 'manageStorageItems',
}

// Actions defined in voting or proposal module adapters.
export enum AdapterActionKey {
  ManageMembers = 'manageMembers',
  Mint = 'mint',
  UpdatePreProposeConfig = 'updatePreProposeConfig',
  UpdateProposalConfig = 'updateProposalConfig',
}

export type ActionKey = CoreActionKey | AdapterActionKey

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
} & (
  | {
      isCreating: true
      onRemove: () => void
      errors: FieldErrors
      addAction: (action: ActionKeyAndData) => void
    }
  | {
      isCreating: false
      onRemove?: undefined
      errors?: undefined
      addAction?: undefined
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
  chainId: string
  bech32Prefix: string
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

export type ActionsWithData = Partial<
  Record<
    ActionKey,
    {
      action: Action
      transform: ReturnType<UseTransformToCosmos>
      defaults: ReturnType<UseDefaults>
    }
  >
>
