import { DaoEmoji } from '@dao-dao/stateless'
import { DaoCreator, DurationUnits } from '@dao-dao/types'
import { TokenBasedCreatorId } from '@dao-dao/utils'

import { makeActiveThresholdVotingConfigItem } from '../../components/dao/commonVotingConfig/ActiveThresholdVotingConfigItem'
import { GovernanceConfigurationInput } from './GovernanceConfigurationInput'
import { GovernanceConfigurationReview } from './GovernanceConfigurationReview'
import { mutate } from './mutate'
import { CreatorData, GovernanceTokenType } from './types'
import { UnstakingDurationVotingConfigItem } from './UnstakingDurationVotingConfigItem'

export const TokenBasedCreator: DaoCreator<CreatorData> = {
  id: TokenBasedCreatorId,
  displayInfo: {
    Icon: DaoEmoji,
    nameI18nKey: 'daoCreator.TokenBased.name',
    descriptionI18nKey: 'daoCreator.TokenBased.description',
    suppliesI18nKey: 'daoCreator.TokenBased.supplies',
    membershipI18nKey: 'daoCreator.TokenBased.membership',
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
    existingTokenDenomOrAddress: '',
    unstakingDuration: {
      value: 2,
      units: DurationUnits.Weeks,
    },
    activeThreshold: {
      enabled: false,
      type: 'percent',
      value: 10,
    },
  },
  governanceConfig: {
    Input: GovernanceConfigurationInput,
    Review: GovernanceConfigurationReview,
  },
  votingConfig: {
    items: [UnstakingDurationVotingConfigItem],
    advancedItems: [makeActiveThresholdVotingConfigItem()],
  },
  mutate,
}
