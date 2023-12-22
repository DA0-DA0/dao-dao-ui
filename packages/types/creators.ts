import { ComponentType } from 'react'
import { FieldValues } from 'react-hook-form'
import { TFunction } from 'react-i18next'

import { CodeIdConfig } from './chain'
import { InstantiateMsg } from './contracts/DaoCore.v2'
import {
  DaoCreationGovernanceConfigInputProps,
  DaoCreationGovernanceConfigReviewProps,
  DaoCreationVotingConfigItem,
  NewDao,
} from './dao'

export type DaoCreatorMutate<Data extends FieldValues = any> = (
  msg: InstantiateMsg,
  // Used within voting and proposal module adapters, so the data generic passed
  // in may not necessarily be the voting module adapter data. Must use `any`.
  newDao: NewDao<any>,
  data: Data,
  t: TFunction,
  codeIds: CodeIdConfig
) => InstantiateMsg

export type DaoCreator<Data extends FieldValues = any> = {
  id: string
  defaultConfig: Data

  displayInfo: {
    Icon: ComponentType
    nameI18nKey: string
    descriptionI18nKey: string
    suppliesI18nKey: string
    membershipI18nKey: string
  }

  governanceConfig: {
    Input: ComponentType<DaoCreationGovernanceConfigInputProps>
    Review: ComponentType<DaoCreationGovernanceConfigReviewProps>
  }
  votingConfig: {
    items: DaoCreationVotingConfigItem[]
    advancedItems?: DaoCreationVotingConfigItem[]
    advancedWarningI18nKeys?: string[]
  }

  // Modify `msg` to add any additional fields the creator needs to set based on
  // its own config.
  mutate: DaoCreatorMutate<Data>
}
