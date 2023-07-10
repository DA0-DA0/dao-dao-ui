import { ActionCategoryKey, ActionCategoryMaker } from '@dao-dao/types'

import { makeGovernanceProposalAction } from './GovernanceProposal'
import { makeGovernanceVoteAction } from './GovernanceVote'
import { makeValidatorActionsAction } from './ValidatorActions'

export const makeChainGovernanceActionCategory: ActionCategoryMaker = ({
  t,
}) => ({
  key: ActionCategoryKey.ChainGovernance,
  label: t('actionCategory.chainGovernanceLabel'),
  description: t('actionCategory.chainGovernanceDescription'),
  actionMakers: [
    makeGovernanceVoteAction,
    makeGovernanceProposalAction,
    makeValidatorActionsAction,
  ],
})
