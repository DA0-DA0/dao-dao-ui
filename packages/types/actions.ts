// eslint-disable-next-line regex/invalid
import { Chain } from '@chain-registry/types'
import { ComponentType, ReactNode } from 'react'
import { FieldErrors } from 'react-hook-form'
import { TFunction } from 'react-i18next'

import {
  ConfiguredChainContext,
  IChainContext,
  SupportedChainContext,
} from './chain'
import { UnifiedCosmosMsg } from './contracts/common'
import { DaoInfo } from './dao'
import { AllGovParams } from './gov'
import { PfpkProfile } from './profile'

export enum ActionCategoryKey {
  CommonlyUsed = 'commonlyUsed',
  Authorizations = 'authorizations',
  ChainGovernance = 'chainGovernance',
  DaoAppearance = 'daoAppearance',
  DaoGovernance = 'daoGovernance',
  SmartContracting = 'smartContracting',
  Treasury = 'treasury',
  Nfts = 'nfts',
  Press = 'press',
  Advanced = 'advanced',
}

export enum ActionKey {
  Spend = 'spend',
  CommunityPoolSpend = 'communityPoolSpend',
  CommunityPoolDeposit = 'communityPoolDeposit',
  ManageStaking = 'manageStaking',
  ManageCw20 = 'manageCw20',
  ManageCw721 = 'manageCw721',
  CreateNftCollection = 'createNftCollection',
  TransferNft = 'transferNft',
  MintNft = 'mintNft',
  BurnNft = 'burnNft',
  ManageSubDaos = 'manageSubDaos',
  UpdateInfo = 'updateInfo',
  Instantiate = 'instantiate',
  Instantiate2 = 'instantiate2',
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
  GovernanceProposal = 'governanceProposal',
  GovernanceDeposit = 'governanceDeposit',
  UpgradeV1ToV2 = 'upgradeV1ToV2',
  ConfigureVestingPayments = 'configureVestingPayments',
  EnableRetroactiveCompensation = 'enableRetroactiveCompensation',
  DaoAdminExec = 'daoAdminExec',
  EnableMultipleChoice = 'enableMultipleChoice',
  SetUpApprover = 'setUpApprover',
  ManageWidgets = 'manageWidgets',
  FeeShare = 'feeShare',
  ManageMembers = 'manageMembers',
  Mint = 'mint',
  UpdateMinterAllowance = 'updateMinterAllowance',
  ManageVesting = 'manageVesting',
  CreateCrossChainAccount = 'createCrossChainAccount',
  CrossChainExecute = 'crossChainExecute',
  UpdateStakingConfig = 'updateStakingConfig',
  CreateIca = 'createIca',
  IcaExecute = 'icaExecute',
  ManageIcas = 'manageIcas',
  VetoOrEarlyExecuteDaoProposal = 'vetoOrEarlyExecuteDaoProposal',
  NeutronOverruleSubDaoProposal = 'neutronOverruleSubDaoProposal',
  ManageVetoableDaos = 'manageVetoableDaos',
  UploadCode = 'uploadCode',
  ManageSubDaoPause = 'manageSubDaoPause',
  UpdatePreProposeConfig = 'updatePreProposeConfig',
  UpdateProposalConfig = 'updateProposalConfig',
  MigrateMigalooV4TokenFactory = 'migrateMigalooV4TokenFactory',
  CreateDao = 'createDao',
  // Press
  CreatePost = 'createPost',
  UpdatePost = 'updatePost',
  DeletePost = 'deletePost',
}

export type ActionAndData = {
  action: Action
  data: any
}

export type ActionKeyAndData = {
  // Add an ID field to prevent unnecessary re-renders when things move around.
  // This should be handled by react-hook-form's `useFieldArray`, but it only
  // works internally for that specific hook call, and we need to use it in many
  // different components.
  _id: string
  actionKey: ActionKey
  data: any
}

export type ActionKeyAndDataNoId = Omit<ActionKeyAndData, '_id'>

