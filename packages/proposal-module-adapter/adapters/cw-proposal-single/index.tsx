import { CWPROPOSALSINGLE_CONTRACT_NAME } from '@dao-dao/utils'

import { ProposalModuleAdapter } from '../../types'
import {
  CreateProposalForm,
  ProposalCreateInfo,
  makeUseListAllProposalInfos,
  makeUseProposalCount,
  makeUseReverseProposalInfos,
  useActions,
} from './common'
import {
  PinnedProposalLineDesktop,
  PinnedProposalLineMobile,
  ProposalDetails,
  ProposalInfoCard,
  ProposalLineDesktop,
  ProposalLineMobile,
  ProposalVoteDecisionStatus,
  ProposalVotes,
} from './components'
import { makeGetProposalInfo } from './functions'
import {
  useProposalExecutionTxHash,
  useProposalExpirationString,
  useProposalProcessedTQ,
  useProposalRefreshers,
} from './hooks'

export const CwProposalSingleAdapter: ProposalModuleAdapter = {
  id: CWPROPOSALSINGLE_CONTRACT_NAME,
  matcher: (contractName: string) =>
    contractName.includes(CWPROPOSALSINGLE_CONTRACT_NAME),

  loadCommon: ({ proposalModule, coreAddress, Loader }) => ({
    // Hooks
    hooks: {
      useReverseProposalInfos: makeUseReverseProposalInfos(proposalModule),
      useListAllProposalInfos: makeUseListAllProposalInfos(proposalModule),
      useProposalCount: makeUseProposalCount(proposalModule),
      useActions,
    },

    // Components
    components: {
      ProposalCreateInfo: (props) => (
        <ProposalCreateInfo
          proposalModuleAddress={proposalModule.address}
          {...props}
        />
      ),
      CreateProposalForm: (props) => (
        <CreateProposalForm
          Loader={Loader}
          coreAddress={coreAddress}
          proposalModule={proposalModule}
          {...props}
        />
      ),
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
      useProposalProcessedTQ,
      useProposalExpirationString,
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
      PinnedProposalLine: {
        Desktop: PinnedProposalLineDesktop,
        Mobile: PinnedProposalLineMobile,
      },
    },
  }),
}
