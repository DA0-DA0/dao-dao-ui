import { ActionCategoryKey, ActionCategoryMaker } from '@dao-dao/types'

import { makeManageWidgetsAction } from './ManageWidgets'
import { makeUpdateInfoAction } from './UpdateInfo'

export const makeDaoAppearanceActionCategory: ActionCategoryMaker = ({
  t,
}) => ({
  key: ActionCategoryKey.DaoAppearance,
  label: t('actionCategory.daoAppearanceLabel'),
  description: t('actionCategory.daoAppearanceDescription'),
  actionMakers: [makeUpdateInfoAction, makeManageWidgetsAction],
})
