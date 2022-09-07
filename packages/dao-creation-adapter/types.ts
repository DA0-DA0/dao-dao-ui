import { ComponentType } from 'react'

export interface IDaoCreationAdapter {
  // Hooks
  hooks: {}

  // Components
  components: {}
}

export type DaoCreationAdapter = {
  id: string
  // Displayed on first page when choosing what type of DAO to make.
  displayInfo: DisplayInfo
  load: () => IDaoCreationAdapter
}

export interface DisplayInfo {
  Icon: ComponentType
  nameI18nKey: string
  descriptionI18nKey: string
  suppliesI18nKey: string
  membershipI18nKey: string
}
