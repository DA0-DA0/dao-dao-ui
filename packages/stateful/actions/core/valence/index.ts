import { ActionCategoryKey, ActionCategoryMaker } from '@dao-dao/types'
import { actionContextSupportsValence } from '@dao-dao/utils'

import { makeConfigureRebalancerAction } from './ConfigureRebalancer'
import { makeCreateValenceAccountAction } from './CreateValenceAccount'
import { makePauseRebalancerAction } from './PauseRebalancer'
import { makeResumeRebalancerAction } from './ResumeRebalancer'

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
        actionMakers: [
          makeConfigureRebalancerAction,
          makePauseRebalancerAction,
          makeResumeRebalancerAction,
          makeCreateValenceAccountAction,
        ],
      }
    : null
