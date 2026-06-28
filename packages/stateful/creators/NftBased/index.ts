import { ImageEmoji } from '@dao-dao/stateless'
import { DaoCreator, DurationUnits } from '@dao-dao/types'
import { NftBasedCreatorId } from '@dao-dao/utils'

import { makeActiveThresholdVotingConfigItem } from '../../components/dao/commonVotingConfig/ActiveThresholdVotingConfigItem'
import { getInstantiateInfo } from './getInstantiateInfo'
import { GovernanceConfigurationInput } from './GovernanceConfigurationInput'
import { GovernanceConfigurationReview } from './GovernanceConfigurationReview'
import { GovernanceTokenType, NftVotingModuleType } from './types'
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
    votingModuleType: NftVotingModuleType.Staked,
    tokenType: GovernanceTokenType.Existing,
    existingGovernanceNftCollectionAddress: '',
    newInfo: {
      name: '',
      symbol: '',
    },
    initialNfts: [
      {
        owner: '',
        tokenId: '',
        role: 'agent',
        weight: 1,
      },
    ],
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
  getInstantiateInfo,
}
