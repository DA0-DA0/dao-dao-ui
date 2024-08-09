import {
  ActionCategoryKey,
  ActionCategoryMaker,
  ActionContextType,
  ActionKey,
} from '@dao-dao/types'

export const makeSubDaosActionCategory: ActionCategoryMaker = ({
  t,
  context,
}) => ({
  key: ActionCategoryKey.SubDaos,
  label: t('actionCategory.subDaosLabel'),
  description: t('actionCategory.subDaosDescription'),
  actionKeys:
    context.type === ActionContextType.Dao
      ? [
          ActionKey.ManageSubDaos,
          ActionKey.BecomeSubDao,
          ActionKey.AcceptSubDao,
        ]
      : [
          // Allow non-DAOs to become the parent of DAOs. This may be chain
          // governance or a DAO's polytone proxy for cross-chain SubDAOs.
          ActionKey.AcceptSubDao,
        ],
})
