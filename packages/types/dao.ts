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

export interface DaoCreationVotingConfigurationItemInputProps<
  ModuleConfig extends FieldValues = any
> {
  data: ModuleConfig
  register: UseFormRegister<ModuleConfig>
  setValue: UseFormSetValue<ModuleConfig>
  watch: <TFieldName extends FieldPath<ModuleConfig>>(
    name: TFieldName,
    defaultValue?: FieldPathValue<ModuleConfig, TFieldName>
  ) => FieldPathValue<ModuleConfig, TFieldName>
  errors?: FormState<ModuleConfig>['errors']
}

export interface DaoCreationVotingConfigurationItem<
  ModuleConfig extends FieldValues = any
> {
  Icon: ComponentType
  nameI18nKey: string
  descriptionI18nKey: string
  tooltipI18nKey?: string
  Input: ComponentType<
    DaoCreationVotingConfigurationItemInputProps<ModuleConfig>
  >
}
