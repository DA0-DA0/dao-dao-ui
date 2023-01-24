import { ImageEmoji } from '@dao-dao/stateless'
import { DurationUnits, VotingModuleAdapter } from '@dao-dao/types'

import { ProfileCardMemberInfo, StakedNftsTab } from './components'
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
} from './hooks'
import { DaoCreationConfig, GovernanceTokenType } from './types'

export const DaoVotingCw721StakedAdapter: VotingModuleAdapter<DaoCreationConfig> =
  {
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
        useActions,
        useDaoInfoBarItems,
        useProfileNewProposalCardAddresses,
        useGovernanceTokenInfo,
      },

      // Components
      components: {
        extraTabs: [
          {
            id: 'staked',
            labelI18nKey: 'title.stakedNfts',
            Component: StakedNftsTab,
          },
        ],
        ProfileCardMemberInfo,
      },
    }),

    daoCreation: {
      displayInfo: {
        Icon: ImageEmoji,
        nameI18nKey: 'daoCreationAdapter.DaoVotingCw721Staked.name',
        descriptionI18nKey:
          'daoCreationAdapter.DaoVotingCw721Staked.description',
        suppliesI18nKey: 'daoCreationAdapter.DaoVotingCw721Staked.supplies',
        membershipI18nKey: 'daoCreationAdapter.DaoVotingCw721Staked.membership',
      },
      defaultConfig: {
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
