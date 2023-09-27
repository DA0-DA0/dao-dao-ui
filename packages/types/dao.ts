import { TFunction } from 'next-i18next'
import { ComponentType } from 'react'
import {
  FieldError,
  FieldErrors,
  FieldPath,
  FieldPathValue,
  FieldValues,
  FormState,
  UseFormRegister,
  UseFormReturn,
  UseFormSetValue,
} from 'react-hook-form'

import { ContractVersion } from './chain'
import { DepositRefundPolicy, ModuleInstantiateInfo } from './contracts/common'
import { InstantiateMsg as DaoCoreV2InstantiateMsg } from './contracts/DaoCore.v2'
import { DaoCreator } from './creators'
import {
  PercentOrMajorityValue,
  ProposalModuleAdapter,
} from './proposal-module-adapter'
import { DaoCardProps, LoadingData, SuspenseLoaderProps } from './stateless'
import { GenericToken, TokenCardInfo } from './token'
import { DurationWithUnits } from './units'
import { CodeIdConfig } from './utils'

// Used in DaoInfoContext in @dao-dao/stateful/components/DaoPageWrapper
export type DaoInfo = {
  chainId: string
  coreAddress: string
  coreVersion: ContractVersion
  votingModuleAddress: string
  votingModuleContractName: string
  proposalModules: ProposalModule[]
  name: string
  description: string
  imageUrl: string | null
  created: Date | undefined
  items: Record<string, string>
  // Map chain ID to polytone proxy address.
  polytoneProxies: PolytoneProxies

  parentDao: DaoParentInfo | null
  admin: string
}

export type DaoParentInfo = {
  coreAddress: string
  coreVersion: ContractVersion
  name: string
  imageUrl?: string | null
  parentDao?: DaoParentInfo | null
  admin: string

  // Whether or not this parent has registered its child as a SubDAO.
  registeredSubDao: boolean
}

// Used in @dao-dao/stateful/components/DaoPageWrapper to serialize DaoInfo
// loaded via static props (@dao-dao/stateful/server/makeGetDaoStaticProps) to
// be fed into DaoPageWrapper and available in the UI via DaoInfoContext.
export interface DaoInfoSerializable extends Omit<DaoInfo, 'created'> {
  // Created needs to be serialized and de-serialized.
  created: string | null
}

export interface ProposalModule {
  contractName: string
  version: ContractVersion | null
  address: string
  prefix: string
  // If set, this uses a pre-propose module.
  preProposeAddress: string | null
}

export interface ProposalPrefill<FormData> {
  // Proposal module adapter ID
  id: string
  // Proposal module adapter proposal creation form data
  data: FormData
}

export interface ProposalDraft<FormData = any> {
  name: string
  createdAt: number
  lastUpdatedAt: number
  proposal: ProposalPrefill<FormData>
}

//! Create DAO

export type CreateDaoCustomValidator = (setNewErrors: boolean) => void

export interface CreateDaoContext<CreatorData extends FieldValues = any> {
  form: UseFormReturn<NewDao<CreatorData>>
  commonVotingConfig: DaoCreationCommonVotingConfigItems
  availableCreators: readonly DaoCreator[]
  creator: DaoCreator
  proposalModuleDaoCreationAdapters: Required<ProposalModuleAdapter>['daoCreation'][]
  generateInstantiateMsg: () => DaoCoreV2InstantiateMsg
  setCustomValidator: (fn: CreateDaoCustomValidator) => void
  SuspenseLoader: ComponentType<SuspenseLoaderProps>
}

export interface NewDao<CreatorData extends FieldValues = any> {
  chainId: string
  name: string
  description: string
  imageUrl?: string
  creator: {
    id: string
    data: CreatorData
  }
  proposalModuleAdapters: {
    id: string
    data: any
  }[]
  votingConfig: DaoCreationVotingConfig
  advancedVotingConfigEnabled: boolean
}

export interface NewDaoTier {
  name: string
  weight: number
  members: NewDaoTierMember[]
  // For custom errors.
  _error?: undefined
}

export interface NewDaoTierMember {
  address: string
}

export interface DaoCreationGovernanceConfigInputProps<
  VotingModuleAdapterData extends FieldValues = any
> {
  data: VotingModuleAdapterData
  // Used within a voting module adapter, so it's safe to apply the data
  // generic.
  context: CreateDaoContext<VotingModuleAdapterData>
}

export interface DaoCreationGovernanceConfigReviewProps<
  VotingModuleAdapterData extends FieldValues = any
> {
  // Used within a voting module adapter, so it's safe to apply the data
  // generic.
  newDao: NewDao<VotingModuleAdapterData>
  data: VotingModuleAdapterData
}

export interface DaoCreationVotingConfigItemInputProps<
  ModuleData extends FieldValues = any
