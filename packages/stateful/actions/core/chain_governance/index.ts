import {
  ActionCategoryKey,
  ActionCategoryMaker,
  ActionContextType,
  ChainId,
} from '@dao-dao/types'

import { makeGovernanceDepositAction } from './GovernanceDeposit'
import { makeGovernanceProposalAction } from './GovernanceProposal'
import { makeGovernanceVoteAction } from './GovernanceVote'
import { makeValidatorActionsAction } from './ValidatorActions'

export const makeChainGovernanceActionCategory: ActionCategoryMaker = ({
  t,
  context,
  chain: { chain_id: chainId },
}) =>
  // Governance module cannot participate in governance.
  context.type === ActionContextType.Gov ||
  // Neutron does not use the x/gov module.
  chainId === ChainId.NeutronMainnet
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
