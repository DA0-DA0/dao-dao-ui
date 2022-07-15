import { ActionKey } from '@dao-dao/actions'
import { Cw4VotingQueryClient } from '@dao-dao/state'
import { CW4VOTING_CONTRACT_NAME } from '@dao-dao/utils'

import { IVotingModuleAdapter } from '../../types'
import { Membership, MembershipMobileTab } from './components'

export const Cw4VotingAdapter: IVotingModuleAdapter = {
  // Initialization
  id: 'cw4-voting',
  matcher: (contractName: string) =>
    contractName.includes(CW4VOTING_CONTRACT_NAME),

  // Fields
  disabledActionKeys: [
    // No governance tokens to mint.
    ActionKey.Mint,
  ],

  // Functions
  getStaticProps: async (cosmWasmClient, address) => {
    const client = new Cw4VotingQueryClient(cosmWasmClient, address)

    return {
      cw4GroupAddress: await client.groupContract(),
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
