import { ImageRounded, PeopleAltOutlined } from '@mui/icons-material'

import {
  ActionCategoryKey,
  DaoTabId,
  VotingModuleAdapter,
} from '@dao-dao/types'

import { makeUpdateStakingConfigAction } from './actions'
import {
  MembersTab,
  NftCollectionTab,
  ProfileCardMemberInfo,
} from './components'
import {
  useCommonGovernanceTokenInfo,
  useDaoInfoBarItems,
  useProfileNewProposalCardAddresses,
} from './hooks'

export const DaoVotingCw721StakedAdapter: VotingModuleAdapter = {
  id: 'DaoVotingCw721Staked',
  contractNames: [
    // V1
    //'Cw721-staked-balance-voting',
    // V2
    'cw721_stake', //temporary while testing
    'dao-voting-cw721-staked',
  ],

  load: () => ({
    // Hooks
    hooks: {
      useDaoInfoBarItems,
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
        },
        {
          id: DaoTabId.Collection,
          labelI18nKey: 'title.nftCollection',
          Component: NftCollectionTab,
          Icon: ImageRounded,
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
          actionMakers: [makeUpdateStakingConfigAction],
        }),
      ],
    },
  }),
}
