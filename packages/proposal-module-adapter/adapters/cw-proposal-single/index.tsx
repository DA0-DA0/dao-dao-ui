import { DurationUnits } from '@dao-dao/tstypes'

import { ProposalModuleAdapter } from '../../types'
import {
  DaoInfoVotingConfiguration,
  NewProposal,
  ProposalModuleInfo,
  makeDepositInfo,
  makeReverseProposalInfos,
  makeUseActions,
  makeUseListAllProposalInfos,
  makeUseProposalCount,
  makeUseProfileNewProposalCardInfoLines,
} from './common'
import {
  PinnedProposalLineDesktop,
  PinnedProposalLineMobile,
  ProposalDetails,
  ProposalInfoCard,
  ProposalLine,
  ProposalVoteTally,
  ProposalVotes,
} from './components'
import {
  AllowRevotingVotingConfigItem,
  ProposalDepositVotingConfigItem,
  QuorumVotingConfigItem,
  ThresholdVotingConfigItem,
  VotingDurationVotingConfigItem,
  getInstantiateInfo,
} from './daoCreation'
import { makeGetProposalInfo } from './functions'
import {
  useProfileVoteCardOptions,
  useProposalExecutionTxHash,
  useProposalExpirationString,
  useProposalProcessedTQ,
  useProposalRefreshers,
} from './hooks'
import { DaoCreationConfig } from './types'

export const CwProposalSingleAdapter: ProposalModuleAdapter<DaoCreationConfig> =
  {
    id: 'cw-proposal-single',
    contractNames: ['cw-govmod-single', 'cw-proposal-single'],

    loadCommon: (options) => ({
      // Selectors
      selectors: {
        reverseProposalInfos: makeReverseProposalInfos(options),
        depositInfo: makeDepositInfo(options),
      },

      // Hooks
      hooks: {
        useListAllProposalInfos: makeUseListAllProposalInfos(
          options.proposalModule
        ),
        useProposalCount: makeUseProposalCount(options.proposalModule),
        useActions: makeUseActions(options.proposalModule),
        useProfileNewProposalCardInfoLines:
          makeUseProfileNewProposalCardInfoLines(options.proposalModule),
      },

      // Components
      components: {
        ProposalModuleInfo: (props) => (
          <ProposalModuleInfo
            proposalModuleAddress={options.proposalModule.address}
            {...props}
          />
        ),
        NewProposal: (props) => <NewProposal options={options} {...props} />,
        DaoInfoVotingConfiguration: (props) => (
          <DaoInfoVotingConfiguration
            proposalModule={options.proposalModule}
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
        ProposalVoteTally,
        ProposalInfoCard,
        ProposalDetails,
        ProposalLine,
        PinnedProposalLine: {
          Desktop: PinnedProposalLineDesktop,
          Mobile: PinnedProposalLineMobile,
        },
      },
    }),

    queries: {
      proposalCount: {
        proposal_count: {},
      },
    },

    daoCreation: {
      defaultConfig: {
        threshold: {
          majority: true,
          value: 75,
        },
        quorumEnabled: true,
        quorum: {
          majority: false,
          value: 20,
        },
        votingDuration: {
          value: 1,
          units: DurationUnits.Weeks,
        },
        proposalDeposit: {
          amount: 0,
          refundFailed: false,
        },
        allowRevoting: false,
      },

      votingConfig: {
        items: [
          VotingDurationVotingConfigItem,
          ProposalDepositVotingConfigItem,
        ],
        advancedItems: [
          AllowRevotingVotingConfigItem,
          ThresholdVotingConfigItem,
          QuorumVotingConfigItem,
        ],
        advancedWarningI18nKeys: [
          'daoCreationAdapter.cw-proposal-single.advancedWarning',
        ],
      },

      getInstantiateInfo,
    },
  }
