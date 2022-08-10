import { Pie } from '@dao-dao/icons'
import { CWNATIVESTAKEDBALANCEVOTING_CONTRACT_NAME } from '@dao-dao/utils'

import { VotingModuleAdapter } from '../../types'
import {
  ClaimsPendingList,
  DaoInfoVotingConfiguration,
  DaoThinInfoContent,
  Membership,
  MembershipMobileTab,
  ProposalDetailsVotingPowerWidget,
  SdaMembershipPage,
  StakingModal,
  VoteHeroStats,
} from './components'
import { useActions, useGovernanceTokenInfo, useStakingInfo } from './hooks'

export const CwNativeStakedBalanceVotingAdapter: VotingModuleAdapter = {
  id: CWNATIVESTAKEDBALANCEVOTING_CONTRACT_NAME,
  matcher: (contractName: string) =>
    contractName.includes(CWNATIVESTAKEDBALANCEVOTING_CONTRACT_NAME),

  load: ({ t }) => ({
    // Fields
    fields: {
      membershipPageInfo: {
        renderIcon: (color, mobile) => (
          <Pie
            color={color}
            height={mobile ? 16 : 14}
            width={mobile ? 16 : 14}
          />
        ),
        label: t('title.stake'),
      },
    },

    // Hooks
    hooks: {
      useActions,
      useGovernanceTokenInfo,
      useStakingInfo,
    },

    // Components
    components: {
      Membership: {
        Desktop: () => <Membership />,
        MobileTab: MembershipMobileTab,
        Mobile: (props) => <Membership {...props} primaryText />,
      },
      DaoThinInfoContent,
      DaoTreasuryFooter: () => null,
      DaoInfoAdditionalAddresses: () => null,
      DaoInfoVotingConfiguration,
      ProposalCreationAdditionalAddresses: () => null,
      VoteHeroStats,
      SdaMembershipPage,

      ProposalDetailsVotingPowerWidget,
      StakingModal,
      ClaimsPendingList,
    },
  }),
}
