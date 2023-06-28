import { HandshakeEmoji } from '@dao-dao/stateless'
import { DaoCreator } from '@dao-dao/types'
import { MembershipBasedCreatorId } from '@dao-dao/utils'

import { GovernanceConfigurationInput } from './GovernanceConfigurationInput'
import { GovernanceConfigurationReview } from './GovernanceConfigurationReview'
import { mutate } from './mutate'

export const MembershipBasedCreator: DaoCreator = {
  id: MembershipBasedCreatorId,
  displayInfo: {
    Icon: HandshakeEmoji,
    nameI18nKey: 'daoCreator.MembershipBased.name',
    descriptionI18nKey: 'daoCreator.MembershipBased.description',
    suppliesI18nKey: 'daoCreator.MembershipBased.supplies',
    membershipI18nKey: 'daoCreator.MembershipBased.membership',
  },
  defaultConfig: {
    tiers: [
      {
        name: '',
        weight: 1,
        members: [
          {
            address: '',
          },
        ],
      },
    ],
  },
  governanceConfig: {
    Input: GovernanceConfigurationInput,
    Review: GovernanceConfigurationReview,
  },
  votingConfig: {
    items: [],
  },
  mutate,
}
