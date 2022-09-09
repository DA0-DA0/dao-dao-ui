import { Wallet } from '@dao-dao/icons'
import { CW4VOTING_CONTRACT_NAME } from '@dao-dao/utils'

import { VotingModuleAdapter } from '../../types'
import {
  DaoThinInfoContent,
  Membership,
  MembershipMobileTab,
  ProposalCreationAdditionalAddresses,
  SdaMembershipPage,
  VoteHeroStats,
} from './components'
import { DisplayInfoIcon, GovernanceConfiguration } from './daoCreation'
import { useActions } from './hooks'

export const Cw4VotingAdapter: VotingModuleAdapter = {
  id: CW4VOTING_CONTRACT_NAME,
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
    },

    // Components
    components: {
      Membership: {
        Desktop: () => <Membership />,
        MobileTab: MembershipMobileTab,
        Mobile: () => <Membership primaryText />,
      },
      DaoThinInfoContent,
      DaoTreasuryFooter: () => null,
      DaoInfoAdditionalAddresses: () => null,
      DaoInfoVotingConfiguration: () => null,
      ProposalCreationAdditionalAddresses,
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
    defaultConfig: {},
    GovernanceConfiguration,
    votingConfigurationItems: [],
  },
}
