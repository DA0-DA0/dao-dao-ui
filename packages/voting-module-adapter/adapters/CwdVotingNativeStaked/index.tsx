import { Pie } from '@dao-dao/icons'

import { VotingModuleAdapter } from '../../types'
import {
  ClaimsPendingList,
  DaoInfoVotingConfiguration,
  Membership,
  MembershipMobileTab,
  ProfileCardMemberInfo,
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

export const CwdVotingNativeStakedAdapter: VotingModuleAdapter = {
  id: 'CwdVotingNativeStaked',
  contractNames: [
    // V1
    'cw-native-staked-balance-voting',
    // V2
    'cwd-voting-native-staked',
  ],

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
      ProfileCardMemberInfo,
      VoteHeroStats,
      SdaMembershipPage,

      StakingModal,
      ClaimsPendingList,
    },
  }),
}
