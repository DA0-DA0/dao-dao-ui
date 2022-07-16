import { ActionKey } from '@dao-dao/actions'
import { Pie } from '@dao-dao/icons'
import { CW20STAKEDBALANCEVOTING_CONTRACT_NAME } from '@dao-dao/utils'

import { VotingModuleAdapter } from '../../types'
import {
  DaoContractInfoContent,
  DaoHorizontalInfoDisplayInternal,
  DaoTreasuryFooter,
  Membership,
  MembershipMobileTab,
  ProposalCreateAddresses,
  ProposalDetails,
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
      sdaMembershipPageNavInfo: {
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

    // UI
    ui: {
      Membership: {
        Desktop: () => <Membership />,
        MobileTab: MembershipMobileTab,
        Mobile: (props) => <Membership {...props} primaryText />,
      },
      DaoHorizontalInfoDisplayInternal,
      ProposalDetails,
      DaoTreasuryFooter,
      DaoContractInfoContent,
      ProposalCreateAddresses,
      VoteHeroStats,
      SdaMembershipPage,
    },
  }),
}
