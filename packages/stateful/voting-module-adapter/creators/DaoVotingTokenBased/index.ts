import { DaoEmoji } from '@dao-dao/stateless'
import { DurationUnits, TokenType, VotingModuleCreator } from '@dao-dao/types'
import { DaoVotingTokenBasedCreatorId } from '@dao-dao/utils'

import { getInstantiateInfo } from './getInstantiateInfo'
import { GovernanceConfigurationInput } from './GovernanceConfigurationInput'
import { GovernanceConfigurationReview } from './GovernanceConfigurationReview'
import { GovernanceTokenType, VotingModuleCreatorConfig } from './types'
import { UnstakingDurationVotingConfigItem } from './UnstakingDurationVotingConfigItem'

export const DaoVotingTokenBasedCreator: VotingModuleCreator<VotingModuleCreatorConfig> =
  {
    id: DaoVotingTokenBasedCreatorId,
    displayInfo: {
      Icon: DaoEmoji,
      nameI18nKey: 'daoCreation.DaoVotingTokenBased.name',
      descriptionI18nKey: 'daoCreation.DaoVotingTokenBased.description',
      suppliesI18nKey: 'daoCreation.DaoVotingTokenBased.supplies',
      membershipI18nKey: 'daoCreation.DaoVotingTokenBased.membership',
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
      tokenType: GovernanceTokenType.NewCw20,
      newInfo: {
        initialSupply: 10000000,
        initialTreasuryPercent: 90,
        symbol: '',
        name: '',
      },
      existingTokenType: TokenType.Cw20,
      existingTokenDenomOrAddress: '',
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
  }
