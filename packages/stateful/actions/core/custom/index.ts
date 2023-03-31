import { ActionCategoryKey, ActionCategoryMaker } from '@dao-dao/types'

import { makeCustomAction } from './Custom'

export const makeCustomActionCategory: ActionCategoryMaker = ({ t }) => ({
  key: ActionCategoryKey.Custom,
  label: t('actionCategory.customLabel'),
  description: t('actionCategory.customDescription'),
  actionMakers: [makeCustomAction],
})
