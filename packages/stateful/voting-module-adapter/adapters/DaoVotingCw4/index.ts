import { PeopleAltOutlined } from '@mui/icons-material'

import {
  ActionCategoryKey,
  DaoTabId,
  VotingModuleAdapter,
} from '@dao-dao/types'
import { DaoVotingCw4AdapterId } from '@dao-dao/utils'

import { makeManageMembersAction } from './actions'
import { MembersTab, ProfileCardMemberInfo } from './components'
import { useDaoInfoBarItems, useProfileNewProposalCardAddresses } from './hooks'

export const DaoVotingCw4Adapter: VotingModuleAdapter = {
  id: DaoVotingCw4AdapterId,
  contractNames: [
    // V1
    'cw4-voting',
    // V2
    'cwd-voting-cw4',
    'dao-voting-cw4',
  ],

  load: () => ({
    // Hooks
    hooks: {
      useDaoInfoBarItems,
      useProfileNewProposalCardAddresses,
    },

    // Components
    components: {
      extraTabs: [
        {
          id: DaoTabId.Members,
          labelI18nKey: 'title.members',
          Component: MembersTab,
          Icon: PeopleAltOutlined,
        },
      ],
      ProfileCardMemberInfo,
    },

    // Functions
    fields: {
      actionCategoryMakers: [
        () => ({
          // Add to DAO Governance category.
          key: ActionCategoryKey.DaoGovernance,
          actionMakers: [makeManageMembersAction],
        }),
      ],
    },
  }),
}
