import {
  ActionCategoryKey,
  ActionCategoryMaker,
  ActionContextType,
  ActionKey,
} from '@dao-dao/types'

export const makeDaoAppearanceActionCategory: ActionCategoryMaker = ({
  t,
  context,
}) =>
  // Only DAOs.
  context.type === ActionContextType.Dao
    ? {
        key: ActionCategoryKey.DaoAppearance,
        label: t('actionCategory.appearanceLabel'),
        description: t('actionCategory.appearanceDescription'),
        actionKeys: [ActionKey.UpdateInfo, ActionKey.ManageWidgets],
      }
    : null
