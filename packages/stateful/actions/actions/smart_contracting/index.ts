import { ActionCategoryKey, ActionCategoryMaker } from '@dao-dao/types'

import { makeExecuteAction } from './Execute'
import { makeInstantiateAction } from './Instantiate'
import { makeMigrateAction } from './MigrateContract'
import { makeUpdateAdminAction } from './UpdateAdmin'

export const makeSmartContractingActionCategory: ActionCategoryMaker = ({
  t,
}) => ({
  key: ActionCategoryKey.SmartContracting,
  label: t('title.smartContracting'),
  description: t('info.smartContractingDescription'),
  actionMakers: [
    makeExecuteAction,
    makeInstantiateAction,
    makeMigrateAction,
    makeUpdateAdminAction,
  ],
})
