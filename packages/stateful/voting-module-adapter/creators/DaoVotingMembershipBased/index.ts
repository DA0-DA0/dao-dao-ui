import { HandshakeEmoji } from '@dao-dao/stateless'
import { VotingModuleCreator } from '@dao-dao/types'
import { DaoVotingMembershipBasedCreatorId } from '@dao-dao/utils'

import { getInstantiateInfo } from './getInstantiateInfo'
import { GovernanceConfigurationInput } from './GovernanceConfigurationInput'
import { GovernanceConfigurationReview } from './GovernanceConfigurationReview'

export const DaoVotingMembershipBasedCreator: VotingModuleCreator = {
  id: DaoVotingMembershipBasedCreatorId,
  displayInfo: {
    Icon: HandshakeEmoji,
    nameI18nKey: 'daoCreation.DaoVotingMembershipBased.name',
    descriptionI18nKey: 'daoCreation.DaoVotingMembershipBased.description',
    suppliesI18nKey: 'daoCreation.DaoVotingMembershipBased.supplies',
    membershipI18nKey: 'daoCreation.DaoVotingMembershipBased.membership',
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
  getInstantiateInfo,
}
