import {
  ActionCategoryKey,
  ActionCategoryMaker,
  ActionContextType,
} from '@dao-dao/types'

import { makeAcceptSubDaoAction } from './AcceptSubDao'
import { makeBecomeSubDaoAction } from './BecomeSubDao'
import { makeManageSubDaosAction } from './ManageSubDaos'

export const makeSubDaosActionCategory: ActionCategoryMaker = ({
  t,
  context,
}) => ({
  key: ActionCategoryKey.SubDaos,
  label: t('actionCategory.subDaosLabel'),
  description: t('actionCategory.subDaosDescription'),
  actionMakers:
    context.type === ActionContextType.Dao
      ? [
          makeManageSubDaosAction,
          makeBecomeSubDaoAction,
          makeAcceptSubDaoAction,
        ]
      : [
          // Allow non-DAOs to become the parent of DAOs. This may be chain
          // governance or a DAO's polytone proxy for cross-chain SubDAOs.
          makeAcceptSubDaoAction,
        ],
})
