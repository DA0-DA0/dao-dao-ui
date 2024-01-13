import { ActionCategoryKey, ActionCategoryMaker } from '@dao-dao/types'

import { makeExecuteAction } from './Execute'
import { makeFeeShareAction } from './FeeShare'
import { makeInstantiateAction } from './Instantiate'
import { makeInstantiate2Action } from './Instantiate2'
import { makeMigrateAction } from './Migrate'
import { makeUpdateAdminAction } from './UpdateAdmin'
import { makeUploadCodeAction } from './UploadCode'

export const makeSmartContractingActionCategory: ActionCategoryMaker = ({
  t,
}) => ({
  key: ActionCategoryKey.SmartContracting,
  label: t('actionCategory.smartContractingLabel'),
  description: t('actionCategory.smartContractingDescription'),
  actionMakers: [
    makeInstantiateAction,
    makeInstantiate2Action,
    makeExecuteAction,
    makeMigrateAction,
    makeUpdateAdminAction,
    makeUploadCodeAction,
    makeFeeShareAction,
  ],
})
