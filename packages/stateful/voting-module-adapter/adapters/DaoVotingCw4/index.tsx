import { PeopleAltOutlined } from '@mui/icons-material'

import { HandshakeEmoji } from '@dao-dao/stateless'
import {
  ActionCategoryKey,
  DaoTabId,
  VotingModuleAdapter,
} from '@dao-dao/types'

import { makeManageMembersAction } from './actions'
import { MembersTab, ProfileCardMemberInfo } from './components'
import {
  GovernanceConfigurationInput,
  GovernanceConfigurationReview,
  getInstantiateInfo,
} from './daoCreation'
import { useDaoInfoBarItems, useProfileNewProposalCardAddresses } from './hooks'
import { DaoCreationConfig } from './types'

export const DaoVotingCw4Adapter: VotingModuleAdapter<DaoCreationConfig> = {
  id: 'DaoVotingCw4',
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

  daoCreation: {
    displayInfo: {
      Icon: HandshakeEmoji,
      nameI18nKey: 'daoCreationAdapter.DaoVotingCw4.name',
      descriptionI18nKey: 'daoCreationAdapter.DaoVotingCw4.description',
      suppliesI18nKey: 'daoCreationAdapter.DaoVotingCw4.supplies',
      membershipI18nKey: 'daoCreationAdapter.DaoVotingCw4.membership',
    },
    defaultConfig: {
      tiers: [
        {
          name: '',
          weight: 1,
          members: [
            {
              address: '',
            },
          ],
        },
      ],
    },
    governanceConfig: {
      Input: GovernanceConfigurationInput,
      Review: GovernanceConfigurationReview,
    },
    votingConfig: {
      items: [],
    },
    getInstantiateInfo,
  },
}
