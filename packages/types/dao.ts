import { ComponentType } from 'react'
import {
  FieldPath,
  FieldPathValue,
  FieldValues,
  FormState,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form'

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

export interface DaoCreationConfigItemInputProps<
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

export interface DaoCreationConfigItem<ModuleConfig extends FieldValues = any> {
  onlyDisplayCondition?: (newDao: NewDao) => boolean
  Icon: ComponentType
  nameI18nKey: string
  descriptionI18nKey: string
  tooltipI18nKey?: string
  Input: ComponentType<DaoCreationConfigItemInputProps<ModuleConfig>>
}
