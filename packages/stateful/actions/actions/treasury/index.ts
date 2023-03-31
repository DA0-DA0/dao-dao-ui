import { ActionCategoryKey, ActionCategoryMaker } from '@dao-dao/types'

import { makeManageCw20Action } from './ManageCw20'
import { makeManagePayrollAction } from './ManagePayroll'
import { makeSpendAction } from './Spend'
import {
  makePerformTokenSwapAction,
  makeWithdrawTokenSwapAction,
} from './token_swap'
import { makeWyndSwapAction } from './WyndSwap'

export const makeDaoTreasuryActionCategory: ActionCategoryMaker = ({ t }) => ({
  key: ActionCategoryKey.Treasury,
  label: t('actionCategory.daoTreasuryLabel'),
  description: t('actionCategory.daoTreasuryDescription'),
  actionMakers: [
    makeSpendAction,
    makeWyndSwapAction,
    makeManageCw20Action,
    makePerformTokenSwapAction,
    makeWithdrawTokenSwapAction,
    makeManagePayrollAction,
  ],
})