// A component which will render an action's input form.
export type ActionComponentProps<O = undefined, D = any> = {
  fieldNamePrefix: string
  allActionsWithData: ActionKeyAndData[]
  index: number
  data: D
} & (
  | {
      isCreating: true
      errors: FieldErrors
      // Adds a new action to the form.
      addAction: (
        action: ActionKeyAndDataNoId,
        // If omitted, the action will be appened to the end of the list.
        insertIndex?: number
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
export type ActionComponent<O = undefined, D = any> = ComponentType<
  ActionComponentProps<O, D>
>

/**
 * A hook that returns the default values for an action. If it returns an error,
 * the action should not be added because some critical data failed to load. If
 * it returns undefined, the action is loading and should not allowed to be
 * added until the default values are loaded.
 */
export type UseDefaults<D extends {} = any> = () => D | Error | undefined

export type UseTransformToCosmos<D extends {} = any> = () => (
  data: D
) => UnifiedCosmosMsg | undefined

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

export type UseHideFromPicker = () => boolean

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
  // proposals and be added programmatically during creation.
  hideFromPicker?: boolean
  // Whether or not this action is reusable. Defaults to false. If true, when
  // editing the action, the add and remove button in the group will be removed,
  // and the action will be hidden from future category picker selections. Some
  // actions, like 'Spend', make sense to use multiple times, while others, like
  // 'Update Info' or any configuration updater, should only be used once at a
  // time. We should prevent users from adding multiple of these actions.
  notReusable?: boolean
  // Programmatic actions cannot be chosen or removed by the user. This is used
  // for actions should only be controlled by code. The user should not be able
  // to modify it at all, which also means the user cannot pick this action or
  // go back to the category action picker. This includes both `hideFromPicker`
  // and `notReusable`, while also preventing the user from going back to the
  // category action picker or removing the action.
  programmaticOnly?: boolean
  /**
   * Order of this action in the list of actions. A greater number will be shown
   * first. If no order specified, actions will be sorted based on their
   * position in the category definition.
   */
  order?: number
  // Hook to get default fields for form display.
  useDefaults: UseDefaults<Data>
  // Hook to make function to convert action data to UnifiedCosmosMsg.
  useTransformToCosmos: UseTransformToCosmos<Data>
  // Hook to make function to convert decoded msg to form display fields.
  useDecodedCosmosMsg: UseDecodedCosmosMsg<Data>
  // Hook to determine whether or not the action should be hidden from the
  // creation picker. If true, the action will not be shown in the list of
  // actions to create, but it will still match and render in existing contexts.
  // This is a hook version of the `hideFromPicker` option above. If either is
  // true, it will be hidden.
  useHideFromPicker?: UseHideFromPicker
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
  // x/gov chain governance
  Gov = 'gov',
}

export type ActionContext =
  | {
      type: ActionContextType.Dao
      info: DaoInfo
    }
  | {
      type: ActionContextType.Wallet
      profile?: PfpkProfile
    }
  | {
      type: ActionContextType.Gov
      params: AllGovParams
    }

export enum ActionChainContextType {
  /**
   * Any chain, not configured.
   */
  Any = 'any',
  /**
   * Configured chain, no DAO DAO deployment.
   */
  Configured = 'configured',
  /**
   * Supported chain with a DAO DAO deployment.
   */
  Supported = 'supported',
}

export type ActionChainContext =
  | ({
      type: ActionChainContextType.Any
    } & IChainContext)
  | ({
      type: ActionChainContextType.Configured
    } & ConfiguredChainContext)
  | ({
      type: ActionChainContextType.Supported
    } & SupportedChainContext)

export type ActionOptions<ExtraOptions extends {} = {}> = ExtraOptions & {
  t: TFunction
  chain: Chain
  chainContext: ActionChainContext
  // The address of the sender/actor.
  // DAO core address if context.type === Dao
  // Wallet address if context.type === Wallet
  // x/gov module address if context.type === Gov
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

export type NestedActionsEditorFormData = {
  msgs: UnifiedCosmosMsg[]

  // Internal action data so that errors are added to main form.
  _actionData?: ActionKeyAndData[]
}

export type ActionsProviderProps = {
  children: ReactNode | ReactNode[]
}

export type WalletActionsProviderProps = ActionsProviderProps & {
  // If passed, will override the connected wallet address.
  address?: string
}

export type GovActionsProviderProps = ActionsProviderProps & {
  /**
   * Optionally override loader node.
   */
  loader?: ReactNode
}
