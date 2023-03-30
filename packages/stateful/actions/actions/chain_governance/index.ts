import { ActionCategoryKey, ActionCategoryMaker } from '@dao-dao/types'

import { makeGovernanceVoteAction } from './GovernanceVote'
import { makeStakingActionsAction } from './StakingActions'
import { makeValidatorActionsAction } from './ValidatorActions'

export const makeChainGovernanceActionCategory: ActionCategoryMaker = ({
  t,
}) => ({
  key: ActionCategoryKey.ChainGovernance,
  label: t('title.chainGovernance'),
  description: t('info.chainGovernanceDescription'),
  actionMakers: [
    makeGovernanceVoteAction,
    makeStakingActionsAction,
    makeValidatorActionsAction,
  ],
})
