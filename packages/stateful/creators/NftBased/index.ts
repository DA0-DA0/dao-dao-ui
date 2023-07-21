import { ImageEmoji } from '@dao-dao/stateless'
import { DaoCreator, DurationUnits } from '@dao-dao/types'
import { NftBasedCreatorId } from '@dao-dao/utils'

import { GovernanceConfigurationInput } from './GovernanceConfigurationInput'
import { GovernanceConfigurationReview } from './GovernanceConfigurationReview'
import { mutate } from './mutate'
import { CreatorData, GovernanceTokenType } from './types'
import { UnstakingDurationVotingConfigItem } from './UnstakingDurationVotingConfigItem'

export const NftBasedCreator: DaoCreator<CreatorData> = {
  id: NftBasedCreatorId,
  displayInfo: {
    Icon: ImageEmoji,
    nameI18nKey: 'daoCreator.NftBased.name',
    descriptionI18nKey: 'daoCreator.NftBased.description',
    suppliesI18nKey: 'daoCreator.NftBased.supplies',
    membershipI18nKey: 'daoCreator.NftBased.membership',
  },
  defaultConfig: {
    tokenType: GovernanceTokenType.New,
    newInfo: {
      initialNfts: [],
      label: '',
      name: '',
      symbol: '',
    },
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
  mutate,
}
