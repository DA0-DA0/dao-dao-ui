import {
  ActionCategoryKey,
  ActionCategoryMaker,
  ActionKey,
} from '@dao-dao/types'

export const makeDaoGovernanceActionCategory: ActionCategoryMaker = ({
  t,
  context,
}) => ({
  key: ActionCategoryKey.DaoGovernance,
  label: t('actionCategory.daoGovernanceLabel'),
  description: t('actionCategory.daoGovernanceDescription', {
    context: context.type,
  }),
  actionKeys: [
    ActionKey.EnableMultipleChoice,
    ActionKey.ManageStorageItems,
    ActionKey.DaoAdminExec,
    ActionKey.UpgradeV1ToV2,
    ActionKey.CreateCrossChainAccount,
    ActionKey.SetUpApprover,
    ActionKey.VetoProposal,
    ActionKey.ExecuteProposal,
    ActionKey.ManageVetoableDaos,
    ActionKey.ManageSubDaoPause,
    ActionKey.NeutronOverruleSubDaoProposal,
    ActionKey.UpdateProposalConfig,
    ActionKey.UpdatePreProposeConfig,
    ActionKey.CreateDao,
  ],
})
