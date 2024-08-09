import {
  ActionCategoryKey,
  ActionCategoryMaker,
  ActionKey,
} from '@dao-dao/types'
import { actionContextSupportsValence } from '@dao-dao/utils'

export const makeValenceActionCategory: ActionCategoryMaker = (options) =>
  actionContextSupportsValence(options)
    ? {
        key: ActionCategoryKey.Rebalancer,
        label: options.t('actionCategory.rebalancerLabel', {
          context: options.context.type,
        }),
        description: options.t('actionCategory.rebalancerDescription', {
          context: options.context.type,
        }),
        actionKeys: [
          ActionKey.ConfigureRebalancer,
          ActionKey.FundRebalancer,
          ActionKey.WithdrawFromRebalancer,
          ActionKey.PauseRebalancer,
          ActionKey.ResumeRebalancer,
          ActionKey.CreateValenceAccount,
        ],
      }
    : null
