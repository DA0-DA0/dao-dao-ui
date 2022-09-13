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

import {
  InstantiateMsg,
  ModuleInstantiateInfo,
} from './contracts/cw-core-0.2.0'
import { ProposalModuleAdapter } from './proposal-module-adapter'
import { VotingModuleAdapter } from './voting-module-adapter'

export enum ProposalModuleType {
  CwProposalSingle = 'CwProposalSingle',
  CwProposalMultiple = 'CwProposalMultiple',
}

export interface ProposalModule {
  contractName: string
  address: string
  prefix: string
}

//! Create DAO

export type CreateDaoCustomValidator = (setNewErrors: boolean) => void

export interface CreateDaoContext {
  form: UseFormReturn<NewDao>
  availableVotingModuleAdapters: Pick<
    Required<VotingModuleAdapter>,
    'id' | 'daoCreation'
  >[]
  votingModuleDaoCreationAdapter: Required<VotingModuleAdapter>['daoCreation']
  proposalModuleDaoCreationAdapters: Required<ProposalModuleAdapter>['daoCreation'][]
  generateInstantiateMsg: () => InstantiateMsg
  setCustomValidator: (fn: CreateDaoCustomValidator) => void
}

export interface NewDao {
  name: string
  description: string
  imageUrl?: string
  votingModuleAdapter: {
    id: string
    data: any
  }
  proposalModuleAdapters: {
    id: string
    data: any
  }[]
  advancedVotingConfigEnabled: boolean
}

export interface DaoCreationGovernanceConfigInputProps<
  ModuleConfig extends FieldValues = any
> {
  newDao: NewDao
  data: ModuleConfig
  register: UseFormRegister<ModuleConfig>
  setValue: UseFormSetValue<ModuleConfig>
  watch: <TFieldName extends FieldPath<ModuleConfig>>(
    name: TFieldName,
    defaultValue?: FieldPathValue<ModuleConfig, TFieldName>
  ) => FieldPathValue<ModuleConfig, TFieldName>
  errors?: FormState<ModuleConfig>['errors']
}

export interface DaoCreationGovernanceConfigReviewProps<
  ModuleConfig extends FieldValues = any
> {
  newDao: NewDao
  data: ModuleConfig
}

export interface DaoCreationVotingConfigItemInputProps<
  ModuleConfig extends FieldValues = any
> {
  newDao: NewDao
  data: ModuleConfig
  register: UseFormRegister<ModuleConfig>
  setValue: UseFormSetValue<ModuleConfig>
  watch: <TFieldName extends FieldPath<ModuleConfig>>(
    name: TFieldName,
    defaultValue?: FieldPathValue<ModuleConfig, TFieldName>
  ) => FieldPathValue<ModuleConfig, TFieldName>
  errors?: FormState<ModuleConfig>['errors']
}

export interface DaoCreationVotingConfigItemReviewProps<
  ModuleConfig extends FieldValues = any
> {
  newDao: NewDao
  data: ModuleConfig
}

export interface DaoCreationVotingConfigItem<
  ModuleConfig extends FieldValues = any
> {
  onlyDisplayCondition?: (newDao: NewDao) => boolean
  Icon: ComponentType
  nameI18nKey: string
  descriptionI18nKey: string
  tooltipI18nKey?: string
  Input: ComponentType<DaoCreationVotingConfigItemInputProps<ModuleConfig>>
  getInputError: (errors?: FieldErrors<ModuleConfig>) => FieldError | undefined
  Review: ComponentType<DaoCreationVotingConfigItemReviewProps<ModuleConfig>>
  getReviewClassName?: (data: ModuleConfig) => string
}

export type DaoCreationGetInstantiateInfo<
  ModuleConfig extends FieldValues = any
> = (newDao: NewDao, data: ModuleConfig, t: TFunction) => ModuleInstantiateInfo
