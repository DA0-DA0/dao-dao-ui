import { ActionCategoryKey, ActionCategoryMaker } from '@dao-dao/types'

import { makeBulkImportAction } from './BulkImport'
import { makeCreateIcaAccountAction } from './CreateIcaAccount'
import { makeCrossChainExecuteAction } from './CrossChainExecute'
import { makeCustomAction } from './Custom'
import { makeIcaExecuteAction } from './IcaExecute'

export const makeAdvancedActionCategory: ActionCategoryMaker = ({ t }) => ({
  key: ActionCategoryKey.Custom,
  label: t('actionCategory.advancedLabel'),
  description: t('actionCategory.advancedDescription'),
  actionMakers: [
    makeCustomAction,
    makeCrossChainExecuteAction,
    makeCreateIcaAccountAction,
    makeIcaExecuteAction,
    makeBulkImportAction,
  ],
})
