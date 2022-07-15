import { CW20STAKEDBALANCEVOTING_CONTRACT_NAME } from '@dao-dao/utils'

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

export const Cw20StakedBalanceVotingAdapter: IVotingModuleAdapter = {
  // Initialization
  id: 'cw20-staked-balance-voting',
  matcher: (contractName: string) =>
    contractName.includes(CW20STAKEDBALANCEVOTING_CONTRACT_NAME),

  // Fields
  fields: {
    disabledActionKeys: [],
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
