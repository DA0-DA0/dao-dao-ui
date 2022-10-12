import { useMemo } from 'react'

import { Wallet } from '@dao-dao/icons'

import { VotingModuleAdapter } from '../../types'
import { MembershipMobileTab } from './MembershipMobileTab'
import { MembershipPlaceholder } from './MembershipPlaceholder'

// Used in case no voting module adapter applies so that it still loads.
export const FallbackAdapter: VotingModuleAdapter = {
  id: 'Fallback',
  // Match all contracts.
  contractNames: [''],

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
      useActions: () => useMemo(() => [], []),
      useDaoInfoBarItems: () => [],
      useProfileNewProposalCardAddresses: () => [],
    },

    // Components
    components: {
      Membership: {
        Desktop: MembershipPlaceholder,
        MobileTab: MembershipMobileTab,
        Mobile: MembershipPlaceholder,
      },
      DaoTreasuryFooter: () => null,
      DaoInfoAdditionalAddresses: () => null,
      ProfileMemberCardMembershipInfo: () => null,
      ProfileCardNotMemberInfo: () => null,
      VoteHeroStats: () => null,
      SdaMembershipPage: () => null,
    },
  }),
}
