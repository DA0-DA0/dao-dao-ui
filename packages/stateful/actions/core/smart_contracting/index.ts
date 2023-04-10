import { ActionCategoryKey, ActionCategoryMaker } from '@dao-dao/types'

import { makeExecuteAction } from './Execute'
import { makeFeeShareAction } from './FeeShare'
import { makeInstantiateAction } from './Instantiate'
import { makeMigrateAction } from './Migrate'
import { makeUpdateAdminAction } from './UpdateAdmin'

export const makeSmartContractingActionCategory: ActionCategoryMaker = ({
  t,
}) => ({
  key: ActionCategoryKey.SmartContracting,
  label: t('actionCategory.smartContractingLabel'),
  description: t('actionCategory.smartContractingDescription'),
  actionMakers: [
    makeInstantiateAction,
    makeExecuteAction,
    makeMigrateAction,
    makeUpdateAdminAction,
    makeFeeShareAction,
  ],
})
