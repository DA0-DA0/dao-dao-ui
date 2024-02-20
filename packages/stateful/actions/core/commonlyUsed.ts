import { ActionCategoryKey, ActionCategoryMaker } from '@dao-dao/types'

import { makeAuthzGrantRevokeAction } from './authorizations/AuthzGrantRevoke'
import { makeGovernanceVoteAction } from './chain_governance/GovernanceVote'
import { makeCreateCrossChainAccountAction } from './dao_governance/CreateCrossChainAccount'
import { makeUpgradeV1ToV2Action } from './dao_governance/UpgradeV1ToV2'
import { makeExecuteAction } from './smart_contracting/Execute'
import { makeInstantiateAction } from './smart_contracting/Instantiate'
import { makeCommunityPoolSpendAction } from './treasury/CommunityPoolSpend'
import { makeConfigureVestingPaymentsAction } from './treasury/ConfigureVestingPayments'
import { makeManageStakingAction } from './treasury/ManageStaking'
import { makeManageVestingAction } from './treasury/ManageVesting'
import { makeSpendAction } from './treasury/Spend'

export const makeCommonlyUsedCategory: ActionCategoryMaker = ({ t }) => ({
  key: ActionCategoryKey.CommonlyUsed,
  label: t('actionCategory.commonlyUsedLabel'),
  description: t('actionCategory.commonlyUsedDescription'),
  actionMakers: [
    makeUpgradeV1ToV2Action,
    makeSpendAction,
    makeCommunityPoolSpendAction,
    makeManageStakingAction,
    makeCreateCrossChainAccountAction,
    makeManageVestingAction,
    makeAuthzGrantRevokeAction,
    makeGovernanceVoteAction,
    makeExecuteAction,
    makeInstantiateAction,
    makeConfigureVestingPaymentsAction,
  ],
})
