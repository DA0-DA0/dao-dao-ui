import { PeopleAltOutlined } from '@mui/icons-material'

import {
  ActionCategoryKey,
  DaoTabId,
  VotingModuleAdapter,
} from '@dao-dao/types'
import {
  DAO_VOTING_CW4_CONTRACT_NAMES,
  DaoVotingCw4AdapterId,
} from '@dao-dao/utils'

import { makeManageMembersAction } from './actions'
import {
  DaoInfoBarLoader,
  MembersTab,
  ProfileCardMemberInfo,
} from './components'
import { useDaoInfoBarItems, useProfileNewProposalCardAddresses } from './hooks'

export const DaoVotingCw4Adapter: VotingModuleAdapter = {
  id: DaoVotingCw4AdapterId,
  contractNames: DAO_VOTING_CW4_CONTRACT_NAMES,

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

      DaoInfoBarLoader,
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
