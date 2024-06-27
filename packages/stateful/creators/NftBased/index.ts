import { ImageEmoji } from '@dao-dao/stateless'
import { DaoCreator, DurationUnits } from '@dao-dao/types'
import { NftBasedCreatorId } from '@dao-dao/utils'

import { makeActiveThresholdVotingConfigItem } from '../../components/dao/commonVotingConfig/ActiveThresholdVotingConfigItem'
import { GovernanceTokenType } from '../TokenBased/types'
import { GovernanceConfigurationInput } from './GovernanceConfigurationInput'
import { GovernanceConfigurationReview } from './GovernanceConfigurationReview'
import { mutate } from './mutate'
import { UnstakingDurationVotingConfigItem } from './UnstakingDurationVotingConfigItem'

export const NftBasedCreator: DaoCreator = {
  id: NftBasedCreatorId,
  displayInfo: {
    Icon: ImageEmoji,
    nameI18nKey: 'daoCreator.NftBased.name',
    descriptionI18nKey: 'daoCreator.NftBased.description',
    suppliesI18nKey: 'daoCreator.NftBased.supplies',
    membershipI18nKey: 'daoCreator.NftBased.membership',
  },
  makeDefaultConfig: () => ({
    tokenType: GovernanceTokenType.Existing,
    existingGovernanceNftCollectionAddress: '',
    unstakingDuration: {
      value: 2,
      units: DurationUnits.Weeks,
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
  mutate,
}
