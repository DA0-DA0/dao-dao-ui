import { ActionKey } from '@dao-dao/actions'
import { Wallet } from '@dao-dao/icons'
import { CW4VOTING_CONTRACT_NAME } from '@dao-dao/utils'

import { IVotingModuleAdapter } from '../../types'
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

export const Cw4VotingAdapter: IVotingModuleAdapter = {
  // Initialization
  id: 'cw4-voting',
  matcher: (contractName: string) =>
    contractName.includes(CW4VOTING_CONTRACT_NAME),

  // Fields
  fields: {
    disabledActionKeys: [
      // No governance tokens to mint.
      ActionKey.Mint,
    ],
    sdaMembershipPageNavInfo: {
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
    useVoteConversionDecimals,
  },

  // UI
  ui: {
    Membership: {
      Desktop: Membership,
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
}
