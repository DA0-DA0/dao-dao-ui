import { useMemo } from 'react'

import { Wallet } from '@dao-dao/icons'

import { VotingModuleAdapter } from '../../types'

export const HowlVotingAdapter: VotingModuleAdapter = {
  id: 'howl-voting',
  matcher: (contractName: string) => contractName.includes('howl-voting'),

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
      ProposalModuleAddresses: () => null,
      VoteHeroStats: () => null,
      SdaMembershipPage: () => null,
    },
  }),
}
