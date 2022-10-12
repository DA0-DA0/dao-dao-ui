import { DepositRefundPolicy, DurationUnits } from '@dao-dao/tstypes'
import { Vote } from '@dao-dao/tstypes/contracts/CwProposalSingle.common'

import { ProposalModuleAdapter } from '../../types'
import {
  NewProposal,
  makeDepositInfo,
  makeReverseProposalInfos,
  makeUseActions,
  makeUseListAllProposalInfos,
  makeUseProfileNewProposalCardInfoLines,
  makeUseProposalCount,
} from './common'
import {
  ProposalActionDisplay,
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
      useActions: makeUseActions(options),
      useProfileNewProposalCardInfoLines:
        makeUseProfileNewProposalCardInfoLines(options),
    },

    // Components
    components: {
      NewProposal: (props) => <NewProposal options={options} {...props} />,
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
        enabled: false,
        amount: 10,
        type: 'native',
        cw20Address: '',
        cw20TokenInfo: undefined,
        refundPolicy: DepositRefundPolicy.OnlyPassed,
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
