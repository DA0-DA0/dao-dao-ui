import { useMemo } from 'react'

import { Wallet } from '@dao-dao/icons'

import { VotingModuleAdapter } from '../../types'

export const DefaultVotingAdapter: VotingModuleAdapter = {
  id: 'default',
  matcher: () => true,

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
      useActions: () => useMemo(() => [], []),
    },

    // Components
    components: {
      Membership: {
        Desktop: () => null,
        MobileTab: () => null,
        Mobile: () => null,
      },
      DaoThinInfoContent: () => null,
      DaoTreasuryFooter: () => null,
      DaoInfoAdditionalAddresses: () => null,
      DaoInfoVotingConfiguration: () => null,
      ProposalCreationAdditionalAddresses: () => null,
      VoteHeroStats: () => null,
      SdaMembershipPage: () => null,
    },
  }),
}
