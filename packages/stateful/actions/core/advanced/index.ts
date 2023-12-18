import { ActionCategoryKey, ActionCategoryMaker } from '@dao-dao/types'

import { makeBulkImportAction } from './BulkImport'
import { makeCreateIcaAction } from './CreateIca'
import { makeCrossChainExecuteAction } from './CrossChainExecute'
import { makeCustomAction } from './Custom'
import { makeIcaExecuteAction } from './IcaExecute'
import { makeManageIcasAction } from './ManageIcas'

export const makeAdvancedActionCategory: ActionCategoryMaker = ({ t }) => ({
  key: ActionCategoryKey.Advanced,
  label: t('actionCategory.advancedLabel'),
  description: t('actionCategory.advancedDescription'),
  actionMakers: [
    makeCustomAction,
    makeBulkImportAction,
    makeCrossChainExecuteAction,
    makeCreateIcaAction,
    makeManageIcasAction,
    makeIcaExecuteAction,
  ],
})
