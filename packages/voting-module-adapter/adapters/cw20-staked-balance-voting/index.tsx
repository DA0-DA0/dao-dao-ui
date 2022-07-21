import { Pie } from '@dao-dao/icons'
import { CW20STAKEDBALANCEVOTING_CONTRACT_NAME } from '@dao-dao/utils'

import { VotingModuleAdapter } from '../../types'
import {
  DaoInfoAdditionalAddresses,
  DaoInfoVotingConfiguration,
  DaoThinInfoContent,
  DaoTreasuryFooter,
  Membership,
  MembershipMobileTab,
  ProposalDetailsVotingPowerWidget,
  ProposalModuleAddresses,
  SdaMembershipPage,
  VoteHeroStats,
} from './components'
import { useActions, useVoteConversionDecimals } from './hooks'

export const Cw20StakedBalanceVotingAdapter: VotingModuleAdapter = {
  id: CW20STAKEDBALANCEVOTING_CONTRACT_NAME,
  matcher: (contractName: string) =>
    contractName.includes(CW20STAKEDBALANCEVOTING_CONTRACT_NAME),

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
      useVoteConversionDecimals,
      useActions,
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
    },
  }),
}
