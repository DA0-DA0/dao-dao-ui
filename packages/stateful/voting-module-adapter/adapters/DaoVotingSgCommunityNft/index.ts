import { PeopleAltOutlined, PeopleAltRounded } from '@mui/icons-material'

import { DaoTabId, VotingModuleAdapter } from '@dao-dao/types'
import { DAO_VOTING_SG_COMMUNITY_NFT_CONTRACT_NAMES } from '@dao-dao/utils'

import { MembersTab, ProfileCardMemberInfo } from './components'
import { useMainDaoInfoCards } from './hooks'

export const DaoVotingSgCommunityNftAdapter: VotingModuleAdapter = {
  id: 'DaoVotingSgCommunityNft',
  contractNames: DAO_VOTING_SG_COMMUNITY_NFT_CONTRACT_NAMES,

  load: () => ({
    // Hooks
    hooks: {
      useMainDaoInfoCards,
      useVotingModuleRelevantAddresses: () => [],
    },

    // Components
    components: {
      extraTabs: [
        {
          id: DaoTabId.Members,
          labelI18nKey: 'title.members',
          Component: MembersTab,
          Icon: PeopleAltOutlined,
          IconFilled: PeopleAltRounded,
        },
      ],

      // No suspense loader needed as we don't suspend when loading card info.
      MainDaoInfoCardsLoader: () => null,

      ProfileCardMemberInfo,
    },

    // Functions
    fields: {},
  }),
}
