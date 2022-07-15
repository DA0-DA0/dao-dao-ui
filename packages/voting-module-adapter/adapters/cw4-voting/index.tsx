import { ActionKey } from '@dao-dao/actions'
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
  },
}
