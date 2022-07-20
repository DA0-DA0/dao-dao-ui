import { ActionKey } from '@dao-dao/actions'
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
  ProposalCreateAddresses,
  ProposalDetailsVotingPowerWidget,
  SdaMembershipPage,
  VoteHeroStats,
} from './components'
import { useVoteConversionDecimals } from './hooks'

export const Cw20StakedBalanceVotingAdapter: VotingModuleAdapter = {
  id: CW20STAKEDBALANCEVOTING_CONTRACT_NAME,
  matcher: (contractName: string) =>
    contractName.includes(CW20STAKEDBALANCEVOTING_CONTRACT_NAME),

  load: () => ({
    // Fields
    fields: {
      disabledActionKeys: [ActionKey.ManageMembers],
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
      ProposalCreateAddresses,
      VoteHeroStats,
      SdaMembershipPage,
      ProposalDetailsVotingPowerWidget,
    },
  }),
}
