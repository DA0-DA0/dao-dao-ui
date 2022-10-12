import { Pie } from '@dao-dao/icons'

import { VotingModuleAdapter } from '../../types'
import {
  ClaimsPendingList,
  DaoInfoVotingConfiguration,
  Membership,
  MembershipMobileTab,
  ProfileCardNotMemberInfo,
  ProfileMemberCardMembershipInfo,
  SdaMembershipPage,
  StakingModal,
  VoteHeroStats,
} from './components'
import {
  useActions,
  useDaoInfoBarItems,
  useGovernanceTokenInfo,
  useStakingInfo,
} from './hooks'

export const CwNativeStakedBalanceVotingAdapter: VotingModuleAdapter = {
  id: 'cw-native-staked-balance-voting',
  matcher: (contractName: string) =>
    contractName.includes('cw-native-staked-balance-voting'),

  load: ({ t }) => ({
    // Fields
    fields: {
      membershipPageInfo: {
        renderIcon: (mobile) => (
          <Pie height={mobile ? 16 : 14} width={mobile ? 16 : 14} />
        ),
        label: t('title.stake'),
      },
    },

    // Hooks
    hooks: {
      useActions,
      useDaoInfoBarItems,
      useProfileNewProposalCardAddresses: () => [],
      useGovernanceTokenInfo,
      useStakingInfo,
    },

    // Components
    components: {
      Membership: {
        Desktop: (props) => <Membership {...props} />,
        MobileTab: MembershipMobileTab,
        Mobile: (props) => <Membership {...props} primaryText />,
      },
      DaoTreasuryFooter: () => null,
      DaoInfoAdditionalAddresses: () => null,
      DaoInfoVotingConfiguration,
      ProfileMemberCardMembershipInfo,
      ProfileCardNotMemberInfo,
      VoteHeroStats,
      SdaMembershipPage,

      StakingModal,
      ClaimsPendingList,
    },
  }),
}
