import { CWPROPOSALSINGLE_CONTRACT_NAME } from '@dao-dao/utils'

import { ProposalModuleAdapter } from '../../types'
import {
  ProposalDetails,
  ProposalInfoCard,
  ProposalVoteDecisionStatus,
  ProposalVotes,
} from './components'
import { makeProposalInfo } from './functions'
import { useProposalRefreshers } from './hooks'

export const CwProposalSingleAdapter: ProposalModuleAdapter = {
  id: CWPROPOSALSINGLE_CONTRACT_NAME,
  matcher: (contractName: string) =>
    contractName.includes(CWPROPOSALSINGLE_CONTRACT_NAME),

  load: (options) => ({
    // Functions
    functions: {
      getProposalInfo: makeProposalInfo(options),
    },

    // Hooks
    hooks: {
      useProposalRefreshers,
    },

    // Components
    components: {
      ProposalVotes,
      ProposalVoteDecisionStatus,
      ProposalInfoCard,
      ProposalDetails,
    },
  }),
}
