import { PeopleAltOutlined } from '@mui/icons-material'

import { DaoInfoBarTokenLoader } from '@dao-dao/stateless'
import {
  ActionCategoryKey,
  DaoTabId,
  VotingModuleAdapter,
} from '@dao-dao/types'
import { DaoVotingTokenStakedAdapterId } from '@dao-dao/utils'

import {
  makeMintAction,
  makeUpdateMinterAllowanceAction,
  makeUpdateStakingConfigAction,
} from './actions'
import { MembersTab, ProfileCardMemberInfo, StakingModal } from './components'
import { useCommonGovernanceTokenInfo, useDaoInfoBarItems } from './hooks'

export const DaoVotingTokenStakedAdapter: VotingModuleAdapter = {
  id: DaoVotingTokenStakedAdapterId,
  contractNames: [
    // V2.3.0
    'dao-voting-token-staked',
  ],

  load: () => ({
    // Hooks
    hooks: {
      useDaoInfoBarItems,
      useProfileNewProposalCardAddresses: () => [],
      useCommonGovernanceTokenInfo,
    },

    // Components
    components: {
      DaoInfoBarLoader: DaoInfoBarTokenLoader,
      ProfileCardMemberInfo,
      StakingModal,

      extraTabs: [
        {
          id: DaoTabId.Members,
          labelI18nKey: 'title.members',
          Component: MembersTab,
          Icon: PeopleAltOutlined,
        },
      ],
    },

    // Functions
    fields: {
      actionCategoryMakers: [
        () => ({
          // Add to DAO Governance category.
          key: ActionCategoryKey.DaoGovernance,
          actionMakers: [
            makeMintAction,
            makeUpdateMinterAllowanceAction,
            makeUpdateStakingConfigAction,
          ],
        }),
      ],
    },
  }),
}
