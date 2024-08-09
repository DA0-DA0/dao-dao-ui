import {
  ActionCategoryKey,
  ActionCategoryMaker,
  ActionKey,
} from '@dao-dao/types'

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
  actionKeys: [
    ActionKey.Spend,
    ActionKey.ManageStaking,
    ActionKey.ManageVesting,
    ActionKey.ManageCw20,
    ActionKey.PerformTokenSwap,
    ActionKey.WithdrawTokenSwap,
    ActionKey.ConfigureVestingPayments,
    ActionKey.EnableRetroactiveCompensation,
    ActionKey.CommunityPoolSpend,
    ActionKey.CommunityPoolDeposit,
  ],
})
