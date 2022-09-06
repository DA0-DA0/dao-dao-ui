import { CWPROPOSALSINGLE_CONTRACT_NAME } from '@dao-dao/utils'

import { ProposalModuleAdapter } from '../../types'
import {
  CreateProposalForm,
  DaoInfoVotingConfiguration,
  ProposalModuleInfo,
  makeUseActions,
  makeUseDepositInfo,
  makeUseListAllProposalInfos,
  makeUseProposalCount,
  makeUseReverseProposalInfos,
} from './common'
import {
  PinnedProposalLineDesktop,
  PinnedProposalLineMobile,
  ProposalDetails,
  ProposalInfoCard,
  ProposalLine,
  ProposalVoteDecisionStatus,
  ProposalVotes,
} from './components'
import { makeGetProposalInfo } from './functions'
import {
  useProfileVoteCardOptions,
  useProposalExecutionTxHash,
  useProposalExpirationString,
  useProposalProcessedTQ,
  useProposalRefreshers,
} from './hooks'

export const CwProposalSingleAdapter: ProposalModuleAdapter = {
  id: CWPROPOSALSINGLE_CONTRACT_NAME,
  matcher: (contractName: string) =>
    contractName.includes(CWPROPOSALSINGLE_CONTRACT_NAME),

  loadCommon: ({ proposalModule, coreAddress, Loader, Logo }) => ({
    // Hooks
    hooks: {
      useReverseProposalInfos: makeUseReverseProposalInfos(proposalModule),
      useListAllProposalInfos: makeUseListAllProposalInfos(proposalModule),
      useProposalCount: makeUseProposalCount(proposalModule),
      useActions: makeUseActions(proposalModule),
      useDepositInfo: makeUseDepositInfo(proposalModule),
    },

    // Components
    components: {
      ProposalModuleInfo: (props) => (
        <ProposalModuleInfo
          proposalModuleAddress={proposalModule.address}
          {...props}
        />
      ),
      CreateProposalForm: (props) => (
        <CreateProposalForm
          Loader={Loader}
          Logo={Logo}
          coreAddress={coreAddress}
          proposalModule={proposalModule}
          {...props}
        />
      ),
      DaoInfoVotingConfiguration: (props) => (
        <DaoInfoVotingConfiguration
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
      useProfileVoteCardOptions,
    },

    // Components
    components: {
      ProposalVotes,
      ProposalVoteDecisionStatus,
      ProposalInfoCard,
      ProposalDetails,
      ProposalLine,
      PinnedProposalLine: {
        Desktop: PinnedProposalLineDesktop,
        Mobile: PinnedProposalLineMobile,
      },
    },
  }),
}
