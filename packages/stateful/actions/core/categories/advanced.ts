import {
  ActionCategoryKey,
  ActionCategoryMaker,
  ActionKey,
} from '@dao-dao/types'

export const makeAdvancedActionCategory: ActionCategoryMaker = ({ t }) => ({
  key: ActionCategoryKey.Advanced,
  label: t('actionCategory.advancedLabel'),
  description: t('actionCategory.advancedDescription'),
  actionKeys: [
    ActionKey.Custom,
    ActionKey.BulkImport,
    ActionKey.CrossChainExecute,
    ActionKey.CreateIca,
    ActionKey.HideIca,
    ActionKey.IcaExecute,
  ],
})
