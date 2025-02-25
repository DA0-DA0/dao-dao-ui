import { DaoEmoji } from '@dao-dao/stateless'
import { DaoCreator, DurationUnits, TokenType } from '@dao-dao/types'
import { TokenBasedCreatorId } from '@dao-dao/utils'

import { makeActiveThresholdVotingConfigItem } from '../../components/dao/commonVotingConfig/ActiveThresholdVotingConfigItem'
import { getInstantiateInfo } from './getInstantiateInfo'
import { GovernanceConfigurationInput } from './GovernanceConfigurationInput'
import { GovernanceConfigurationReview } from './GovernanceConfigurationReview'
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
  makeDefaultConfig: ({
    tokenCreationUnderDevelopment = false,
    noTokenFactory = false,
    noTokenCreation = false,
    tokenDaoType = TokenType.Native,
  }) => ({
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
    govTokenType:
      tokenCreationUnderDevelopment || noTokenFactory || noTokenCreation
        ? GovernanceTokenType.Existing
        : GovernanceTokenType.New,
    selectedTokenType:
      tokenDaoType === 'both' ? TokenType.Native : tokenDaoType,
    newInfo: {
      initialSupply: '10000000',
      initialTreasuryPercent: 90,
      maxSupply: '100000000',
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
      value: '10',
    },
  }),
  governanceConfig: {
    Input: GovernanceConfigurationInput,
    Review: GovernanceConfigurationReview,
  },
  votingConfig: {
    items: [UnstakingDurationVotingConfigItem],
    advancedItems: [makeActiveThresholdVotingConfigItem()],
  },
  getInstantiateInfo,
}
