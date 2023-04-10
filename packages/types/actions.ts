// eslint-disable-next-line regex/invalid
import { ComponentType, FunctionComponent } from 'react'
import { FieldErrors } from 'react-hook-form'
import { TFunction } from 'react-i18next'

import { CosmosMsgFor_Empty } from './contracts/common'
import { DaoInfo } from './dao'

export enum ActionCategoryKey {
  Authorizations = 'authorizations',
  ChainGovernance = 'chainGovernance',
  DaoAppearance = 'daoAppearance',
  DaoGovernance = 'daoGovernance',
  Custom = 'custom',
  SmartContracting = 'smartContracting',
  Treasury = 'treasury',
  Nfts = 'nfts',
}

// TODO: Refactor adapter action key system, since a DAO may have multiple proposal modules of the same type, which would lead to duplicate keys.
export enum ActionKey {
  Spend = 'spend',
  ManageStaking = 'manageStaking',
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
  AuthzGrantRevoke = 'authzGrantRevoke',
  AuthzExec = 'authzExec',
  ValidatorActions = 'validatorActions',
  Custom = 'custom',
  BulkImport = 'bulkImport',
  PerformTokenSwap = 'performTokenSwap',
  WithdrawTokenSwap = 'withdrawTokenSwap',
  ManageStorageItems = 'manageStorageItems',
  GovernanceVote = 'governanceVote',
  UpgradeV1ToV2 = 'upgradeV1ToV2',
  EnableVestingPayments = 'enableVestingPayments',
  EnableRetroactiveCompensation = 'enableRetroactiveCompensation',
  WyndSwap = 'wyndSwap',
  DaoAdminExec = 'daoAdminExec',
  EnableMultipleChoice = 'enableMultipleChoice',
  ManageWidgets = 'manageWidgets',
  FeeShare = 'feeShare',
  ManageMembers = 'manageMembers',
  Mint = 'mint',
  ManageVesting = 'manageVesting',
  // DaoProposalSingle
  UpdatePreProposeSingleConfig = 'updatePreProposeSingleConfig',
  UpdateProposalSingleConfig = 'updateProposalSingleConfig',
  // DaoProposalMultiple
  UpdatePreProposeMultipleConfig = 'updatePreProposeMultipleConfig',
  UpdateProposalMultipleConfig = 'updateProposalMultipleConfig',
}

export type CategorizedActionAndData = {
  category: ActionCategoryWithLabel
  action: Action
  data: any
}

export type PartialCategorizedActionAndData = Partial<CategorizedActionAndData>

export type CategorizedActionKeyAndData = {
  // Add an ID field to prevent unnecessary re-renders when things move around.
  // This should be handled by react-hook-form's `useFieldArray`, but it only
  // works internally for that specific hook call, and we need to use it in many
  // different components.
  _id: string
  categoryKey: ActionCategoryKey
  actionKey: ActionKey
  data: any
}

export type PartialCategorizedActionKeyAndDataNoId = Partial<
  Omit<CategorizedActionKeyAndData, '_id'>
>

export type PartialCategorizedActionKeyAndData =
  PartialCategorizedActionKeyAndDataNoId &
    Pick<CategorizedActionKeyAndData, '_id'>

export type CategorizedAction = {
  category: ActionCategoryWithLabel
  action: Action
}

// A component which will render an action's input form.
export type ActionComponentProps<O = undefined, D = any> = {
  fieldNamePrefix: string
  allActionsWithData: PartialCategorizedActionKeyAndData[]
  index: number
  data: D
} & (
  | {
      isCreating: true
      errors: FieldErrors
      // Adds a new action to the form.
      addAction: (
        action: Omit<PartialCategorizedActionKeyAndData, '_id'>
      ) => void
      // Removes this action from the form.
      remove: () => void
    }
  | {
      isCreating: false
      errors?: undefined
      addAction?: undefined
      remove?: undefined
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
  // Optional keywords to improve search results.
  keywords?: string[]
  Component: ActionComponent<Options, Data>
  // This determines if the action should be hidden from creation. If true, the
  // action will not be shown in the list of actions to create, but it will
  // still match and render in existing contexts. This is used to conditionally
  // show the upgrade actions while still allowing them to render in existing
  // proposals.
  disallowCreation?: boolean
  // Whether or not this action is reusable. Defaults to false. If true, when
  // editing the action, the add and remove button in the group will be removed,
  // and the action will be hidden from future category picker selections. Some
  // actions, like 'Spend', make sense to use multiple times, while others, like
  // 'Update Info' or any configuration updater, should only be used once at a
  // time. We should prevent users from adding multiple of these actions.
  notReusable?: boolean
  // Hook to get default fields for form display.
  useDefaults: UseDefaults<Data>
  // Hook to make function to convert action data to CosmosMsgFor_Empty.
  useTransformToCosmos: UseTransformToCosmos<Data>
  // Hook to make function to convert decoded msg to form display fields.
  useDecodedCosmosMsg: UseDecodedCosmosMsg<Data>
}

export type ActionCategory = {
  // If many categories exist with the same key, they will be merged. The first
  // defined label and description will be used. This allows additional modules
  // to add actions to the same category without changing any metadata.
  key: ActionCategoryKey
  label?: string
  description?: string
  // Optional keywords to improve search results.
  keywords?: string[]
  actions: Action[]
}

export type ActionCategoryWithLabel = Omit<ActionCategory, 'label'> & {
  label: string
}

export enum ActionContextType {
  Dao = 'dao',
  Wallet = 'wallet',
}

export type ActionContext =
  | {
      type: ActionContextType.Dao
      info: DaoInfo
    }
  | {
      type: ActionContextType.Wallet
    }

export type ActionOptions<ExtraOptions extends {} = {}> = ExtraOptions & {
  t: TFunction
  chainId: string
  bech32Prefix: string
  // coreAddress if context.type === Dao
  // walletAddress if context.type === Wallet
  address: string
  context: ActionContext
}

export type ActionMaker<Data extends {} = any, ExtraOptions extends {} = {}> = (
  options: ActionOptions<ExtraOptions>
) => Action<Data> | null

// A category maker can return null to indicate that the category should not be
// included. It can also return either actions, action makers, or both. This is
// convience to avoid every category maker needing the same boilerplate action
// maker code. `actionMakers` will be made into actions and merged with
// `actions`. If no actions exist after all are made, the category will be
// ignored.
export type ActionCategoryMaker<ExtraOptions extends {} = {}> = (
  options: ActionOptions<ExtraOptions>
) =>
  | (Omit<ActionCategory, 'actions'> & {
      actions?: Action[]
      actionMakers?: ActionMaker[]
    })
  | null

// React context/provider system for actions.

export type IActionsContext = {
  options: ActionOptions
  categories: ActionCategoryWithLabel[]
}

export type UseActionsOptions = {
  // If true, the actions will be filtered to only include those which are
  // allowed to be created. This is used to hide the upgrade actions from the
  // list of actions to create.
  isCreating?: boolean
}

export type LoadedAction = {
  category: ActionCategoryWithLabel
  action: Action
  transform: ReturnType<UseTransformToCosmos>
  defaults: ReturnType<UseDefaults>
}
export type LoadedActions = Partial<Record<ActionKey, LoadedAction>>
