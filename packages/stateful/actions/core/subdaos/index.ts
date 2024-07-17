import { ActionCategoryKey, ActionCategoryMaker } from '@dao-dao/types'

import { makeAcceptSubDaoAction } from './AcceptSubDao'
import { makeBecomeSubDaoAction } from './BecomeSubDao'
import { makeManageSubDaosAction } from './ManageSubDaos'

export const makeSubDaosActionCategory: ActionCategoryMaker = ({ t }) => ({
  key: ActionCategoryKey.SubDaos,
  label: t('actionCategory.subDaosLabel'),
  description: t('actionCategory.subDaosDescription'),
  actionMakers: [
    makeManageSubDaosAction,
    makeBecomeSubDaoAction,
    makeAcceptSubDaoAction,
  ],
})
