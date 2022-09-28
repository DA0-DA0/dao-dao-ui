import { Vote } from '@dao-dao/state/clients/cw-proposal-single'
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
  makeUseProfileNewProposalCardInfoLines,
  makeUseProposalCount,
} from './common'
import {
  ProposalActionDisplay,
  ProposalDetails,
  ProposalInfoCard,
  ProposalLine,
  ProposalStatusAndInfo,
  ProposalVoteTally,
  ProposalVotes,
  ProposalWalletVote,
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
  useCastVote,
  useProfileVoteCardOptions,
  useProposalExecutionTxHash,
  useProposalProcessedTQ,
  useProposalRefreshers,
  useWalletVoteInfo,
} from './hooks'
import { DaoCreationConfig, NewProposalForm } from './types'

export const CwProposalSingleAdapter: ProposalModuleAdapter<
  DaoCreationConfig,
  Vote,
  NewProposalForm
> = {
  id: 'cw-proposal-single',
  contractNames: ['cw-govmod-single', 'cw-proposal-single'],

  loadCommon: (options) => ({
    // Fields
    fields: {
      defaultNewProposalForm: {
        title: '',
        description: '',
        actionData: [],
      },
      newProposalFormTitleKey: 'title',
    },

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
    // Selectors
    selectors: {},

    // Functions
    functions: {
      getProposalInfo: makeGetProposalInfo(options),
    },

    // Hooks
    hooks: {
      useCastVote,
      useProposalRefreshers,
      useProposalExecutionTxHash,
      useProposalProcessedTQ,
      useProfileVoteCardOptions,
      useWalletVoteInfo,
    },

    // Components
    components: {
      ProposalStatusAndInfo,
      ProposalActionDisplay,
      ProposalWalletVote,
      ProposalVotes,
      ProposalVoteTally,
      ProposalInfoCard,
      ProposalDetails,
      ProposalLine,
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
      items: [VotingDurationVotingConfigItem, ProposalDepositVotingConfigItem],
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
