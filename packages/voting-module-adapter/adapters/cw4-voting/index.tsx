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
import { useActions } from './hooks'

export const Cw4VotingAdapter: VotingModuleAdapter = {
  id: CW4VOTING_CONTRACT_NAME,
  matcher: (contractName: string) =>
    contractName.includes(CW4VOTING_CONTRACT_NAME),

  load: () => ({
    // Fields
    fields: {
      membershipPageInfo: {
        renderIcon: (color, mobile) => (
          <Wallet
            color={color}
            height={mobile ? 16 : 14}
            width={mobile ? 16 : 14}
          />
        ),
        label: 'Members',
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
}
