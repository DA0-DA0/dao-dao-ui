import { PeopleAltOutlined } from '@mui/icons-material'

import { DaoEmoji } from '@dao-dao/stateless'
import {
  ActionCategoryKey,
  DaoTabId,
  DurationUnits,
  VotingModuleAdapter,
} from '@dao-dao/types'
import { DaoVotingNativeStakedAdapterId } from '@dao-dao/utils'

import { makeMintAction } from './actions'
import { MembersTab, ProfileCardMemberInfo, StakingModal } from './components'
import {
  GovernanceConfigurationInput,
  GovernanceConfigurationReview,
  UnstakingDurationVotingConfigItem,
  getInstantiateInfo,
} from './daoCreation'
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
      actionCategoryMakers: [
        () => ({
          // Add to DAO Governance category.
          key: ActionCategoryKey.DaoGovernance,
          actionMakers: [makeMintAction],
        }),
      ],
    },
  }),

  daoCreation: {
    displayInfo: {
      Icon: DaoEmoji,
      nameI18nKey: 'daoCreationAdapter.DaoVotingNativeStaked.name',
      descriptionI18nKey:
        'daoCreationAdapter.DaoVotingNativeStaked.description',
      suppliesI18nKey: 'daoCreationAdapter.DaoVotingNativeStaked.supplies',
      membershipI18nKey: 'daoCreationAdapter.DaoVotingNativeStaked.membership',
    },
    defaultConfig: {
      governanceTokenDenom: '',
      unstakingDuration: {
        value: 2,
        units: DurationUnits.Weeks,
      },
    },
    governanceConfig: {
      Input: GovernanceConfigurationInput,
      Review: GovernanceConfigurationReview,
    },
    votingConfig: {
      items: [UnstakingDurationVotingConfigItem],
    },
    getInstantiateInfo,
  },
}
