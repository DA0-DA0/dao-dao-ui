import { ActionCategoryKey, ActionCategoryMaker } from '@dao-dao/types'

import { makeCustomAction } from './Custom'
import { makeManageWidgetsAction } from './ManageWidgets'

export const makeOtherActionCategory: ActionCategoryMaker = ({ t }) => ({
  key: ActionCategoryKey.Other,
  label: t('title.other'),
  description: t('info.otherDescription'),
  actionMakers: [makeManageWidgetsAction, makeCustomAction],
})
