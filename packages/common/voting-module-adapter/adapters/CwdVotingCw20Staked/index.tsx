import { DurationUnits, VotingModuleAdapter } from '@dao-dao/types'

import { ProfileCardMemberInfo } from './components'
import {
  DisplayInfoIcon,
  GovernanceConfigurationInput,
  GovernanceConfigurationReview,
  UnstakingDurationVotingConfigItem,
  getInstantiateInfo,
} from './daoCreation'
import {
  useActions,
  useDaoInfoBarItems,
  useGovernanceTokenInfo,
  useProfileNewProposalCardAddresses,
  useStakingInfo,
} from './hooks'
import { DaoCreationConfig, GovernanceTokenType } from './types'

export const CwdVotingCw20StakedAdapter: VotingModuleAdapter<DaoCreationConfig> =
  {
    id: 'CwdVotingCw20Staked',
    contractNames: [
      // V1
      'cw20-staked-balance-voting',
      // V2
      'cwd-voting-cw20-staked',
    ],

    load: () => ({
      // Hooks
      hooks: {
        useActions,
        useDaoInfoBarItems,
        useProfileNewProposalCardAddresses,
        useGovernanceTokenInfo,
        useStakingInfo,
      },

      // Components
      components: {
        ProfileCardMemberInfo,
      },
    }),

    daoCreation: {
      displayInfo: {
        Icon: DisplayInfoIcon,
        nameI18nKey: 'daoCreationAdapter.CwdVotingCw20Staked.name',
        descriptionI18nKey:
          'daoCreationAdapter.CwdVotingCw20Staked.description',
        suppliesI18nKey: 'daoCreationAdapter.CwdVotingCw20Staked.supplies',
        membershipI18nKey: 'daoCreationAdapter.CwdVotingCw20Staked.membership',
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
