import {
  ActionCategoryKey,
  ActionCategoryMaker,
  ActionContextType,
} from '@dao-dao/types'

import { makeManageWidgetsAction } from './ManageWidgets'
import { makeUpdateInfoAction } from './UpdateInfo'

export const makeDaoAppearanceActionCategory: ActionCategoryMaker = ({
  t,
  context,
}) =>
  // Only DAOs.
  context.type === ActionContextType.Dao
    ? {
        key: ActionCategoryKey.DaoAppearance,
        label: t('actionCategory.daoAppearanceLabel'),
        description: t('actionCategory.daoAppearanceDescription'),
        actionMakers: [makeUpdateInfoAction, makeManageWidgetsAction],
      }
    : null
