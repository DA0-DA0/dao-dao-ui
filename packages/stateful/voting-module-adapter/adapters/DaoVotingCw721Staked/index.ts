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
import { DAO_VOTING_CW721_STAKED_CONTRACT_NAMES } from '@dao-dao/utils'

import { UpdateStakingConfigAction } from './actions'
import {
  MembersTab,
  NftCollectionTab,
  ProfileCardMemberInfo,
} from './components'
import { useMainDaoInfoCards, useVotingModuleRelevantAddresses } from './hooks'
import { canListCw721StakedMembers } from './utils'

export const DaoVotingCw721StakedAdapter: VotingModuleAdapter = {
  id: 'DaoVotingCw721Staked',
  contractNames: DAO_VOTING_CW721_STAKED_CONTRACT_NAMES,

  load: ({ chainId }) => ({
    // Hooks
    hooks: {
      useMainDaoInfoCards,
      useVotingModuleRelevantAddresses,
    },

    // Components
    components: {
      extraTabs: [
        // Members can only be listed via the indexer, and not on Secret
        // Network.
        ...(!canListCw721StakedMembers(chainId)
          ? []
          : [
              {
                id: DaoTabId.Members,
                labelI18nKey: 'title.members',
                Component: MembersTab,
                Icon: PeopleAltOutlined,
                IconFilled: PeopleAltRounded,
              },
            ]),
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
