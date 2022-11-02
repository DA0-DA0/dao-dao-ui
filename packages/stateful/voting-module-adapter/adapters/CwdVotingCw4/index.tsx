import { VotingModuleAdapter } from '@dao-dao/types'

import { MembersTab, ProfileCardMemberInfo } from './components'
import {
  DisplayInfoIcon,
  GovernanceConfigurationInput,
  GovernanceConfigurationReview,
  getInstantiateInfo,
} from './daoCreation'
import {
  useActions,
  useDaoInfoBarItems,
  useProfileNewProposalCardAddresses,
} from './hooks'
import { DaoCreationConfig } from './types'

export const CwdVotingCw4Adapter: VotingModuleAdapter<DaoCreationConfig> = {
  id: 'CwdVotingCw4',
  contractNames: [
    // V1
    'cw4-voting',
    // V2
    'cwd-voting-cw4',
  ],

  load: () => ({
    // Hooks
    hooks: {
      useActions,
      useDaoInfoBarItems,
      useProfileNewProposalCardAddresses,
    },

    // Components
    components: {
      MembersTab,
      ProfileCardMemberInfo,
    },
  }),

  daoCreation: {
    displayInfo: {
      Icon: DisplayInfoIcon,
      nameI18nKey: 'daoCreationAdapter.CwdVotingCw4.name',
      descriptionI18nKey: 'daoCreationAdapter.CwdVotingCw4.description',
      suppliesI18nKey: 'daoCreationAdapter.CwdVotingCw4.supplies',
      membershipI18nKey: 'daoCreationAdapter.CwdVotingCw4.membership',
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
