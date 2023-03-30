import { ActionCategoryKey, ActionCategoryMaker } from '@dao-dao/types'

import { makeDaoAdminExecAction } from './DaoAdminExec'
import { makeEnableMultipleChoiceAction } from './EnableMultipleChoice'
import { makeManageStorageItemsAction } from './ManageStorageItems'
import { makeManageSubDaosAction } from './ManageSubDaos'
import { makeUpdateInfoAction } from './UpdateInfo'
import { makeUpgradeV1ToV2 } from './UpgradeV1ToV2'

export const makeDaoGovernanceActionCategory: ActionCategoryMaker = ({
  t,
}) => ({
  key: ActionCategoryKey.DaoGovernance,
  label: t('title.daoGovernance'),
  description: t('info.daoGovernanceDescription'),
  actionMakers: [
    makeDaoAdminExecAction,
    makeEnableMultipleChoiceAction,
    makeManageStorageItemsAction,
    makeManageSubDaosAction,
    makeUpdateInfoAction,
    makeUpgradeV1ToV2,
  ],
})
