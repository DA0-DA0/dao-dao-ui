import { Wallet } from '@dao-dao/icons'
import { CW4VOTING_CONTRACT_NAME } from '@dao-dao/utils'

import { VotingModuleAdapter } from '../../types'
import {
  MembersTab,
  Membership,
  MembershipMobileTab,
  ProfileCardNotMemberInfo,
  ProfileMemberCardMembershipInfo,
  SdaMembershipPage,
  VoteHeroStats,
} from './components'
import {
  DisplayInfoIcon,
  GovernanceConfigurationInput,
  GovernanceConfigurationReview,
  getInstantiateInfo,
} from './daoCreation'
import {
  useActions,
  useDaoInfoBarItems,
  useProfileNewProposalCardAddresses,
} from './hooks'
import { DaoCreationConfig } from './types'

export const Cw4VotingAdapter: VotingModuleAdapter<DaoCreationConfig> = {
  id: 'cw4-voting',
  matcher: (contractName: string) =>
    contractName.includes(CW4VOTING_CONTRACT_NAME),

  load: ({ t }) => ({
    // Fields
    fields: {
      membershipPageInfo: {
        renderIcon: (mobile) => (
          <Wallet height={mobile ? 16 : 14} width={mobile ? 16 : 14} />
        ),
        label: t('title.members'),
      },
    },

    // Hooks
    hooks: {
      useActions,
      useDaoInfoBarItems,
      useProfileNewProposalCardAddresses,
    },

    // Components
    components: {
      MembersTab,
      Membership: {
        Desktop: () => <Membership />,
        MobileTab: MembershipMobileTab,
        Mobile: () => <Membership primaryText />,
      },
      DaoTreasuryFooter: () => null,
      DaoInfoAdditionalAddresses: () => null,
      ProfileCardNotMemberInfo,
      ProfileMemberCardMembershipInfo,
      VoteHeroStats,
      SdaMembershipPage,
    },
  }),

  daoCreation: {
    displayInfo: {
      Icon: DisplayInfoIcon,
      nameI18nKey: 'daoCreationAdapter.cw4-voting.name',
      descriptionI18nKey: 'daoCreationAdapter.cw4-voting.description',
      suppliesI18nKey: 'daoCreationAdapter.cw4-voting.supplies',
      membershipI18nKey: 'daoCreationAdapter.cw4-voting.membership',
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
  },
}
