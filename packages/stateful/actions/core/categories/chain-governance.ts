import {
  ActionCategoryKey,
  ActionCategoryMaker,
  ActionKey,
} from '@dao-dao/types'

export const makeChainGovernanceActionCategory: ActionCategoryMaker = ({
  t,
}) => ({
  key: ActionCategoryKey.ChainGovernance,
  label: t('actionCategory.chainGovernanceLabel'),
  description: t('actionCategory.chainGovernanceDescription'),
  actionKeys: [
    ActionKey.GovernanceVote,
    ActionKey.GovernanceProposal,
    ActionKey.GovernanceDeposit,
    ActionKey.ValidatorActions,
  ],
})
