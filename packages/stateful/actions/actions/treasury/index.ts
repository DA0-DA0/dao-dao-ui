import { ActionCategoryKey, ActionCategoryMaker } from '@dao-dao/types'

import { makeManageCw20Action } from './ManageCw20'
import { makeManagePayrollAction } from './ManagePayroll'
import { makeSpendAction } from './Spend'
import {
  makePerformTokenSwapAction,
  makeWithdrawTokenSwapAction,
} from './token_swap'
import { makeWyndSwapAction } from './WyndSwap'

export const makeTreasuryActionCategory: ActionCategoryMaker = ({
  t,
  context,
}) => ({
  key: ActionCategoryKey.Treasury,
  label: t('actionCategory.treasuryLabel', {
    context: context.type,
  }),
  description: t('actionCategory.treasuryDescription', {
    context: context.type,
  }),
  actionMakers: [
    makeSpendAction,
    makeWyndSwapAction,
    makeManageCw20Action,
    makePerformTokenSwapAction,
    makeWithdrawTokenSwapAction,
    makeManagePayrollAction,
  ],
})
