import { ImageEmoji } from '@dao-dao/stateless'
import { DurationUnits, VotingModuleCreator } from '@dao-dao/types'
import { DaoVotingNftBasedCreatorId } from '@dao-dao/utils'

import { GovernanceTokenType } from '../DaoVotingTokenBased/types'
import { getInstantiateInfo } from './getInstantiateInfo'
import { GovernanceConfigurationInput } from './GovernanceConfigurationInput'
import { GovernanceConfigurationReview } from './GovernanceConfigurationReview'
import { UnstakingDurationVotingConfigItem } from './UnstakingDurationVotingConfigItem'

export const DaoVotingNftBasedCreator: VotingModuleCreator = {
  id: DaoVotingNftBasedCreatorId,
  displayInfo: {
    Icon: ImageEmoji,
    nameI18nKey: 'daoCreation.DaoVotingNftBased.name',
    descriptionI18nKey: 'daoCreation.DaoVotingNftBased.description',
    suppliesI18nKey: 'daoCreation.DaoVotingNftBased.supplies',
    membershipI18nKey: 'daoCreation.DaoVotingNftBased.membership',
  },
  defaultConfig: {
    tokenType: GovernanceTokenType.Existing,
    existingGovernanceTokenDenomOrAddress: '',
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
