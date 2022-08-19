import { Pie } from '@dao-dao/icons'
import { CW20STAKEDBALANCEVOTING_CONTRACT_NAME } from '@dao-dao/utils'

import { VotingModuleAdapter } from '../../types'
import {
  ClaimsPendingList,
  DaoInfoAdditionalAddresses,
  DaoInfoVotingConfiguration,
  DaoThinInfoContent,
  DaoTreasuryFooter,
  Membership,
  MembershipMobileTab,
  ProposalCreationAdditionalAddresses,
  ProposalDetailsVotingPowerWidget,
  SdaMembershipPage,
  StakingModal,
  VoteHeroStats,
} from './components'
import { useActions, useGovernanceTokenInfo, useStakingInfo } from './hooks'

export const Cw20StakedBalanceVotingAdapter: VotingModuleAdapter = {
  id: CW20STAKEDBALANCEVOTING_CONTRACT_NAME,
  matcher: (contractName: string) =>
    contractName.includes(CW20STAKEDBALANCEVOTING_CONTRACT_NAME),

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
      DaoThinInfoContent,
      DaoTreasuryFooter,
      DaoInfoAdditionalAddresses,
      DaoInfoVotingConfiguration,
      ProposalCreationAdditionalAddresses,
      VoteHeroStats,
      SdaMembershipPage,

      ProposalDetailsVotingPowerWidget,
      StakingModal,
      ClaimsPendingList,
    },
  }),
}