> {
  // Used within voting and proposal module adapters, so the data generic passed
  // in may not necessarily be the voting module adapter data. Must use `any`.
  newDao: NewDao<any>
  data: ModuleData
  register: UseFormRegister<ModuleData>
  setValue: UseFormSetValue<ModuleData>
  watch: <TFieldName extends FieldPath<ModuleData>>(
    name: TFieldName,
    defaultValue?: FieldPathValue<ModuleData, TFieldName>
  ) => FieldPathValue<ModuleData, TFieldName>
  errors?: FormState<ModuleData>['errors']
}

export interface DaoCreationVotingConfigItemReviewProps<
  ModuleData extends FieldValues = any
> {
  // Used within voting and proposal module adapters, so the data generic passed
  // in may not necessarily be the voting module adapter data. Must use `any`.
  newDao: NewDao<any>
  data: ModuleData
}

export interface DaoCreationVotingConfigItem<
  ModuleData extends FieldValues = any
> {
  // Used within voting and proposal module adapters, so the data generic passed
  // in may not necessarily be the voting module adapter data. Must use `any`.
  onlyDisplayCondition?: (newDao: NewDao<any>) => boolean
  Icon: ComponentType
  nameI18nKey: string
  descriptionI18nKey: string
  tooltipI18nKey?: string
  Input: ComponentType<DaoCreationVotingConfigItemInputProps<ModuleData>>
  getInputError: (errors?: FieldErrors<ModuleData>) => FieldError | undefined
  Review: ComponentType<DaoCreationVotingConfigItemReviewProps<ModuleData>>
  getReviewClassName?: (data: ModuleData) => string
}

export type DaoCreationCommonVotingConfigItems = {
  items: DaoCreationVotingConfigItem[]
  advancedItems: DaoCreationVotingConfigItem[]
}

export type DaoCreationGetInstantiateInfo<
  ModuleData extends FieldValues = any
> = (
  codeIds: CodeIdConfig,
  // Used within voting and proposal module adapters, so the data generic passed
  // in may not necessarily be the voting module adapter data. Must use `any`.
  newDao: NewDao<any>,
  data: ModuleData,
  t: TFunction
) => ModuleInstantiateInfo

export type DaoCreatedCardProps = Omit<
  DaoCardProps,
  'follow' | 'LinkWrapper' | 'IconButtonLink'
>

export type DaoCreationVotingConfigWithAllowRevoting = {
  allowRevoting: boolean
}

export type DaoCreationVotingConfigWithProposalDeposit = {
  proposalDeposit: {
    enabled: boolean
    amount: number
    // Token input fields.
    type: 'native' | 'cw20' | 'voting_module_token'
    denomOrAddress: string
    // Loaded from token input fields to access metadata.
    token?: GenericToken
    refundPolicy: DepositRefundPolicy
  }
}

export type DaoCreationVotingConfigWithProposalSubmissionPolicy = {
  anyoneCanPropose: boolean
}

export type DaoCreationVotingConfigWithQuorum = {
  quorum: PercentOrMajorityValue
}

export type DaoCreationVotingConfigWithVotingDuration = {
  votingDuration: DurationWithUnits
}

export type DaoCreationVotingConfigWithEnableMultipleChoice = {
  enableMultipleChoice: boolean
}

export type DaoCreationVotingConfig = DaoCreationVotingConfigWithAllowRevoting &
  DaoCreationVotingConfigWithProposalDeposit &
  DaoCreationVotingConfigWithProposalSubmissionPolicy &
  DaoCreationVotingConfigWithQuorum &
  DaoCreationVotingConfigWithVotingDuration &
  DaoCreationVotingConfigWithEnableMultipleChoice

//! Other

// Map chain ID to proxy address on that chain for this DAO.
export type PolytoneProxies = Record<string, string>

export type DaoPayrollConfig = {
  type: string
  data?: Record<string, unknown>
}

// Built-in DAO tabs. These do not include widget tabs.
export enum DaoTabId {
  Home = 'home',
  Proposals = 'proposals',
  Treasury = 'treasury',
  SubDaos = 'subdaos',
  Members = 'members',
  Staked = 'staked',
  Collection = 'collection',
  Browser = 'browser',
}

export type DaoTab = {
  // ID used in URL hash.
  id: DaoTabId | string
  label: string
  Icon?: ComponentType<{ className: string }>
}

export type DaoTabWithComponent = DaoTab & {
  Component: ComponentType
}

export enum DaoPageMode {
  Dapp = 'dapp',
  Sda = 'sda',
}

export type DaoWebSocketChannelInfo = {
  chainId: string
  coreAddress: string
}

export type DaoChainTreasury<T extends TokenCardInfo, N extends object> = {
  chainId: string
  address: string | undefined
  tokens: LoadingData<T[]>
  nfts: LoadingData<(N & { key: string })[]>
}
