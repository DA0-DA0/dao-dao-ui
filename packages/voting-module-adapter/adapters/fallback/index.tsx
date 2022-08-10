import { useMemo } from 'react'

import { Wallet } from '@dao-dao/icons'

import { VotingModuleAdapter } from '../../types'
import { MembershipMobileTab } from './MembershipMobileTab'
import { MembershipPlaceholder } from './MembershipPlaceholder'

export const FallbackVotingAdapter: VotingModuleAdapter = {
  id: 'fallback',
  matcher: () => true,

  load: ({ t }) => ({
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
        label: t('title.members'),
      },
    },

    // Hooks
    hooks: {
      useActions: () => useMemo(() => [], []),
    },

    // Components
    components: {
      Membership: {
        Desktop: MembershipPlaceholder,
        MobileTab: MembershipMobileTab,
        Mobile: MembershipPlaceholder,
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
