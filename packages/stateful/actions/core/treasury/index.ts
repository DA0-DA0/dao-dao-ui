import { ActionCategoryKey, ActionCategoryMaker } from '@dao-dao/types'

import { makeCommunityPoolDepositAction } from './CommunityPoolDeposit'
import { makeCommunityPoolSpendAction } from './CommunityPoolSpend'
import { makeConfigureVestingPaymentsAction } from './ConfigureVestingPayments'
import { makeEnableRetroactiveCompensationAction } from './EnableRetroactiveCompensation'
import { makeManageCw20Action } from './ManageCw20'
import { makeManageStakingAction } from './ManageStaking'
import { makeManageVestingAction } from './ManageVesting'
import { makeSpendAction } from './Spend'
import {
  makePerformTokenSwapAction,
  makeWithdrawTokenSwapAction,
} from './token_swap'

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
    makeManageStakingAction,
    makeManageVestingAction,
    makeManageCw20Action,
    makePerformTokenSwapAction,
    makeWithdrawTokenSwapAction,
    makeConfigureVestingPaymentsAction,
    makeEnableRetroactiveCompensationAction,
    makeCommunityPoolSpendAction,
    makeCommunityPoolDepositAction,
  ],
})
