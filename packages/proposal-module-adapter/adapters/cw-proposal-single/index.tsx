import { CWPROPOSALSINGLE_CONTRACT_NAME } from '@dao-dao/utils'

import { ProposalModuleAdapter } from '../../types'
import { makeUseReverseProposalInfos } from './common'
import {
  ProposalDetails,
  ProposalInfoCard,
  ProposalLineDesktop,
  ProposalLineMobile,
  ProposalVoteDecisionStatus,
  ProposalVotes,
} from './components'
import { makeGetProposalInfo } from './functions'
import { useProposalExecutionTxHash, useProposalRefreshers } from './hooks'

export const CwProposalSingleAdapter: ProposalModuleAdapter = {
  id: CWPROPOSALSINGLE_CONTRACT_NAME,
  matcher: (contractName: string) =>
    contractName.includes(CWPROPOSALSINGLE_CONTRACT_NAME),

  loadCommon: (proposalModule) => ({
    // Hooks
    hooks: {
      useReverseProposalInfos: makeUseReverseProposalInfos(proposalModule),
    },
  }),

  load: (options) => ({
    // Functions
    functions: {
      getProposalInfo: makeGetProposalInfo(options),
    },

    // Hooks
    hooks: {
      useProposalRefreshers,
      useProposalExecutionTxHash,
    },

    // Components
    components: {
      ProposalVotes,
      ProposalVoteDecisionStatus,
      ProposalInfoCard,
      ProposalDetails,
      ProposalLine: {
        Desktop: ProposalLineDesktop,
        Mobile: ProposalLineMobile,
      },
    },
  }),
}
