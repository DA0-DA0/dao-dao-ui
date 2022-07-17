import { CWPROPOSALSINGLE_CONTRACT_NAME } from '@dao-dao/utils'

import { ProposalModuleAdapter } from '../../types'
import {
  ProposalInfoCard,
  ProposalVoteDecisionStatus,
  ProposalVotes,
} from './components'
import { makeProposalInfo } from './functions'

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
    hooks: {},

    // UI
    ui: {
      ProposalVotes,
      ProposalVoteDecisionStatus,
      ProposalInfoCard,
    },
  }),
}
