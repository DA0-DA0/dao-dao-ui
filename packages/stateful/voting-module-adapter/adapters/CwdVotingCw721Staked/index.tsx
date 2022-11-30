import { ImageEmoji } from '@dao-dao/stateless'
import { DurationUnits, VotingModuleAdapter } from '@dao-dao/types'

import { ProfileCardMemberInfo } from './components'
import {
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

export const CwdVotingCw721StakedAdapter: VotingModuleAdapter<DaoCreationConfig> =
  {
    id: 'CwdVotingCw721Staked',
    contractNames: [
      // V1
      //'Cw721-staked-balance-voting',
      // V2
      'cw721_stake', //temporary while testing
      'cwd-voting-cw721-staked',
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
        Icon: ImageEmoji,
        nameI18nKey: 'daoCreationAdapter.CwdVotingCw721Staked.name',
        descriptionI18nKey:
          'daoCreationAdapter.CwdVotingCw721Staked.description',
        suppliesI18nKey: 'daoCreationAdapter.CwdVotingCw721Staked.supplies',
        membershipI18nKey: 'daoCreationAdapter.CwdVotingCw721Staked.membership',
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
        tokenType: GovernanceTokenType.Existing,
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
