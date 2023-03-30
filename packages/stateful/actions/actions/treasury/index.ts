import { ActionCategoryKey, ActionCategoryMaker } from '@dao-dao/types'

import { makeManageCw20Action } from './ManageCw20'
import { makeManageCw721Action } from './ManageCw721'
import { makeManagePayrollAction } from './ManagePayroll'
import {
  makeBurnNftAction,
  makeMintNftAction,
  makeTransferNftAction,
} from './nft'
import { makeSpendAction } from './Spend'
import {
  makePerformTokenSwapAction,
  makeWithdrawTokenSwapAction,
} from './token_swap'
import { makeWyndSwapAction } from './WyndSwap'

export const makeDaoTreasuryActionCategory: ActionCategoryMaker = ({ t }) => ({
  key: ActionCategoryKey.Treasury,
  label: t('title.daoTreasury'),
  description: t('info.daoTreasuryDescription'),
  actionMakers: [
    makeSpendAction,
    makeManageCw20Action,
    makeMintNftAction,
    makeTransferNftAction,
    makeBurnNftAction,
    makeManageCw721Action,
    makePerformTokenSwapAction,
    makeWithdrawTokenSwapAction,
    makeWyndSwapAction,
    makeManagePayrollAction,
  ],
})
