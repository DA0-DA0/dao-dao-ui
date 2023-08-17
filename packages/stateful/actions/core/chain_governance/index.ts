import {
  ActionCategoryKey,
  ActionCategoryMaker,
  ActionContextType,
} from '@dao-dao/types'

import { makeGovernanceDepositAction } from './GovernanceDeposit'
import { makeGovernanceProposalAction } from './GovernanceProposal'
import { makeGovernanceVoteAction } from './GovernanceVote'
import { makeValidatorActionsAction } from './ValidatorActions'

export const makeChainGovernanceActionCategory: ActionCategoryMaker = ({
  t,
  context,
}) =>
  // Governance module cannot participate in governance.
  context.type === ActionContextType.Gov
    ? null
    : {
        key: ActionCategoryKey.ChainGovernance,
        label: t('actionCategory.chainGovernanceLabel'),
        description: t('actionCategory.chainGovernanceDescription'),
        actionMakers: [
          makeGovernanceVoteAction,
          makeGovernanceProposalAction,
          makeGovernanceDepositAction,
          makeValidatorActionsAction,
        ],
      }
