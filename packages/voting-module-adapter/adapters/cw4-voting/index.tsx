import { ActionKey } from '@dao-dao/actions'
import { Wallet } from '@dao-dao/icons'
import { CW4VOTING_CONTRACT_NAME } from '@dao-dao/utils'

import { VotingModuleAdapter } from '../../types'
import {
  DaoContractInfoContent,
  DaoHorizontalInfoDisplayInternal,
  DaoTreasuryFooter,
  Membership,
  MembershipMobileTab,
  ProposalCreateAddresses,
  SdaMembershipPage,
  VoteHeroStats,
} from './components'
import { useVoteConversionDecimals } from './hooks'

export const Cw4VotingAdapter: VotingModuleAdapter = {
  id: CW4VOTING_CONTRACT_NAME,
  matcher: (contractName: string) =>
    contractName.includes(CW4VOTING_CONTRACT_NAME),

  load: () => ({
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

    // Components
    components: {
      Membership: {
        Desktop: () => <Membership />,
        MobileTab: MembershipMobileTab,
        Mobile: () => <Membership primaryText />,
      },
      DaoHorizontalInfoDisplayInternal,
      DaoTreasuryFooter,
      DaoContractInfoContent,
      ProposalCreateAddresses,
      VoteHeroStats,
      SdaMembershipPage,
    },
  }),
}
