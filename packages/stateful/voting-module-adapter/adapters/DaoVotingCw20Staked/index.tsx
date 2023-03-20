import { PeopleAltOutlined } from '@mui/icons-material'

import { DaoEmoji } from '@dao-dao/stateless'
import { DaoTabId, DurationUnits, VotingModuleAdapter } from '@dao-dao/types'

import { MembersTab, ProfileCardMemberInfo, StakingModal } from './components'
import {
  GovernanceConfigurationInput,
  GovernanceConfigurationReview,
  UnstakingDurationVotingConfigItem,
  getInstantiateInfo,
} from './daoCreation'
import {
  useActions,
  useCommonGovernanceTokenInfo,
  useDaoInfoBarItems,
  useProfileNewProposalCardAddresses,
} from './hooks'
import { DaoCreationConfig, GovernanceTokenType } from './types'

export const DaoVotingCw20StakedAdapter: VotingModuleAdapter<DaoCreationConfig> =
  {
    id: 'DaoVotingCw20Staked',
    contractNames: [
      // V1
      'cw20-staked-balance-voting',
      // V2
      'cwd-voting-cw20-staked',
      'dao-voting-cw20-staked',
    ],

    load: () => ({
      // Hooks
      hooks: {
        useActions,
        useDaoInfoBarItems,
        useProfileNewProposalCardAddresses,
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
    }),

    daoCreation: {
      displayInfo: {
        Icon: DaoEmoji,
        nameI18nKey: 'daoCreationAdapter.DaoVotingCw20Staked.name',
        descriptionI18nKey:
          'daoCreationAdapter.DaoVotingCw20Staked.description',
        suppliesI18nKey: 'daoCreationAdapter.DaoVotingCw20Staked.supplies',
        membershipI18nKey: 'daoCreationAdapter.DaoVotingCw20Staked.membership',
      },
      defaultConfig: {
        tiers: [
          {
            name: '',
            weight: 10,
            members: [
              {
                address: '',
              },
            ],
          },
        ],
        tokenType: GovernanceTokenType.New,
        newInfo: {
          initialSupply: 10000000,
          initialTreasuryPercent: 90,
          symbol: '',
          name: '',
        },
        existingGovernanceTokenAddress: '',
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
