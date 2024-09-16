import {
  ImageRounded,
  PeopleAltOutlined,
  PeopleAltRounded,
} from '@mui/icons-material'

import { MainDaoInfoCardsTokenLoader } from '@dao-dao/stateless'
import {
  ActionCategoryKey,
  ActionKey,
  DaoTabId,
  VotingModuleAdapter,
} from '@dao-dao/types'
import { DAO_VOTING_ONFT_STAKED_CONTRACT_NAMES } from '@dao-dao/utils'

import { UpdateStakingConfigAction } from './actions'
import {
  MembersTab,
  NftCollectionTab,
  ProfileCardMemberInfo,
} from './components'
import { useMainDaoInfoCards, useVotingModuleRelevantAddresses } from './hooks'

export const DaoVotingOnftStakedAdapter: VotingModuleAdapter = {
  id: 'DaoVotingOnftStaked',
  contractNames: DAO_VOTING_ONFT_STAKED_CONTRACT_NAMES,

  load: () => ({
    // Hooks
    hooks: {
      useMainDaoInfoCards,
      useVotingModuleRelevantAddresses,
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
        {
          id: DaoTabId.Collection,
          labelI18nKey: 'title.nftCollection',
          Component: NftCollectionTab,
          Icon: ImageRounded,
          IconFilled: ImageRounded,
        },
      ],

      MainDaoInfoCardsLoader: MainDaoInfoCardsTokenLoader,
      ProfileCardMemberInfo,
    },

    // Functions
    fields: {
      actions: {
        actions: [UpdateStakingConfigAction],
        categoryMakers: [
          // Add to DAO Governance category.
          () => ({
            key: ActionCategoryKey.DaoGovernance,
            actionKeys: [ActionKey.UpdateStakingConfig],
          }),
        ],
      },
    },
  }),
}
