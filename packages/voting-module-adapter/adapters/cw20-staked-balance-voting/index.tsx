import { Cw20StakedBalanceVotingQueryClient } from '@dao-dao/state'
import { CW20STAKEDBALANCEVOTING_CONTRACT_NAME } from '@dao-dao/utils'

import { IVotingModuleAdapter } from '../../types'
import { Membership, MembershipMobileTab } from './components'

export const Cw20StakedBalanceVotingAdapter: IVotingModuleAdapter = {
  // Initialization
  id: 'cw20-staked-balance-voting',
  matcher: (contractName: string) =>
    contractName.includes(CW20STAKEDBALANCEVOTING_CONTRACT_NAME),

  // Fields
  disabledActionKeys: [],

  // Functions
  getStaticProps: async (cosmWasmClient, address) => {
    const client = new Cw20StakedBalanceVotingQueryClient(
      cosmWasmClient,
      address
    )

    const [governanceTokenAddress, stakingContractAddress] = await Promise.all([
      await client.tokenContract(),
      await client.stakingContract(),
    ])

    return {
      governanceTokenAddress,
      stakingContractAddress,
    }
  },

  // UI
  ui: {
    membership: {
      desktop: Membership,
      mobileTab: MembershipMobileTab,
      mobile: (props) => <Membership {...props} primaryText />,
    },
  },
}
