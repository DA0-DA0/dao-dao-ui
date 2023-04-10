import { ActionCategoryKey, ActionCategoryMaker } from '@dao-dao/types'

import { makeBulkImportAction } from './BulkImport'
import { makeCustomAction } from './Custom'

export const makeAdvancedActionCategory: ActionCategoryMaker = ({ t }) => ({
  key: ActionCategoryKey.Custom,
  label: t('actionCategory.advancedLabel'),
  description: t('actionCategory.advancedDescription'),
  actionMakers: [makeCustomAction, makeBulkImportAction],
})
