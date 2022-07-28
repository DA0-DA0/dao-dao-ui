import { Pie } from '@dao-dao/icons'
import { CWNATIVESTAKEDBALANCEVOTING_CONTRACT_NAME } from '@dao-dao/utils'

import { VotingModuleAdapter } from '../../types'
import {
  ClaimsPendingList,
  DaoInfoAdditionalAddresses,
  DaoInfoVotingConfiguration,
  DaoThinInfoContent,
  DaoTreasuryFooter,
  Membership,
  MembershipMobileTab,
  ProposalDetailsVotingPowerWidget,
  ProposalModuleAddresses,
  SdaMembershipPage,
  StakingModal,
  VoteHeroStats,
} from './components'
import { useActions, useGovernanceTokenInfo, useStakingInfo } from './hooks'

export const CwNativeStakedBalanceVotingAdapter: VotingModuleAdapter = {
  id: CWNATIVESTAKEDBALANCEVOTING_CONTRACT_NAME,
  matcher: (contractName: string) =>
    contractName.includes(CWNATIVESTAKEDBALANCEVOTING_CONTRACT_NAME),

  load: () => ({
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
        label: 'Stake',
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
      DaoTreasuryFooter,
      DaoInfoAdditionalAddresses,
      DaoInfoVotingConfiguration,
      ProposalModuleAddresses,
      VoteHeroStats,
      SdaMembershipPage,

      ProposalDetailsVotingPowerWidget,
      StakingModal,
      ClaimsPendingList,
    },
  }),
}
