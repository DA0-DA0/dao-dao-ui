import {
  ImageRounded,
  PeopleAltOutlined,
  PeopleAltRounded,
} from '@mui/icons-material'

import { MainDaoInfoCardsTokenLoader } from '@dao-dao/stateless'
import {
  ActionCategoryKey,
  DaoTabId,
  VotingModuleAdapter,
} from '@dao-dao/types'
import { DAO_VOTING_CW721_STAKED_CONTRACT_NAMES } from '@dao-dao/utils'

import { makeUpdateStakingConfigAction } from './actions'
import {
  MembersTab,
  NftCollectionTab,
  ProfileCardMemberInfo,
} from './components'
import {
  useCommonGovernanceTokenInfo,
  useMainDaoInfoCards,
  useProfileNewProposalCardAddresses,
} from './hooks'

export const DaoVotingCw721StakedAdapter: VotingModuleAdapter = {
  id: 'DaoVotingCw721Staked',
  contractNames: DAO_VOTING_CW721_STAKED_CONTRACT_NAMES,

  load: () => ({
    // Hooks
    hooks: {
      useMainDaoInfoCards,
      useProfileNewProposalCardAddresses,
      useCommonGovernanceTokenInfo,
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
      actionCategoryMakers: [
        () => ({
          // Add to DAO Governance category.
          key: ActionCategoryKey.DaoGovernance,
          actionMakers: [makeUpdateStakingConfigAction],
        }),
      ],
    },
  }),
}
