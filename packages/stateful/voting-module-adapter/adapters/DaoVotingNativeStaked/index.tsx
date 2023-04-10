import { PeopleAltOutlined } from '@mui/icons-material'

import { DaoTabId, VotingModuleAdapter } from '@dao-dao/types'
import { DaoVotingNativeStakedAdapterId } from '@dao-dao/utils'

import { MembersTab, ProfileCardMemberInfo, StakingModal } from './components'
import { useCommonGovernanceTokenInfo, useDaoInfoBarItems } from './hooks'

export const DaoVotingNativeStakedAdapter: VotingModuleAdapter = {
  id: DaoVotingNativeStakedAdapterId,
  contractNames: [
    // V1
    'cw-native-staked-balance-voting',
    // V2
    'cwd-voting-native-staked',
    'dao-voting-native-staked',
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
      actionCategoryMakers: [],
    },
  }),
}
