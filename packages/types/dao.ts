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

import { Validator } from './chain'
import { ContractVersion } from './contract'
import { ModuleInstantiateInfo } from './contracts/common'
import { InstantiateMsg as CwdCoreV2InstantiateMsg } from './contracts/CwdCore.v2'
import { ProposalModuleAdapter } from './proposal-module-adapter'
import { DaoCardProps, LoadingData } from './ui'
import { VotingModuleAdapter } from './voting-module-adapter'

// Used in DaoInfoContext in @dao-dao/common/components/DaoPageWrapper
export interface DaoInfo {
  chainId: string
  bech32Prefix: string
  coreAddress: string
  coreVersion: ContractVersion
  votingModuleAddress: string
  votingModuleContractName: string
  proposalModules: ProposalModule[]
  name: string
  description: string
  imageUrl: string | null
  created: Date | undefined

  parentDao: DaoParentInfo | null
}

export interface DaoParentInfo {
  coreAddress: string
  name: string
  imageUrl?: string | null
  parentDao?: DaoParentInfo | null
}

// Used in @dao-dao/common/components/DaoPageWrapper to serialize DaoInfo loaded
// via static props (@dao-dao/common/server/makeGetDaoStaticProps) to be fed
// into DaoPageWrapper and available in the UI via DaoInfoContext.
export interface DaoInfoSerializable extends Omit<DaoInfo, 'created'> {
  // Created needs to be serialized and de-serialized.
  created: string | null
}

export enum UnstakingTaskStatus {
  Unstaking = 'unstaking',
  ReadyToClaim = 'readyToClaim',
  Claimed = 'claimed',
}

export interface UnstakingTask {
  status: UnstakingTaskStatus
  amount: number
  tokenSymbol: string
  tokenDecimals: number
  // If unstaking or ready to claim, date it will be/was unstaked.
  // If claimed, date it was claimed.
  date?: Date
}

export interface TokenStake {
  validator: Validator
  amount: number
  rewards: number
}

export interface TokenCardLazyStakingInfo {
  unstakingTasks: UnstakingTask[]
  unstakingDurationSeconds: number | undefined
  stakes: TokenStake[]
}

export interface TokenCardInfo {
  crown?: boolean
  tokenSymbol: string
  tokenDenom: string
  tokenDecimals: number
  subtitle?: string
  imageUrl: string
  unstakedBalance: number
  usdcUnitPrice: number
  // Defined if this is a Cw20 token.
  cw20Address?: string

  // Only native tokens load staking info for now, so let's show a nice loader.
  hasStakingInfo: boolean
  lazyStakingInfo: LoadingData<TokenCardLazyStakingInfo | undefined>
}

export interface NftCardInfo {
  collection: {
    address: string
    name: string
  }
  tokenId: string
  externalLink?: {
    href: string
    name: string
  }
  imageUrl?: string
  floorPrice?: {
    amount: number
    denom: string
  }
  name: string
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

export interface CreateDaoContext<
  VotingModuleAdapterModuleData extends FieldValues = any
> {
  form: UseFormReturn<NewDao<VotingModuleAdapterModuleData>>
  availableVotingModuleAdapters: Pick<
    Required<VotingModuleAdapter>,
    'id' | 'daoCreation'
  >[]
  votingModuleDaoCreationAdapter: Required<VotingModuleAdapter>['daoCreation']
  proposalModuleDaoCreationAdapters: Required<ProposalModuleAdapter>['daoCreation'][]
  generateInstantiateMsg: () => CwdCoreV2InstantiateMsg
  setCustomValidator: (fn: CreateDaoCustomValidator) => void
}

export interface NewDao<VotingModuleAdapterData extends FieldValues = any> {
  name: string
  description: string
  imageUrl?: string
  votingModuleAdapter: {
    id: string
    data: VotingModuleAdapterData
  }
  proposalModuleAdapters: {
    id: string
    data: any
  }[]
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

export type DaoCreationGetInstantiateInfo<
  ModuleData extends FieldValues = any
> = (
  // Used within voting and proposal module adapters, so the data generic passed
  // in may not necessarily be the voting module adapter data. Must use `any`.
  newDao: NewDao<any>,
  data: ModuleData,
  t: TFunction
) => ModuleInstantiateInfo

export type DaoCreatedCardProps = Omit<DaoCardProps, 'pinned' | 'onPin'>
