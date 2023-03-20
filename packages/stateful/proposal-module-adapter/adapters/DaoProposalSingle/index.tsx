import {
  DepositRefundPolicy,
  DurationUnits,
  ProposalModuleAdapter,
} from '@dao-dao/types'
import { Vote } from '@dao-dao/types/contracts/DaoProposalSingle.common'
import { NATIVE_TOKEN } from '@dao-dao/utils'

import {
  NewProposal,
  makeDepositInfoSelector,
  makeUseActions,
  makeUseProfileNewProposalCardInfoLines,
  makeUsePublishProposal,
  reverseProposalInfosSelector,
} from './common'
import {
  ProposalInnerContentDisplay,
  ProposalLine,
  ProposalStatusAndInfo,
  ProposalVoteTally,
  ProposalVotes,
  ProposalWalletVote,
} from './components'
import {
  AllowRevotingVotingConfigItem,
  ProposalDepositVotingConfigItem,
  ProposalSubmissionPolicyVotingConfigItem,
  QuorumVotingConfigItem,
  ThresholdVotingConfigItem,
  VotingDurationVotingConfigItem,
  getInstantiateInfo,
} from './daoCreation'
import { fetchPreProposeAddress, makeGetProposalInfo } from './functions'
import {
  useCastVote,
  useLoadingProposalExecutionTxHash,
  useLoadingWalletVoteInfo,
  useProposalRefreshers,
  useVoteOptions,
} from './hooks'
import { DaoCreationConfig, NewProposalForm } from './types'

export const DaoProposalSingleAdapter: ProposalModuleAdapter<
  DaoCreationConfig,
  Vote,
  NewProposalForm
> = {
  id: 'DaoProposalSingle',
  contractNames: [
    // V1
    'cw-govmod-single',
    'cw-proposal-single',
    // V2
    'cwd-proposal-single',
    'dao-proposal-single',
  ],

  loadCommon: (options) => {
    // Make here so we can pass into common hooks and components that need it.
    const depositInfoSelector = makeDepositInfoSelector({
      chainId: options.chainId,
      proposalModuleAddress: options.proposalModule.address,
      version: options.proposalModule.version,
      preProposeAddress: options.proposalModule.preProposeAddress,
    })

    const usePublishProposal = makeUsePublishProposal({
      options,
      depositInfoSelector,
    })

    return {
      // Fields
      fields: {
        makeDefaultNewProposalForm: () => ({
          title: '',
          description: '',
          actionData: [],
        }),
        newProposalFormTitleKey: 'title',
      },

      // Selectors
      selectors: {
        reverseProposalInfos: (props) =>
          reverseProposalInfosSelector({
            chainId: options.chainId,
            proposalModuleAddress: options.proposalModule.address,
            proposalModulePrefix: options.proposalModule.prefix,
            ...props,
          }),
        depositInfo: depositInfoSelector,
      },

      // Hooks
      hooks: {
        useActions: makeUseActions(options),
        useProfileNewProposalCardInfoLines:
          makeUseProfileNewProposalCardInfoLines({
            options,
            depositInfoSelector,
          }),
      },

      // Components
      components: {
        NewProposal: (props) => (
          <NewProposal
            options={options}
            usePublishProposal={usePublishProposal}
            {...props}
          />
        ),
      },
    }
  },

  load: (options) => ({
    // Functions
    functions: {
      getProposalInfo: makeGetProposalInfo(options),
    },

    // Hooks
    hooks: {
      useCastVote,
      useProposalRefreshers,
      useLoadingProposalExecutionTxHash,
      useVoteOptions,
      useLoadingWalletVoteInfo,
    },

    // Components
    components: {
      ProposalStatusAndInfo,
      ProposalInnerContentDisplay,
      ProposalWalletVote,
      ProposalVotes,
      ProposalVoteTally,
      ProposalLine,
    },
  }),

  queries: {
    proposalCount: {
      indexerFormula: 'daoProposalSingle/proposalCount',
      cosmWasmQuery: {
        proposal_count: {},
      },
    },
  },

  functions: {
    fetchPreProposeAddress,
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
        denomOrAddress: NATIVE_TOKEN.denomOrAddress,
        token: undefined,
        refundPolicy: DepositRefundPolicy.OnlyPassed,
      },
      anyoneCanPropose: false,
      allowRevoting: false,
    },

    votingConfig: {
      items: [VotingDurationVotingConfigItem, ProposalDepositVotingConfigItem],
      advancedItems: [
        AllowRevotingVotingConfigItem,
        ThresholdVotingConfigItem,
        QuorumVotingConfigItem,
        ProposalSubmissionPolicyVotingConfigItem,
      ],
      advancedWarningI18nKeys: [
        'daoCreationAdapter.DaoProposalSingle.advancedWarning',
      ],
    },

    getInstantiateInfo,
  },
}
